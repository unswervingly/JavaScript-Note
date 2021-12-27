// 防抖
/* 
    防抖的原理就是：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
*/

/* 
    立刻执行

    这个需求就是：
    我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。 
    加个 immediate 参数判断是否是立刻执行。
*/

// 第四版 立刻执行
function debounce4(func, delay, immediate) {

    let timeout;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。
    return function () {
        let context = this;
        let args = arguments;

        // 此时第一次进入时 timeout 是undefined，
        // 第二次之后则可以清除外部函数残留的上一次 timeout 计时器，取消执行上一次。
        if (timeout) clearTimeout(timeout);

        // 判断是否是立刻执行
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;

            // 让 timeout = null 就可以立刻执行
            timeout = setTimeout(function () {
                timeout = null;
            }, delay)

            // 如果执行就直接 func.apply(context, args)
            if (callNow) func.apply(context, args)
        } else {
            // timeout 真正完全执行并渲染将会是最后一次 timeout
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, delay);
        }
    }
}


/* 
    返回值

    此时注意一点，就是 getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果，
    但是当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，
    最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。 
*/
// 第五版 函数可能是有返回值的
function debounce5(func, delay, immediate) {

    let timeout, result;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;

            // 让 timeout = null 就可以立刻执行
            timeout = setTimeout(function () {
                timeout = null;
            }, delay)

            // 如果执行就 直接 func.apply(context, args)要有返回值
            if (callNow) result = func.apply(context, args)
        } else {
            // timeout 真正完全执行并渲染将会是最后一次 timeout
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, delay);
        }

        // 只在 immediate 为 true 的时候返回函数的执行结果
        // 因为 当 immediate 为 false 的时候，使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量
        return result;
    }
}



/* 
    取消 debounce 函数

    最后我们再思考一个小需求，我希望能取消 debounce 函数，
    比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true，这样的话，我只有等 10 秒后才能重新触发事件，
    现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行啦
 */
// 第六版 取消 debounce 函数
function debounce6(func, delay, immediate) {

    let timeout, result;

    //在此处定义闭包,以达到将函数暴漏出去，并借此将 timeout 这个变量全局化。还有就是拿到这个函数去取消
    let debounced = function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;

            // 让 timeout = null 就可以立刻执行
            timeout = setTimeout(function () {
                timeout = null;
            }, delay)

            // 如果执行就 直接 func.apply(context, args)要有返回值
            if (callNow) result = func.apply(context, args)
        } else {
            // timeout 真正完全执行并渲染将会是最后一次 timeout
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, delay);
        }

        // 只在 immediate 为 true 的时候返回函数的执行结果
        // 因为 当 immediate 为 false 的时候，使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量
        return result;
    };

    // 取消 debounced函数
    debounced.cancel = function () {
        // 清除 计时器
        clearTimeout(timeout);
        // 设置 timeout 为 null
        timeout = null;
    };

    return debounced;
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

// 立刻执行 debounce
// container.onmousemove = debounce4(getUserAction, 1000, true);

// getUserAction 函数可能是有返回值的, 只在 immediate 为 true 的时候返回函数的执行结果
// container.onmousemove = debounce5(getUserAction, 1000, true);


// 取消 debounce 函数
let setUseAction = debounce6(getUserAction, 1000, true);

container.onmousemove = setUseAction;

// 为 button添加点击事件，并且调用 防抖setUseAction 里面的 取消cancel() 函数
document.getElementById("button").addEventListener('click', function () {
    setUseAction.cancel();
})