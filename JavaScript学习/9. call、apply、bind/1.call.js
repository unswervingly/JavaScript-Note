/* 
    思路

    根据call的规则设置上下文对象,也就是this的指向。
    通过设置context的属性,将函数的this指向隐式绑定到context上
    通过隐式绑定执行函数并传递参数。
    删除临时属性，返回函数执行结果 
*/

Function.prototype.myCall = function (content = window) {

    // 给执行上下文 添加默认值， 如果没有传或传的值为空对象 context指向window
    // content = content || window;  相当于 content = window 
    // content 就是 测试的 foo
    console.log(content); // { value: 1 }

    // 必须此时调用MyCall的函数一个方法，那么我们只需要在context上扩展一个方法指向调用MyCall的一个方法这样this
    console.log(this) // [Function: bar]

    // call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法
    if (typeof this != 'function') {
        throw Error('not a function')
    }

    let fn = Symbol();          // 避免属性重复

    content[fn] = this;          //给context添加一个方法 指向this

    let args = [...arguments].slice(1);          // 取得参数列表

    let result = content[fn](...args);          // 传入参数

    delete content[fn];          // 删除fn 方法，一个中间变量用完删除

    return result;
}


// 测试用例
let foo = {
    value: 1
}

function bar(name, age) {
    console.log(name) // black
    console.log(age)  // 18
    console.log(this.value); //1
}
bar.myCall(foo, 'black', '18')