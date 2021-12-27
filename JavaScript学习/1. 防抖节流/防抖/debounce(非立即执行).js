// 防抖
/* 
    防抖的原理就是：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
*/

// 第一版 简单版
function debounce1(func, delay) {
    // 定时器
    let timeout;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。
    //如果没有闭包，每次进入debounce函数的 timeout 都是最初始的undefined,故无法达到清除定时器的效果。
    return function () {
        // 此时第一次进入时 timeout 是undefined，
        // 第二次之后则可以清除外部函数残留的上一次 timeout 计时器，取消执行上一次。
        clearTimeout(timeout)
        // timeout 真正完全执行并渲染将会是最后一次 timeout
        timeout = setTimeout(func, delay);
    }
}

// 第二版 让 this 已经可以正确指向了
function debounce2(func, delay) {
    // 定时器
    let timeout;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。
    //如果没有闭包，每次进入debounce函数的 timeout 都是最初始的undefined,故无法达到清除定时器的效果。
    return function () {
        const context = this;

        // this指向 <div id="container"></div>
        console.log('debounce:', this);

        // 此时第一次进入时 timeout 是undefined，
        // 第二次之后则可以清除外部函数残留的上一次 timeout 计时器，取消执行上一次。
        clearTimeout(timeout)

        // timeout 真正完全执行并渲染将会是最后一次 timeout
        timeout = setTimeout(function () {
            // apply：让 func的 可以使用 这里的this，context又指向 <div id="container"></div>
            func.apply(context)
        }, delay);
    }
}

// 第三版 参数问题
function debounce3(func, delay) {
    // 定时器
    let timeout;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。
    //如果没有闭包，每次进入debounce函数的 timeout 都是最初始的undefined,故无法达到清除定时器的效果。
    return function () {
        const context = this;
        const args = arguments;

        // 此时第一次进入时 timeout 是undefined，
        // 第二次之后则可以清除外部函数残留的上一次 timeout 计时器，取消执行上一次。
        clearTimeout(timeout)

        // timeout 真正完全执行并渲染将会是最后一次 timeout
        timeout = setTimeout(function () {
            // apply：让 func的 可以使用 这里的this，context又指向 <div id="container"></div>
            func.apply(context, args)
        }, delay);
    }
}


// 1. 设置变量 count 计入你移动鼠标的触发的次数
let count = 1;
// 2. 拿到html 上div元素 container
let container = document.getElementById('container');

// 3. 在页面上显示触发的次数
// JavaScript 在事件处理函数中会提供事件对象 event
function getUserAction(e) {
    /*  
        使用 debounce 函数的时候,this 指向 的问题
        不使用 debounce 函数的时候，this 的值为：<div id="container"></div>
        使用我们的 debounce 函数，this 就会指向 Window 对象
        所以我们需要将 this 指向正确的对象 
    */
    console.log('this: ', this);

    /* 
        使用 debounce 函数的时候, event 对象 的问题
        如果我们不使用 debounce 函数，这里会打印 MouseEvent 对象
        但是在我们实现的 debounce 函数中，却只会打印 undefined! 
    */
    console.log('e:', e);

    container.innerHTML = count++;
};


// 4. 移动鼠标的触发事件 调用 getUserAction函数
// container.onmousemove = getUserAction;

// 现在随你怎么移动，反正你移动完 1000ms 内不再触发，我才执行事件。
// container.onmousemove = debounce1(getUserAction, 1000);

// 现在 this 已经可以正确指向了
container.onmousemove = debounce2(getUserAction, 1000);

// 现在 有event对象
// container.onmousemove = debounce3(getUserAction, 1000);

/* 
    我们修复了两个小问题：

    1. this 指向
    2. event 对象 
*/

