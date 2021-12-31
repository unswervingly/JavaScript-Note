// this 规则优先级

// 1.默认规则的优先级最低

// 因为存在其他规则时，就会通过其他规则的方式来绑定this


// 2.显示绑定优先级高于隐式绑定

function foo() {
    console.log(this);
}

var obj1 = {
    name: "obj1",
    foo: foo
}

var obj2 = {
    name: "obj2",
    foo: foo
}

// 隐式绑定
obj1.foo(); // obj1
obj2.foo(); // obj2

// 隐式绑定和显示绑定同时存在
obj1.foo.call(obj2); // obj2, 说明显式绑定优先级更高


// 3.new绑定优先级高于隐式绑定

function foo() {
    console.log(this);
}

var obj = {
    name: "why",
    foo: foo
}

new obj.foo(); // foo对象, 说明new绑定优先级更高


// 4.new绑定优先级高于bind

// new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高
// 但是new绑定是否可以和bind后的函数同时使用是 可以

function foo() {
    console.log(this);
}

var obj = {
    name: "obj"
}

// var foo = new foo.call(obj);
var bar = foo.bind(obj);
var foo = new bar(); // 打印foo, 说明使用的是new绑定


// 优先级总结：

// new绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定



// this规则之外

// 这些规则已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。


// 1.忽略显示绑定

// 如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：

function foo() {
    console.log(this);
}

var obj = {
    name: "why"
}

foo.call(obj); // obj对象
foo.call(null); // window
foo.call(undefined); // window

var bar = foo.bind(null);
bar(); // window


// 2. 间接函数引用
// 创建一个函数的 间接引用，这种情况使用默认绑定规则

// (num2 = num1)的结果是num1的值；
var num1 = 100;
var num2 = 0;
var result = (num2 = num1);
console.log(result); // 100

// foo函数被直接调用，那么是默认绑定；
function foo() {
    console.log(this);
}

var obj1 = {
    name: "obj1",
    foo: foo
};

var obj2 = {
    name: "obj2"
}

obj1.foo(); // obj1对象
(obj2.foo = obj1.foo)();  // window
