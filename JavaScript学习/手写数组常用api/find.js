/* 
    array.find(function(item, index, arr), thisValue)

    function(item, index,arr) 	item 必需 当前元素, index 可选。当前元素的索引值, arr 可选。当前元素所属的数组对象
    thisValue	可选。 传递给函数的值一般用 "this" 值。
    如果这个参数为空， "undefined" 会传递给 "this" 值 
*/
/*  
    注意: find() 对于空数组，函数是不会执行的。
          find() 并没有改变数组的原始值。 
*/
// 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。


let a = [3, 10, 18, 20].find((item, index) => {
    return item >= 18
})
console.log(a); // 18

// 手写 find
Array.prototype.myFind = function (fn) {

    if (!fn) throw new TypeError('undefined is not a function')
    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) {
            return this[i]
        }
    }

    return undefined
}

// 测试用例
let b = [3, 10, 18, 20].myFind((item, index) => {
    return item >= 18
})
console.log(b); // 18