// 为什么使用this
/* 
    在常见的编程语言中，几乎都有this这个关键字（Objective-C中使用的是self），
    但是JavaScript中的this和常见的面向对象语言中的this不太一样： 

    常见面向对象的编程语言中，比如Java、C++、Swift、Dart等等一系列语言中，this通常只会出现在类的方法中。
    也就是你需要有一个类，类中的方法（特别是实例方法）中，this代表的是当前调用对象。
    但是JavaScript中的this更加灵活，无论是它出现的位置还是它代表的含义。
*/


// 我们通过对象字面量创建出来一个对象，当我们调用对象的方法时，希望将对象的名称一起进行打印。
var obj = {
    name: "why",
    running: function () {
        console.log(obj.name + " running");
    },
    eating: function () {
        console.log(obj.name + " eating");
    },
    studying: function () {
        console.log(obj.name + " studying");
    }
}
// 但是这样做有一个很大的弊端：如果我将obj的名称换成了info，那么所有的方法中的obj都需要换成info。
// 在实际开发中，我们都会使用this来进行优化：


// this指向什么
// 1. this在全局作用域下指向什么
console.log(this); // window

var name = "why";
console.log(this.name); // why
console.log(window.name); // why
// 在全局作用域下，我们可以认为this就是指向的window

// 通常都是在函数中使用。

// 所有的函数在被调用时，都会创建一个执行上下文：

// 这个上下文中记录着函数的调用栈、函数的调用方式、传入的参数信息等；
// this也是其中的一个属性；


