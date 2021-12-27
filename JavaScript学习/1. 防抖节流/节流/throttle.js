// 节流
/* 
    节流的原理就是：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有第一次生效。
*/

// 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

/* 
    1. 时间戳实现:

    触发事件时，取出当前的时间戳，然后减去之前的时间戳（最开始设置为0）。
    若大于设置的时间周期，则执行函数，同时更新时间戳为当前的时间戳。若小于，则不执行。
    
    2. 存在的问题:

    1. 会立刻执行函数
    2. 当鼠标移入的时候，事件立刻执行，每过 1s 会执行一次，如果在 4.2s 停止触发，致最后一次触发并没有执行函数。
*/
// 第一版 使用时间戳实现
function throttle1(func, delay) {
    // 将初始的时间戳设为0，保证第一次触发就一定执行函数
    let previous = 0;

    // 闭包 存储私有变量 previous
    return function () {
        // 当前的时间戳
        let now = +new Date();
        // 让 this 已经可以正确指向
        const context = this;
        // 传递的参数
        const args = arguments;

        // 判断现在的时间是否大于最后一次执行时间加上时间间隔
        if (now - previous > delay) {
            // apply：让 func的 可以使用 这里的this，context又指向 <div id="container"></div>。也可以传值
            func.apply(context, args);
            // 保存最后执行时间戳
            previous = now;
        }
    }
}

/*
    1. 定时器:

    触发事件时，设置一个定时器。当再次触发事件时，若定时器存在就不执行；直到定时器内部方法执行完，然后清空定时器，设置下一个定时器。

    2. 存在的问题:

    1. 当首次触发事件的时候不会执行函数。
    2. 当鼠标移入的时候，事件不会立刻执行，晃了 1s 后终于执行了一次，
       此后每 1s 执行一次，当数字显示为 3 的时候，立刻移出鼠标，相当于大约 3.2s 的时候停止触发，但是依然会在第 4s 的时候执行一次事件。
*/
// 第二版 设置定时器实现
function throttle2(func, delay) {
    // 定时器
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        // 判断是否 timeout 定时器
        if (!timeout) {
            timeout = setTimeout(() => {
                // delay秒重置 timeout值为null，为了重新设置一个新的定时器。
                timeout = null;

                func.apply(context, args);
            }, delay);
        }
    }
}

/* 
    比较两个方法：

    时间戳实现 会立刻执行，定时器实现 会在 n 秒后第一次执行
    时间戳实现 停止触发后没有办法再执行事件，定时器实现 停止触发后依然会再执行一次事件 
*/


// 第三版 双剑合璧 + 取消
// 我想要一个有头有尾的！就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！
function throttle3(func, delay) {
    // 定时器
    let timeout;
    // 将初始的时间戳设为0，保证第一次触发就一定执行函数
    let previous = 0;

    let throttled = function () {
        const context = this;
        const args = arguments;

        // 当前的时间戳
        let now = +new Date();
        //下次触发 func 剩余的时间
        let remaining = delay - (now - previous);

        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > delay) {
            // 因为定时器并不是准确的时间，很可能你设置了2秒
            // 但是他需要2.2秒才触发，这时候就会进入这个条件
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                // 现在执行时间戳
                previous = +new Date();
                // 为了重新设置一个新的定时器。
                timeout = null;
                func.apply(context, args)
            }, remaining);
        }
    }

    // 取消 throttled函数
    throttled.cancel = function () {
        // 清除 计时器
        clearTimeout(timeout);
        // 设置 previous 为 0
        previous = 0;
        // 设置 timeout 为 null
        timeout = null;
    }

    return throttled
}

/* 
    鼠标移入，事件立刻执行，晃了 1s，事件再一次执行，
    当数字变成 3 的时候，也就是 3s 后，我们立刻移出鼠标，停止触发事件，4s 的时候，依然会再执行一次事件。 
*/

// 优化
// 但是我有时也希望无头有尾，或者有头无尾，这个咋办？
/* 
    那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:

    leading：false 表示禁用第一次执行
    trailing: false 表示禁用停止触发的回调 

    注意：leading：false 和 trailing: false 不能同时设置
    如果同时设置的话，比如当你将鼠标移出的时候，
    因为 trailing 设置为 false，停止触发的时候不会设置定时器，
    所以只要再过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了
*/
// 第四版
function throttle(func, wait, options) {
    let timeout;

    let previous = 0;

    if (!options) options = {};


    return function () {
        let now = new Date().getTime();

        if (!previous && options.leading === false) previous = now;

        let remaining = wait - (now - previous);

        const context = this;
        const args = arguments;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;

        } else if (!timeout && options.trailing !== false) {

            timeout = setTimeout(() => {
                previous = options.leading === false ? 0 : new Date().getTime();

                timeout = null;

                func.apply(context, args);

                if (!timeout) context = args = null;
            }, remaining);
        }
    };
}



// 1. 设置变量 count 计入你移动鼠标的触发的次数
let count = 1;
// 2. 拿到html 上div元素 container
let container = document.getElementById('container');

// 3. 在页面上显示触发的次数
function getUserAction(e) {

    container.innerHTML = count++;
};


// 4. 移动鼠标的触发事件 调用 getUserAction函数
// container.onmousemove = getUserAction;

// 使用 时间戳实现 节流
// container.onmousemove = throttle1(getUserAction, 1000);

// 使用 定时器实现 节流
// container.onmousemove = throttle2(getUserAction, 1000);

// 使用 双剑合璧实现 节流
container.onmousemove = throttle3(getUserAction, 3000);

// 优化
// 有头有尾
// container.onmousemove = throttle(getUserAction, 1000);

// 无头有尾
container.onmousemove = throttle(getUserAction, 1000, {
    leading: false
});

// 有头无尾
// container.onmousemove = throttle(getUserAction, 1000, {
//     trailing: false
// });