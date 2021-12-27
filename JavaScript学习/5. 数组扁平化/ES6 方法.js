// 实现一个方法使多维数组变成一维数组

// 当数组里面有一个元素为数组，则数组进行解构（用扩展运算符实现），每一次循环都可以减少一次（倒数第二）外层的[]，直到数组里面不再有数组
function flatten(arr) {
    // some和forEach一样，但是 some有返回值，满足条件，返回true
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }  //ES6新方法

    return arr;
}

console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
