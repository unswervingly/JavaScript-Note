// 四种常见的JS内存泄漏

// 1、意外的全局变量
// 未定义的变量会在全局对象创建一个新变量，如下。 
// function foo(arg) {
//     bar = "this is a hidden global variable";
// }


// 函数 foo 内部忘记使用 var ，实际上JS会把bar挂载到全局对象上，意外创建一个全局变量。
// function foo(arg) {
//     window.bar = "this is an explicit global variable";
// }


// 另一个意外的全局变量可能由 this 创建。
function foo() {
    this.variable = "potential accidental global";
}

// Foo 调用自己，this 指向了全局对象（window）
// 而不是 undefined
foo() // undefined

// 解决方法：
// 在 JavaScript 文件头部加上 'use strict'，使用严格模式避免意外的全局变量，此时上例就报错。
// 如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。



// 2、被遗忘的计时器或回调函数
// 计时器setInterval代码很常见

var someResource = getData();
setInterval(function () {
    var node = document.getElementById('Node');
    if (node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource)
    }
}, 1000);
// 上面的例子表明，在节点node或者数据不再需要时，定时器依旧指向这些数据。
// 所以哪怕当node节点被移除后， 仍旧存活并且垃圾回收器没办法回收，它的依赖也没办法被回收，除非终止定时器。



// 3、脱离 DOM 的引用
// 我们获取一个DOM元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。


// 4、闭包
// 闭包的关键是匿名函数可以访问父级作用域的变量。

var theThing = null;
var replaceThing = function () {
    var originalThing = theThing;
    var unused = function () {
        if (originalThing)
            console.log("hi");
    };

    theThing = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
            console.log(someMessage);
        }
    };
};

setInterval(replaceThing, 1000);
// 每次调用 replaceThing ，theThing 得到一个包含一个大数组和一个新闭包（someMethod）的新对象。
// 同时，变量 unused 是一个引用 originalThing 的闭包（先前的 replaceThing 又调用了 theThing ）。
// someMethod 可以通过 theThing 使用，someMethod 与 unused 分享闭包作用域，尽管 unused 从未使用，它引用的 originalThing 迫使它保留在内存中（防止被回收）。

// 解决方法：

// 在 replaceThing 的最后添加 originalThing = null 。


// 思考题
// 从内存来看 null 和 undefined 本质的区别是什么？

// 给一个全局变量赋值为null，相当于将这个变量的指针对象以及值清空，
// 如果是给对象的属性 赋值为null，或者局部变量赋值为null,相当于给这个属性分配了一块空的内存，然后值为null， JS会回收全局变量为null的对象。

// 给一个全局变量赋值为undefined，相当于将这个对象的值清空，但是这个对象依旧存在,
// 如果是给对象的属性赋值 为undefined，说明这个值为空值