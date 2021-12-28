var foo = function () {
    console.log('foo1');
}
foo();  // foo1

var foo = function () {
    console.log('foo2');
}
foo(); // foo2


function foo() {
    console.log('foo1');
}
foo();  // foo2

function foo() {
    console.log('foo2');
}
foo(); // foo2

/*
    因为 JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。
    当执行一段代码的时候，会进行一个“准备工作”，
    比如第一个例子中的变量提升，和第二个例子中的函数提升。
*/



// JavaScript 中 可执行代码(executable code)的类型有哪些了。
// 其实很简单，就三种，全局代码、函数代码、eval代码。



// 执行上下文栈
/* 
    JavaScript 引擎创建了执行上下文栈来管理执行上下文。
    初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，
    当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，
    当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。
    可以把执行上下文栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。 
*/
// 比如：
function fun3() {
    console.log('fun3')
}
function fun2() {
    fun3();
}
function fun1() {
    fun2();
}
fun1();
// 解析：
// 伪代码
// fun1()
// ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
// ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
// ECStack.push(<fun3> functionContext);

// fun3执行完毕
// ECStack.pop();

// fun2执行完毕
// ECStack.pop();

// fun1执行完毕
// ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext(全局执行上下文)




// 解答思考题 作用域
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

// 两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

// 答案就是执行上下文栈的变化不一样。
/* 

    让我们模拟第一段代码：

    ECStack.push(<checkScope1> functionContext);
    ECStack.push(<f> functionContext);
    ECStack.pop();
    ECStack.pop();

    让我们模拟第二段代码：

    ECStack.push(<checkScope2> functionContext);
    ECStack.pop();
    ECStack.push(<f> functionContext);
    ECStack.pop();
*/

