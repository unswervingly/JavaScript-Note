/*
    作用域
    作用域是指变量和函数的作用范围

    作用域规定了确定当前执行代码对变量的访问权限。

    JavaScript 采用词法作用域，也就是静态作用域。
*/
/* 
    全局作用域和函数作用域

    ES 6 之前JavaScript 没有块级作用域,只有全局作用域和函数作用域

    全局作用域：在任何地方都能访问，函数外定义的变量拥有全局作用域，所有window对象上的属性拥有全局作用域 ，没有声明在任何函数内部的函数拥有全局作用域
    全局作用域在页面打开时创建，页面关闭时销毁；

    函数作用域：是指函数内部声明的所有变量，在函数体内始终可见，可以在整个函数的范围内使用及复用。
    局部变量在函数执行完毕后销毁

    块级作用域：声明的变量在指定块的作用域外是无法被访问。块级作用域可通过新增命令let和const声明。 
*/



// 静态作用域与动态作用域
// 因为 JavaScript 采用的是词法作用域，函数的作用域在 函数定义的时候 就决定了。

// 而动态作用域，函数的作用域是在 函数调用的时候 才决定的。
let value = 1;

function foo() {
    console.log(value);
}

function bar() {
    let value = 2;
    foo();
}

bar(); // 结果是 1
/* 
    分析
    假设JavaScript采用静态作用域，让我们分析下执行过程：

    执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。


    假设JavaScript采用动态作用域，让我们分析下执行过程：

    执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。 
*/


// 动态作用域
// bash 就是动态作用域


// 思考题
let scope = "global scope";
function checkScope1() {
    let scope = "local scope";
    function f() {
        return console.log(scope);
    }
    return f();
}
checkScope1(); // local scope

let scope1 = "global scope";
function checkScope2() {
    let scope1 = "local scope";
    function f() {
        return console.log(scope1);
    }
    return f;
}
checkScope2()(); // local scope
// 因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。

// 虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？关于执行上下文栈有关系
