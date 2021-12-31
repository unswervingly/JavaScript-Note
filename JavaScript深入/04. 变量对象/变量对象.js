// 当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。
/*
    对于每个执行上下文，都有三个重要属性：

    变量对象(Variable object，VO)
    作用域链(Scope chain)
    this
*/

// 创建变量对象的过程。
// 变量对象
/*
    变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

    因为不同执行上下文下的变量对象稍有不同，有 全局上下文下的变量对象和 函数上下文下的变量对象。
*/


// 全局上下文
// 全局对象
/*
    1.可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。
    2.全局对象是由 Object 构造函数实例化的一个对象。

    全局上下文中的变量对象就是全局对象呐！
*/


// 函数上下文
/*
    在函数上下文中，用活动对象(activation object, AO)来表示变量对象。

    活动对象和变量对象的区别在于

    1、变量对象（VO）是规范上或者是JS引擎上实现的，并不能在JS环境中直接访问。
    2、当进入到一个执行上下文后，这个变量对象才会被激活，所以叫活动对象（AO），这时候活动对象上的各种属性才能被访问。

    活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象
*/


// 执行过程
/* 
    执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

    1. 进入执行上下文
    2. 代码执行 
*/

/* 
    1. 进入执行上下文
    很明显，这个时候还没有执行代码

    此时的变量对象会包括（如下顺序初始化）：

    1、函数的所有形参 (only函数上下文)：没有实参，属性值设为undefined。
    2、函数声明：如果变量对象已经存在相同名称的属性，则完全替换这个属性。
    3、变量声明：如果变量名称跟已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性。 
*/

// 举个例子：

function foo(a) {
    var b = 2;
    function c() { }
    var d = function () { };

    b = 3;

}

foo(1);
// 在进入执行上下文后，这时候的 AO 是：

AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    // c: reference to function c(){ },
    d: undefined
}

// 2. 代码执行
// 在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

// 还是上面的例子，当代码执行完后，这时候的 AO 是：

AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    // c: reference to function c(){ },
    // d: reference to FunctionExpression "d"
}
/* 
    简洁的总结我们上述所说：

    全局上下文的变量对象初始化是全局对象

    函数上下文的变量对象初始化只包括 Arguments 对象

    在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值

    在代码执行阶段，会再次修改变量对象的属性值 
*/



// 思考题
// 最后让我们看几个例子：

// 1.第一题

function foo() {
    console.log(a);
    a = 1;
}

foo(); // Uncaught ReferenceError: a is not defined
// 第一段会报错：Uncaught ReferenceError: a is not defined。
// 这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。

function bar() {
    a = 1;
    console.log(a);
}
bar(); // 1
// 第二段会打印：1
// 当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。


// 第二题
console.log(foo);
function foo() {
    console.log("foo");
}
var foo = 1;
// 会打印函数，而不是 undefined 。
// 这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。