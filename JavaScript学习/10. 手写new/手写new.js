function realizeNew() {
    // 新建了一个对象obj
    let obj = {};

    // 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
    con = [].shift.call(arguments)

    // 将 obj 的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
    if (con.prototype !== null) {
        obj.__proto__ = con.prototype;
    }

    // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
    let result = con.apply(obj, arguments);

    // 优先返回构造函数返回的对象
    if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result;
    }

    return obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log("I am " + this.name)
    }
}


let person = realizeNew(Person, "czm", 18);
console.log(person.name);
console.log(person.age);
person.say()