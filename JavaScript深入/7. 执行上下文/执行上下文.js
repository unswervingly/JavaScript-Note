// 对于每个执行上下文，都有三个重要属性：

// 变量对象(Variable object，VO)
// 作用域链(Scope chain)
// this



// 执行上下文的具体处理过程。
// 分析：
var scope = "global scope";
function checkScope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkScope();

// 执行过程如下：

// 1.执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈

ECStack = [
    globalContext
];
// 2.全局上下文初始化

globalContext = {
    VO: [global],
    Scope: [globalContext.VO],
    this: globalContext.VO
}
// 2.初始化的同时，checkScope函数被创建，保存作用域链到函数的内部属性[[scope]]

checkScope.[[scope]] = [
    globalContext.VO
];
// 3.执行 checkScope 函数，创建 checkScope 函数执行上下文，checkScope 函数执行上下文被压入执行上下文栈

ECStack = [
    checkScopeContext,
    globalContext
];
// 4.checkScope 函数执行上下文初始化：

// 复制函数[[scope]] 属性创建作用域链，
// 用 arguments 创建活动对象，
// 初始化活动对象，即加入形参、函数声明、变量声明，
// 将活动对象压入 checkScope 作用域链顶端。

// 同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]]
checkScopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope: undefined,
        f: reference to function f(){ }
    },
Scope: [AO, globalContext.VO],
    this: undefined
}
// 5.执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈

ECStack = [
    fContext,
    checkScopeContext,
    globalContext
];
// 6.f 函数执行上下文初始化, 以下跟第 4 步相同：

// 复制函数 [[scope]] 属性创建作用域链
// 用 arguments 创建活动对象
// 初始化活动对象，即加入形参、函数声明、变量声明
// 将活动对象压入 f 作用域链顶端
fContext = {
    AO: {
        arguments: {
            length: 0
        }
    },
    Scope: [AO, checkScopeContext.AO, globalContext.VO],
    this: undefined
}
// 7.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值

// 8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

ECStack = [
    checkScopeContext,
    globalContext
];





// 第二段代码的执行过程。

var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}
checkscope()();
// 1.进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
// 2.全局执行上下文初始化
// 3.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
// 4.checkscope 执行上下文初始化，创建变量对象、作用域链、this等
// 5.checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
// 6.执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
// 7.f 执行上下文初始化，创建变量对象、作用域链、this等
// 8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

// 当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，还会读取到 checkscope 作用域下的 scope 值