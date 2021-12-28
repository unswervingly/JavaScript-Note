/* 
    array.findIndex(function(item, index, arr), thisValue)

    function(item, index,arr) 	item 必需 当前元素, index 可选。当前元素的索引值, arr 可选。当前元素所属的数组对象
    thisValue	可选。 传递给函数的值一般用 "this" 值。
    如果这个参数为空， "undefined" 会传递给 "this" 值 
*/
// 它会返回数组中满足提供的函数的第一个元素的索引，否则返回 -1。

let a = [12, 5, 8, 130, 44].findIndex((item, index) => {
    // console.log(item, index);
    return item >= 15
});
console.log(a); // 3


// 手写 findIndex
Array.prototype.myFindIndex = function (fn) {

    if (!fn) throw new TypeError('undefined is not a function')
    if (typeof fn !== 'function') throw new TypeError('fn is not a function')

    console.log(this); // [12, 5, 8, 130, 44]
    for (let i = 0; i < this.length; i++) {
        // console.log(fn(this[i], i, this));
        if (fn.call(this, this[i], i, this)) {
            return i
        }
    }

    return -1
}

// 测试用例
let b = [12, 5, 8, 130, 44].myFindIndex((item, index) => {
    // console.log(item, index);
    return item >= 15
});
console.log(b);
