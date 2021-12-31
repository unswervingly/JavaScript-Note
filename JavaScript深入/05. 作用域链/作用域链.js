// 作用域链
// 在当前作用域中查到值，但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。


// 以一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的。
// 1. 函数创建
// 函数的作用域在函数定义的时候就决定了。

// 这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，
// 你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！
function foo() {
    function bar() {
    }
}
// 函数创建时，各自的[[scope]]为：
/* 
foo.[[scope]] = [
    globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
 */

// 2. 函数激活
// 当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。
// 至此，作用域链创建完毕。



// 总结一下函数执行上下文中作用域链和变量对象的创建过程：
var scope = "global scope";
function checkScope() {
    var scope2 = 'local scope';
    return scope2;
}
checkScope();

// 执行过程如下：
// 1.checkScope 函数被创建，保存作用域链到 内部属性[[scope]]

checkScope.[[scope]] = [
    globalContext.VO
];
// 2.执行 checkScope 函数，创建 checkScope 函数执行上下文，checkScope 函数执行上下文被压入执行上下文栈

ECStack = [
    checkScopeContext,
    globalContext
];
// 3.checkScope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链

checkScopeContext = {
    Scope: checkScope.[[scope]],
}
// 4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

checkScopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: checkScope.[[scope]],
}
// 5.第三步：将活动对象压入 checkScope 作用域链顶端

checkScopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
// 6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

checkScopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}

// 7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

ECStack = [
    globalContext
];