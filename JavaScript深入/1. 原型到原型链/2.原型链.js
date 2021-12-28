/* 
    原型链：

    原型链是由 原型对象  组成，当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，
    如果没有则会去原型对象中寻找，
    如果又没有则这个原型对象又会有自己的原型寻找, 直到找到Object对象的原型，Object对象的原型没有原型，
    如果在Object原型中依然没有找到，则返回undefined。
    
    
*/

// 除了Object的原型对象（Object.prototype）的__proto__指向null，其他内置函数对象的原型对象（例如：Array.prototype）和自定义构造函数的
// __proto__都指向Object.prototype, 因为原型对象本身是普通对象。

Object.prototype.__proto__ = null;
Array.prototype.__proto__ = Object.prototype;
Foo.prototype.__proto__ = Object.prototype;
