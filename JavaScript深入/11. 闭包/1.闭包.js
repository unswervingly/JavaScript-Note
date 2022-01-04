// 红宝书(p178)上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数
/* 
    关键在于下面两点：

    是一个函数
    能访问另外一个函数作用域中的变量
*/


// 对于闭包有下面三个特性：
// 1、函数内再嵌套函数

// 2、闭包可以访问当前函数以外的变量
function getOuter1() {
    var date = '618';
    function getDate(str) {
        console.log(str + date);  //访问外部的date
    }
    return getDate('今天是：'); //"今天是：618"
}
getOuter1();

// 即使外部函数已经返回，闭包仍能访问外部函数定义的变量  
function getOuter2() {
    var date = '618';
    function getDate(str) {
        console.log(str + date);  //访问外部的date
    }
    return getDate;     //外部函数返回
}
var today = getOuter2();
today('今天是：');   //"今天是：618"
today('明天不是：');   //"明天不是：618"

// 3:变量或参数不会被垃圾回收机制回收
/*
    因为他本身就是建立在一个函数的内部作用域的子函数,由于可访问上级作用域的原因,
    即使上级函数执行完,作用域也不会被清除,这时子函数,就是闭包,就拥有了访问上级作用域中变量的权限,
    即使上级函数执行完,作用域内的值也不会被销毁
*/


// 作用域链
// 当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链。
// 作用域链的顶端是全局对象，在全局环境中定义的变量就会绑定到全局对象中。


// 作用域链和原型链的区别：
// 1.作用域链是相对于变量而言， 原型是相对于属性而言

// 2.作用域最顶层是window ，原型链最顶层是Object

// 3.原型链 如果去查找一个普通对象的属性，但是在当前对象和其原型中都找不到时，会返回undefined；
//   作用域 查找的属性在作用域链中不存在的话就会抛出ReferenceError。




// 形成闭包的原因
// 内部的函数存在外部作用域的引用就会导致闭包

// 闭包变量存储的位置
/*
    闭包中的变量存储的位置是 堆内存。

    假如闭包中的变量存储在栈内存中，那么栈的回收 会把处于栈顶的变量自动回收。
    所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。
*/

// 闭包的优点：
// 1.模仿块级作用域
function outputNumbers(count) {
    (function () {
        //块级作用域
        for (var i = 0; i < count; i++) {
            console.log(i); // 0, 1, ... count - 1
        }
    })();
    console.log(i); // error
}

// 2.让这些变量一直存在于内存中，不会在调用结束后，被垃圾回收机制回收
function f1() {
    var n = 999;
    nAdd = function () {
        n += 1
    }
    function f2() {
        alert(n);
    }
    return f2;
}

var result = f1();
result(); // 999
nAdd();
result(); // 1000


// 3.闭包可以实现方法和属性的私有化
// 为什么不可以在外部访问私有变量
// 因为 JavaScript 中不可以对作用域进行引用或赋值，因此没有办法在外部访问 变量。唯一的途径就是通过那两个闭包。

function getGeneratorFunc() {
    var _name = 'John';
    var _age = 22;

    function f() {
        return {
            getName: function () {
                return _name;
            },
            getAge: function () {
                return _age;
            }
        };
    };
    return f
}

var obj = getGeneratorFunc()();
obj.getName(); // John
obj.getAge(); // 22
obj._age; // undefined


// 闭包的缺陷
/*
    函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露

    如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，
    因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。

    解决方法是：在退出函数之前，将不使用的局部变量全部删除
*/

// 内存泄露的排查手段
// performance 面板 和 memory 面板可以找到泄露的现象和位置









