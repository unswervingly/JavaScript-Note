// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

// 柯里化:
function curry(dynamicAdd) {
    // 存参数
    let allArgs = [];

    // 使用闭包
    function fn() {
        // 把闭包里面的 arguments都存到 allArgs
        allArgs = [...allArgs, ...arguments]

        return fn;
    }

    // 在解析一个函数的原始值时，会用到toString
    // 重写toString
    fn.toString = function () {
        // 判断 有没有值
        if (!allArgs.length) {
            return;
        }

        // 把 allArgs 传到 dynamicAdd
        return dynamicAdd.apply(null, allArgs);
    }

    return fn;
}


function dynamicAdd() {
    // arguments 就是 使用 dynamicAdd.apply(null, allArgs) 传过来的allArgs值
    // return [...arguments].reduce((prev, curr) => {
    //     return prev + curr
    // }, 0)
    return [...arguments]
}
var add = curry(dynamicAdd);
let a = add(1, 2)(3)(4);
let b = add(1, 2)(3)();
console.log(a.toString());
console.log(b.toString());
console.log(a);