// MDN 对闭包的定义为：
// 闭包是指那些能够访问自由变量的函数。

// 那什么是自由变量呢？
// 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。其实就是另外一个函数作用域中的变量。
function getOuter() {
    var date = '1127';
    function getDate(str) {
        console.log(str + date);  //访问外部的date
    }
    return getDate('今天是：'); //"今天是：1127"
}
getOuter();
// 其中date既不是参数arguments，也不是局部变量，所以date是自由变量。


// 分析例子
var scope = "global scope";
function checkScope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}

var foo = checkScope(); // foo指向函数f
foo();					// 调用函数f()
/* 
    简要的执行过程如下：

    进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈

    全局执行上下文初始化

    执行 checkScope 函数，创建 checkScope 函数执行上下文，checkScope 执行上下文被压入执行上下文栈

    checkScope 执行上下文初始化，创建变量对象、作用域链、this等

    checkScope 函数执行完毕，checkScope 执行上下文从执行上下文栈中弹出

    执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈

    f 执行上下文初始化，创建变量对象、作用域链、this等

    f 函数执行完毕，f 函数上下文从执行上下文栈中弹出 
*/
// 有个问题：函数f 执行的时候，checkScope 函数上下文已经被销毁了，那函数f是如何获取到scope变量的呢？
/* 
    fContext = {
        Scope: [AO, checkScopeContext.AO, globalContext.VO],
    }
    
    所以指向关系是当前作用域 --> checkScope作用域--> 全局作用域，
    即使 checkScopeContext 被销毁了，但是 JavaScript 依然会让 checkScopeContext.AO（活动对象） 活在内存中，
    f 函数依然可以通过 f 函数的作用域链找到它，这就是闭包实现的关键。 
*/



// 看这道刷题必刷，面试必考的闭包题：
var data = [];
for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();

// 答案是都是 3，让我们分析一下原因：
// 当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}

// 当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
data[0]Context = {
    Scope: [AO, globalContext.VO]
}
// data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。
// data[1] 和 data[2] 是一样的道理。


// 所以让我们改成闭包看看：
var data = [];
for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
        return function () {
            console.log(i);
        }
    })(i);
}

data[0]();
data[1]();
data[2]();

// 当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}

// 当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}

// 匿名函数执行上下文的AO为：
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
// data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，
// 即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

// data[1] 和 data[2] 是一样的道理。