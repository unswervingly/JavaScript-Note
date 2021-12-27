Function.prototype.myApply = function (content = window) {

    // 如果没有传或传的值为空对象 context指向window
    // content = content || window;  相当于 content = window 
    // content 就是 测试的 foo
    console.log(content); // { value: 1, say: [Function: say] }

    console.log(this) // [Function: bar]

    // call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法
    if (typeof this != 'function') {
        throw Error('not a function')
    }

    let fn = Symbol(content);          // 避免属性重复

    content[fn] = this;                //给context添加一个方法 指向this

    let result;
    // 判断是否有第二个参数
    if (arguments[1]) {
        result = content[fn](...arguments[1])
    } else {
        result = content[fn]()
    }

    delete content[fn];         // 删除fn 方法，一个中间变量用完删除

    return result;
}

let foo = {
    value: 520,
    say() {
        console.log(this.value);
    }
};
let bar = function (name, age, school) {
    console.log(name); // 'czm'
    console.log(age); // 22
    console.log(school) // '家里蹲大学'
    this.say() // 520
};
let result = bar.myApply(foo, ['czm', 18, '家里蹲大学']); //预置了部分参数'czm'



