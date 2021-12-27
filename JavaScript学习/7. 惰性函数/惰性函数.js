// 需求
// 我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。

// 解决一：普通方法
let t;
function foo1() {
    if (t) return t;
    t = new Date()
    return t;
}
// 问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。

// 解决二：闭包
// 我们很容易想到用闭包避免污染全局变量。
let foo2 = (function () {
    let t;
    return function () {
        if (t) return t;
        t = new Date();
        return t;
    }
})();

console.log(foo2());
// 然而还是没有解决调用时都必须进行一次判断的问题。

// 解决四：惰性函数
// 惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。
let foo3 = function () {
    let t = new Date();

    foo3 = function () {
        return t;
    };
    return foo3();
};
console.log(foo3());

// 更多应用
// DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：
// 简化写法
function addEvent(type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if (window.attachEvent) {
        el.attachEvent('on' + type, fn);
    }
}

function addEvent(type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if (window.attachEvent) {
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}

// 当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数