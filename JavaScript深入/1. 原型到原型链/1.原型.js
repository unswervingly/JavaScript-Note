// 1、为什么需要原型及原型链？
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.eat = function () {
        console.log(age + "岁的" + name + "在吃饭。");
    }
}

let p1 = new Person("czm", 18);
let p2 = new Person("czm", 18);

console.log(p1.eat === p2.eat); // false
// 可以看到，对于同一个函数，我们通过 new 生成出来的实例，都会开出新的一块堆区，所以上面代码中 person 1 和 person 2 的吃饭是不同的。
/*
    拥有属于自己的东西（例如房子、汽车），这样很好。但它也有不好，毕竟总共就那么点地儿（内存），你不停地建房子，到最后是不是没有空地了？（内存不足）
    所以，咱要想个法子，建个类似于共享库的对象（例如把楼房建高），这样就可以在需要的时候，调用一个类似共享库的对象（社区），让实例能够沿着某个线索去找到自己归处。
    而这个线索，在前端中就是原型链 prototype。
*/


// 对象由函数创建，函数都是Function对象实例。



// 2、prototype
// js分为函数对象和普通对象，每个对象 都有__proto__属性，但是只有 函数对象 才有prototype属性

function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'czm';
let person1 = new Person();
let person2 = new Person();
console.log(person1.name) // czm
console.log(person2.name) // czm
// 函数的 prototype 属性指向了一个对象，这个对象正是调用该 构造函数而 创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。



// 3、constructor
// 原型对象 会自动获得一constructor属性，这个属性 又指回构造函数。
// 所以Person.prototype.constructor是指向Person的
function Person() {

}
console.log(Person === Person.prototype.constructor); // true



// 4、__proto__
// 这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向 该对象的原型。

function Person() {

}
let person = new Person();
console.log(person.__proto__ === Person.prototype); // true



// 总结：
function Person() {

}

let person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true



// 5、prototype、__proto__ 区别
/*
    1. 对象有属性__proto__，指向该对象的构造函数的原型对象。

    2. 方法除了有属性__proto__，还有属性prototype，prototype指向该方法的原型对象。
*/



// 6、实例与原型
// 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
function Person() {

}

Person.prototype.name = 'clm';

let person = new Person();

person.name = 'czm';
console.log(person.name) // czm

delete person.name;
console.log(person.name) // clm
/*
    在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 czm
    但是当我们删除了 person 的 name 属性时，读取 person.name，
    从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.__proto__ ，
    也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 clm
*/



// 7、原型的原型
// 原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它
let obj = new Object();
obj.name = 'czm'
console.log(obj.name) // czm
// 原型对象就是通过 Object 构造函数生成的，实例的 __proto__ 指向构造函数的 prototype 



// 补充三点大家可能不会注意的地方

// 1、constructor
function Person() {

}
let person = new Person();
console.log(person.constructor === Person); // true
/*
    当获取 person.constructor 时，其实 person 中并没有 constructor 属性,
    当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，

    所以： person.constructor === Person.prototype.constructor
*/


// 2、__proto__
// 绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype
// 与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。


// 3、真的是继承吗？
/*

    “每一个对象都会从原型‘继承’属性”，
    实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：

    继承意味着 复制操作，然而 JavaScript 默认并不会复制对象的属性，
    相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，
    所以与其叫继承，委托的说法反而更准确些。
*/


// 记住四个概念两个准则，任何原型链相等判断都能判断正确；
/* 
    首先我们要清楚明白两个概念：

    1. js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
    2. Object、Function都是js内置的函数, 类似的还有我们常用到的Array、RegExp、Date、Boolean、Number、String


    那么__proto__和prototype到底是什么，两个概念理解它们

    3. 属性__proto__是一个对象，它有两个属性，constructor和__proto__；
    4. 原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建；


    js之父在设计js原型、原型链的时候遵从以下两个准则
    
    1. Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
    2. person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方** 
*/