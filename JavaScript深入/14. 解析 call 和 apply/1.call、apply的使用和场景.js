/* 
    call() 和 apply()
    apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
    call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。

    call() 和 apply()的区别在于，call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组
 */
// 举个例子：
var func = function (arg1, arg2) {
    console.log(arg1, arg2);
};

func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]) // 使用 apply，参数数组


// 使用场景
// 1、合并两个数组
var arr1 = ['a', 'b'];
var arr2 = ['c', 'd'];

// 将第二个数组融合进第一个数组
// 相当于 arr1.push('c', 'd');
Array.prototype.push.apply(arr1, arr2);
// 4
arr1;
// ['a', 'b', 'c', 'd']

// 当第二个数组(如示例中的 arr2 )太大时不要使用这个方法来合并数组，因为一个函数能够接受的参数个数是有限制的。
// 不同的引擎有不同的限制，JS核心限制在 65535，有些引擎会抛出异常，有些不抛出异常但丢失多余参数。

// 如何解决呢？方法就是将参数数组切块后循环传入目标方法



// 2、获取数组中的最大值和最小值
var numbers = [5, 458, 120, -215];
Math.max.apply(Math, numbers);   //458    
Math.max.call(Math, 5, 458, 120, -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
// 因为数组 numbers 本身没有 max 方法，但是 Math 有呀，所以这里就是借助 call / apply 使用 Math.max 方法。



// 3、验证是否是数组
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 直接使用 toString()
[1, 2, 3].toString(); 	// "1,2,3"
"123".toString(); 		// "123"
123.toString(); 		// SyntaxError: Invalid or unexpected token
Number(123).toString(); // "123"
Object(123).toString(); // "123"


// 4、类数组对象使用数组方法
var domNodes = document.getElementsByTagName("*");
domNodes.unshift("h1");
// TypeError: domNodes.unshift is not a function

var domNodeArrays = Array.prototype.slice.call(domNodes);
domNodeArrays.unshift("h1"); // 505 不同环境下数据不同
// (505) ["h1", head, meta, ...]
/* 
    类数组对象有下面两个特性

    1、具有：指向对象元素的数字索引下标和 length 属性
    2、不具有：比如 push 、shift、 forEach 以及 indexOf 等数组对象具有的方法 

    要说明的是，类数组对象是一个对象。JS中存在一种名为类数组的对象结构，
    比如 arguments 对象，还有DOM API 返回的 NodeList 对象都属于类数组对象，类数组对象不能使用 push/pop/shift/unshift 等数组方法，
    通过 Array.prototype.slice.call 转换成真正的数组，就可以使用 Array下所有方法。
*/
// 类数组对象转数组的其他方法：

// 上面代码等同于
var arr3 = [].slice.call(arguments);

// ES6:
let arr4 = Array.from(arguments);
// Array.from() 可以将两类对象转为真正的数组：类数组对象和可遍历（iterable）对象（包括ES6新增的数据结构 Set 和 Map）
let arr5 = [...arguments];

// 扩展一：为什么通过 Array.prototype.slice.call() 就可以把类数组对象转换成数组？
// slice 将 类数组 对象通过下标操作放进了新的 Array 里面。

// 扩展二：通过 Array.prototype.slice.call() 就足够了吗？存在什么问题？
// 在低版本IE下不支持通过Array.prototype.slice.call(args)将类数组对象转换成数组，
// 因为低版本IE（IE < 9）下的DOM对象是以 dom 对象的形式实现的，js对象与 dom 对象不能进行转换。

// 扩展三：为什么要有类数组对象呢？或者说类数组对象是为什么解决什么问题才出现的？
// JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。
// Array存储的对象能动态增多和减少，并且可以存储任何JavaScript值。
// JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着Web应用程序变得越来越强大,新增加的功能
// 如果使用JavaScript代码可以快速方便地通过类型化数组来操作原始的二进制数据，这将会非常有帮助。
// 一句话就是，可以更快的操作复杂数据。



// 5、调用父构造函数实现继承
function SuperType() {
    this.color = ["red", "green", "blue"];
}
function SubType() {
    // 核心代码，继承自SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.color.push("black");
console.log(instance1.color);
// ["red", "green", "blue", "black"]

var instance2 = new SubType();
console.log(instance2.color);
// ["red", "green", "blue"]
/* 
    缺点：

    只能继承父类的实例属性和方法，不能继承原型属性/方法
    无法实现复用，每个子类都有父类实例函数的副本，影响性能 
*/