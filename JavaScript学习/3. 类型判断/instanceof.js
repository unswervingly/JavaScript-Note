// 手写 instanceof

/* 
    instanceof 是通过原型链判断的，A(对象实例) instanceof B(构造函数或者父类型实例), 
    在A的原型链中层层查找，是否有__proto__等于B类型的.prototype，
    如果一直找到A的原型链的顶端(null）, 仍然不等于B.prototype，那么返回false，否则返回true. 
*/

function instance_of(L, R) {//L 表示左表达式，R 表示右表达式 
    // 基本类型判断
    if (typeof L !== 'object' || L === null) return false

    let O = R.prototype;   // 取 R 的显示原型 

    L = L.__proto__;  // 取 L 的隐式原型

    while (true) {

        if (L === null)

            return false;

        if (O === L)  // 当 O 显式原型 严格等于  L隐式原型 时，返回true

            return true;

        L = L.__proto__;

    }

}

console.log(instance_of([1, 2, 3], Array)); // true