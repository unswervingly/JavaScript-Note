// Window对象
// Window对象有一个特性：Window.window指向自身。
// Window.window === Window; //true


/*
    实现思路: 
    对于类数组对象，只要该对象中存在length属性
    并且length为非负整数
    且在有限范围之内即可判断为类数组对象。 
*/
// 1、类数组对象 实现
function isArrayLike(o) {
    // o 不为空，未定义，等等
    if (o &&
        // o 是对象
        typeof o === "object" &&
        // o.length 是一个有限的数
        isFinite(o.length) &&
        // o.length 是非负的
        o.length >= 0 &&
        // o.length 是一个整数
        o.length === Math.floor(o.length) &&
        // o.length < 2^32  数组的上限值
        o.length < 4294967296)
        return true;
    else
        return false;
}
// 以上的判断无论是真的数组对象或是类数组对象都会返回true,无法区分到底是真的数组对象还是类数组对象
// 其实只需要先判断是否为数组对象即可。

function utilArray(o) {
    if (Array.isArray(o)) {
        return '是数组';
    }
    if (isArrayLike(o)) {
        return '是类数组';
    } else {
        return '既不是 数组 也不是 类数组';
    }
}
console.log(utilArray({ "0": "a", "1": "b", "2": "c", length: 3 })); // 是类数组


// 2、类数组对象的转换
// 2.1 Array.from
// 该方法从一个类似数组或可迭代对象中创建一个新的数组实例。

Array.from('foo'); // ["f", "o", "o"]

// 2.2 Array.prototype.slice
// 该方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。

const a = { "0": "a", "1": "b", "2": "c", length: 3 };
Array.prototype.slice.call(a, 0); // ["a", "b", "c"]

// 2.3 ES6扩展运算符

let b = "hello";
[...b]; // ["h", "e", "l", "l", "o"]


// 3、类数组对象的特征
// 类数组对象并不关心除了数字索引和length以外的东西。

const c = { "1": "a", "2": "b", "4": "c", "abc": "abc", length: 5 };
Array.prototype.join.call(c, "+"); // +a+b++c

// 其中，'0'和'3'没有直接省略为两个undefined，同样的abc被忽略为undefined。
// 如果length多出实际的位数会补undefined（空位也补充undefined），少位则截断后面的数组成员。

const a = { "1": "a", "2": "b", "4": "c", "abc": "abc", length: 6 };
Array.from(a); // [undefined, "a", "b", undefined, "c", undefined]

const a = { "1": "a", "2": "b", "4": "c", "abc": "abc", length: 5 };
Array.from(a); // [undefined, "a", "b", undefined, "c"]

const a = { "1": "a", "2": "b", "4": "c", "abc": "abc", length: 4 };
Array.from(a); // [undefined, "a", "b", undefined]