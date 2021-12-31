/* 
    this的绑定规则总共有下面5种。

    1、默认绑定（严格/非严格模式）
    2、隐式绑定
    3、显式绑定
    4、new绑定
    5、箭头函数绑定 
*/

// 1 调用位置
// 调用位置就是函数在代码中被调用的位置（而不是声明的位置）。
// 分析调用栈：调用位置就是当前正在执行的函数的前一个调用中

function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域

    console.log("baz");
    bar(); // <-- bar的调用位置
}

function bar() {
    // 当前调用栈是：baz --> bar
    // 因此，当前调用位置在baz中

    console.log("bar");
    foo(); // <-- foo的调用位置
}

function foo() {
    // 当前调用栈是：baz --> bar --> foo
    // 因此，当前调用位置在bar中

    console.log("foo");
}

baz(); // <-- baz的调用位置



// 2 绑定规则
// 2.1 默认绑定
/* 
    独立函数调用，可以理解成函数没有被绑定到某个对象上进行调用，this指向全局对象。

    严格模式下，不能将全局对象用于默认绑定，this会绑定到undefined。
    只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

    在严格模式下调用函数则不影响默认绑定。 
*/

// 案例一：普通函数调用
function foo() {
    console.log(this); // window
}

foo();


//案例二： 函数调用链（一个函数又调用另外一个函数）
// 2.案例二:
function test1() {
    console.log(this); // window
    test2();
}

function test2() {
    console.log(this); // window
    test3()
}

function test3() {
    console.log(this); // window
}
test1();


// 案例三：将函数作为参数，传入到另一个函数中
function foo(func) {
    func()
}

function bar() {
    console.log(this); // window
}

foo(bar);


// 案例四：严格模式下的
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";

    console.log(this.a);
}

var a = 2;

// 调用
foo(); // TypeError: Cannot read property 'a' of undefined

// --------------------------------------

function foo() { // 运行
    console.log(this.a);
}

var a = 2;

(function () { // 严格模式下调用函数则不影响默认绑定
    "use strict";

    foo(); // 2
})();


// 2.2 隐式绑定
// 当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。
// 对象属性引用链中只有上一层或者说最后一层在调用中起作用。

// 案例一：通过对象调用函数
function foo() {
    console.log(this.a);
}

var obj = {
    name: "obj1",
    foo: foo
};

obj.foo(); // obj1

// 案例二：多个对象调用
function foo() {
    console.log(this); // obj对象
}

var obj1 = {
    name: "obj1",
    foo: foo
}

var obj2 = {
    name: "obj2",
    obj1: obj1
}

obj2.obj1.foo(); // obj1


// 案例三：隐式丢失
// 被隐式绑定的函数特定情况下会丢失绑定对象，应用 默认绑定，把this绑定到全局对象或者undefined上。
function foo() {
    console.log(this);
}

var obj1 = {
    name: "obj1",
    foo: foo
}

// 讲obj1的foo赋值给bar
var bar = obj1.foo;
bar(); // window
// 因为foo最终被调用的位置是bar，而bar在进行调用时没有绑定任何的对象，也就没有形成隐式绑定；


// 参数传递就是一种隐式赋值，传入函数时也会被隐式赋值。回调函数丢失this绑定是非常常见的。
function foo() {
    console.log(this.a);
}

function doFoo(fn) {
    // fn其实引用的是foo

    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo(obj.foo); // "oops, global"


// 2.3 显式绑定
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
};

foo.call(obj); // 2  调用foo时强制把foo的this绑定到obj上


// 显示绑定无法解决丢失绑定问题。
// 如果我们希望一个函数总是显示的绑定到一个对象上

// 解决方案：
// 1.硬绑定
// ES5内置了Function.prototype.bind，bind会返回一个硬绑定的新函数
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5

// 2、API调用的“上下文”
// JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），
// 其作用和bind(..)一样，确保回调函数使用指定的this。
// 这些函数实际上通过call(..)和apply(..)实现了显式绑定。

function foo(el) {
    console.log(el, this.id);
}

var obj = {
    id: "awesome"
}

var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach(foo, obj);
// 1 awesome 2 awesome 3 awesome

// 2.4 new绑定
// 使用new来调用foo(..)时，会构造一个新对象并把它（bar）绑定到foo(..)调用中的this。

function foo(a) {
    this.a = a;
}

var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log(bar.a); // 2


// 5.ES6箭头函数
// 箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。
// 箭头函数的绑定无法被修改(new也不行)。
// 案例一: 
var obj = {
    getData: function () {
        setTimeout(() => {
            console.log(this); // getData
        }, 1000);
    }
}

obj.getData();
// 为什么在setTimeout的回调函数中可以直接使用this呢？
// 因为箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this


// 案例二:
var obj = {
    data: [],
    getData: () => {
        setTimeout(() => {
            console.log(this); // window
        }, 1000);
    }
}

obj.getData();
// 不断的从上层作用域找，那么找到了全局作用域；
// 在全局作用域内，this代表的就是window


