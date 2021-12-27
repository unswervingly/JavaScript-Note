// 1、Object 键值对
// 利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，
// 比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。

const arr1 = [1, 2, 1, 1, '1'];

function unique(arr) {
    const obj = {};
    return arr.filter((item) => {
        // hasOwnProperty 用来检测属性是否为对象的自有属性
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}

console.log(unique(arr1)); // [1, 2]

// 是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，
// 这是因为对象的键值是字符串,如果是数字，取值的时候就不能用英文句号(.)，只能用[]的方式取值。
const arr2 = [1, 2, 1, 1, '1'];

function unique(arr) {
    const obj = {};
    return arr.filter((item) => {
        // console.log(typeof item + item);
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

console.log(unique(arr2)); // [1, 2, "1"]

// 无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，因为 typeof item + item 的结果都会是 object[object Object]，
// 不过我们可以使用 JSON.stringify 将对象序列化
const arr3 = [{ value: 1 }, { value: 1 }, { value: 2 }];

function unique(arr) {
    var obj = {};
    return arr.filter((item) => {
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(arr3)); // [{value: 1}, {value: 2}]

// 看似已经万无一失，但考虑到 JSON.stringify 任何一个正则表达式的结果都是 {}，所以这个方法并不适用于处理正则表达式去重。
console.log(JSON.stringify(/a/)); // {}
console.log(JSON.stringify(/b/)); // {}





// 特殊类型比较 去重方法
/* 
    先看几个例子
    var str1 = '1';
    var str2 = new String('1');

    console.log(str1 == str2); // true
    console.log(str1 === str2); // false

    console.log(null == null); // true
    console.log(null === null); // true

    console.log(undefined == undefined); // true
    console.log(undefined === undefined); // true

    console.log(NaN == NaN); // false
    console.log(NaN === NaN); // false

    console.log(/a/ == /a/); // false
    console.log(/a/ === /a/); // false

    console.log({} == {}); // false
    console.log({} === {}); // false 
    // 因为对象是引用地址来比较，不是值来比较
*/



// 对于这样一个数组
const array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

/*
    方法	            结果	                                                             说明
    for循环	            [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]	    对象和 NaN 不去重
    indexOf	            [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]	    对象和 NaN 不去重
    sort	            [/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]	对象和 NaN 不去重
    filter + indexOf	[1, "1", null, undefined, String, String, /a/, /a/]	                对象不去重
    优化后的键值对方法	  [1, "1", null, undefined, String, /a/, NaN]	                      全部去重
    Set	                [1, "1", null, undefined, String, String, /a/, /a/, NaN]	        对象不去重 NaN 去重
*/


// indexOf 底层还是使用 === 进行判断，因为 NaN === NaN的结果为 false，所以使用 indexOf 查找不到 NaN 元素
// Set 认为尽管 NaN === NaN 为 false，但是这两个元素是重复的。