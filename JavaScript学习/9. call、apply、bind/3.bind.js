/* 
    需要考虑：

    bind() 除了改变this指向外，还可传入多个参数；
    bind 创建的新函数可能传入多个参数；
    新函数可能被当做构造函数调用；
    函数可能有返回值；

    实现方法：

    bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）
    实现作用域绑定（apply）
    参数传递（apply 的数组传参）
    当作为构造函数的时候，进行原型继承 
*/



Function.prototype.myBind = function (context = window) {
    // call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法
    if (typeof this != 'function') {
        throw Error('not a function')
    }

    //返回一个绑定this的函数，我们需要在此保存this
    let self = this;

    // 保存参数
    let args = [...arguments].slice(1);

    //判断有没有传参进来，若为空则赋值[]
    args = args ? args : []

    //返回一个newFn函数，在里面调用self
    return function newFn() {
        // 因为返回了一个函数，可以 new F()，所以需要判断
        if (this instanceof newFn) {
            return new self(...args, ...arguments);
        } else {
            // bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以需要将两边的参数拼接起来
            return self.apply(context, [...args, ...arguments]);
        }
    }
}


let obj = {
    name: 'czm',
    age: 18,
    myFun: function (from, to) {
        console.log(this.name + ' 年龄 ' + this.age + '来自 ' + from + '去往' + to)
    }
}
let db = {
    name: 'clm',
    age: 18
}

//结果
obj.myFun.myBind(db, '成都', '上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db, ['成都', '上海'])();    // 德玛 年龄 99  来自 成都, 上海去往 undefined

