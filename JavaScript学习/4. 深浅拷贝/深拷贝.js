/* 
    深拷贝

    现在有一个对象A，需求是将A拷贝一份到B对象当中？
    当B拷贝了A的数据，且当B的改变不会导致A的改变时，此时叫B深拷贝了A 
*/

//深拷贝
const A = {
    name: "czm",
    data: { num: 10 },
    say: function () {
        console.log("hello world")
    }
} //开辟了一个新的堆内存地址，假设为placeA

let B = {};  //又开辟了一个新的堆内存地址，假设为placeB

B = JSON.parse(JSON.stringify(A));
B.name = "lucy";
console.log(A.name);    // czm

// 通过 JSON对象方法实现对象的深拷贝，我们可以看到其中B.name值的改变并 没有影响A.name的值
// 因为A和B分别 指向不同的堆内存地址，因此两者互不影响。
/* 
    注意： 使用JSON对象方法实现对象的深拷贝有 缺点的
    1.如果obj里面有 时间对象，则JSON.stringify后再JSON.parse的结果，时间将 只是字符串的形式，而 不是对象的形式
    2.如果obj里有 RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象；
    3、如果obj里有 函数，undefined，则序列化的结果会把函数或 undefined丢失；
    4、如果obj里有 NaN、Infinity和-Infinity，则序列化的结果会变成null 
    5、JSON.stringify()只能 序列化对象的 可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
    6、如果对象中存在 循环引用的情况 也无法正确实现深拷贝；
*/

// JSON.stringify()与toString()这两者虽然都可以将目标值转为字符串，但本质上还是有区别的，比如
let arr = [1, 2, 3];
console.log(JSON.stringify(arr)); // '[1,2,3]'
console.log(arr.toString()); // 1,2,3


// 递归赋值实现 深拷贝
const object = {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: {
        e: {
            f: 3
        }
    }
}


function deepClone(obj) {
    // 创建一个变量
    let res;

    // 判断是不是数组
    if (Array.isArray(obj)) {
        // 使用map获取数组，再用递归去调用
        res = obj.map((item) => deepClone(item));

        // 判断是不是对象
    } else if (typeof obj === 'object' && obj !== null) {
        // 把变量变成一个空对象
        res = {};

        // 通过 for in 拿到 obj的键
        for (let key in obj) {
            // 设置res对象的键 是res[key] 去递归调用 把值赋给这个键
            res[key] = deepClone(obj[key]);
        }
    } else {
        // 如果都不是数组和对象就直接输出
        return obj;
    }

    // 返回结果
    return res;
}


const a = deepClone(object)
console.log(a);
console.log(object);

