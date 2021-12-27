// typeof
// JavaScript定义的数据类型有Undefined、Null、Boolean、Number、String、Object、Symbol（ES6新增）。

// 其中返回的字符串首字母都是小写的。

// 对于typeof null === 'object'来说，这其实是一个bug。

// 在JavaScript中，Object下还有很多细分的类型，比如说Date、RegExp、Error、Array、Function。

// typeof除了能够准确的判断出Function之外，对于其他细分类型均返回object。


/*
    实现思路：
    1.利用Object.prototype.toString()方法
    2.将Object.prototype.toString()方法获取的字符串进行截取
    3.利用toLowerCase()方法，将字符串转为小写
    4.通过map存储7种类型
    5.放到 type去验证有就 type，没有就'object'
*/
// 手写 typeof
function myTypeof(params) {
    console.log('toString', Object.prototype.toString.call(params)); // [object Number] [object String] ....

    // 提取已返回字符串的第8个到倒数第2个位置之间的字符
    const type = Object.prototype.toString.call(params).slice(8, -1).toLowerCase()

    const map = {
        'number': true,
        'string': true,
        'boolean': true,
        'undefined': true,
        'bigint': true,
        'symbol': true,
        'function': true
    }
    return map[type] ? type : 'object'
}

// 测试用例
console.log(myTypeof(1)); // number
console.log(myTypeof(''));// string
console.log(myTypeof(false));// boolean
console.log(myTypeof(null));// object
console.log(myTypeof(undefined));// undefined
console.log(myTypeof(10n));// bigint
console.log(myTypeof(Symbol()));// symbol
console.log(myTypeof(() => { }));// function
console.log(myTypeof([]));// object
console.log(myTypeof({}));// object

