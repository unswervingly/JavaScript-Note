// 1、JavaScript 双层for循环去重
const arr1 = [1, 1, '1', '1'];

function unique(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

console.log(unique(arr1)); // [1, "1"]
// 优点：兼容性好



// 2、用 indexOf 简化内层的循环
const arr2 = [1, 1, '1'];

function unique(arr) {
    //新建空数组
    const res = [];

    for (let i = 0; i < arr.length; i++) {
        // 判断 res里面有没有一样的，没有是 -1
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }

    return res;
}

console.log(unique(arr2));



// 3、排序后去重
const arr3 = [1, 2, 2, 1, 4, 8, 8, 9, 100, -1];

function uniqueSort(arr) {
    //对原数组进行排序，纯字符串可以用这个
    const arrSort = arr.sort((a, b) => a - b);

    //新建空数组
    const newArr = [];

    //将排序后数值的第一项给添加到新数组
    newArr.push(arrSort[0]);

    //遍历排序后的数组
    for (var i = 1; i < arrSort.length; i++) {
        //若当前项与新数组最后一项不同，这添加到新数组
        if (arrSort[i] !== newArr[newArr.length - 1]) {
            newArr.push(arrSort[i]);
        }
    }
    //返回新数组
    return newArr;
}

console.log(uniqueSort(arr3));

// 4、filter + indexOf
const arr4 = [1, 2, 1, 1, '1'];

function unique(arr) {
    let res = arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })

    return res;
}

console.log(unique(arr4));


// ES 6方法
// 5、set 方法
const arr5 = [1, 2, 1, 1, '1'];

function unique(arr) {
    return Array.from(new Set(arr));
}

// 简化
// function unique(array) {
//     return [...new Set(array)];
// }

console.log(unique(arr5)); // [1, 2, "1"]

// 6、map 方法
function unique(arr) {
    const map = new Map()
    return arr.filter((item) => !map.has(item) && map.set(item, 1))
}

console.log(unique(arr5)); // [1, 2, "1"]
