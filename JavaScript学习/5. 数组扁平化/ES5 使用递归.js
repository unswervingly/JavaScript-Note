// 实现一个方法使多维数组变成一维数组

// concat合并数组 + 递归调用
function flatten(arr) {
    // 用来存储结果
    let result = []

    // 循环数组长度
    arr.forEach(item => {
        // 判断是不是数组
        if (Array.isArray(item)) {
            // 是，就 concat合并数组, 递归调用
            result = result.concat(flatten(item))
        } else {
            // 不是，就push 到 result中
            result.push(item)
        }
    });

    // 返回结果
    return result
}

console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]));


// reduce + 递归
function flatten(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
