// 我们只要知道在 ECMAScript 规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑。
// 它与 this 的指向有着密切的关联。

// Reference
// Reference 类型就是用来 解释诸如 delete、typeof 以及赋值等操作行为的。
/* 
    Reference 的构成，由三个组成部分，分别是：

    base value
    referenced name
    strict reference 

    base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

    referenced name 就是属性的名称。
*/

// 举个例子：
var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
// 再举个例子：

var foo = {
    bar: function () {
        return this;
    }
};

foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};

// 而且规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。

// GetBase
// 返回 reference 的 base value。

// IsPropertyReference。
// 如果 base value 是一个对象，就返回true。

// GetValue
// 用于从 Reference 类型获取对应值的方法： GetValue。
var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
// GetValue 返回对象属性真正的值，但是要注意：

// 调用 GetValue，返回的将是具体的值，而不再是一个 Reference，这个很重要，这个很重要，这个很重要。


// 如何确定this的值

// 1. 计算 MemberExpression 的结果赋值给 ref
// 举个例子：
function foo() {
    console.log(this)
}
foo(); // MemberExpression 是 foo

function foo() {
    return function () {
        console.log(this)
    }
}
foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}
foo.bar(); // MemberExpression 是 foo.bar
// 所以简单理解 MemberExpression 其实就是()左边的部分。

// 2.判断 ref 是不是一个 Reference 类型。
// 关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个Reference类型。
// 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref), GetBase 获得 base value 值

// 2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref), ImplicitThisValue 方法的介绍：该函数始终返回 undefined。

// 2.3 如果 ref 不是 Reference，那么 this 为 undefined，非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象。

// 举最后一个例子：
var value = 1;

var foo = {
    value: 2,
    bar: function () {
        return this.value;
    }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());

foo.bar()
/* 
    在示例 1 中，
    MemberExpression 计算的结果是 foo.bar

    foo.bar 满足 Reference 的构成，由三个组成部分 是一个 Reference 
    var Reference = {
    base: foo,
    name: 'bar',
    strict: false
    };

    该值是 Reference 类型，base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。

    这个时候我们就可以确定 this 的值了：
    this = GetBase(ref)，

    GetBase 获得 base value 值，
    这个例子中就是foo，所以 this 的值就是 foo ，示例1的结果就是 2！ 
*/

/* 
    (foo.bar)()
    看示例2：

    console.log((foo.bar)());
    foo.bar 被 () 包住，实际上 () 并没有对 MemberExpression 进行计算，所以其实跟示例 1 的结果是一样的。
*/

/* 
    (foo.bar = foo.bar)()
    看示例3，有赋值操作符

    计算的第三步：
    因为使用了 GetValue，所以返回的值不是 Reference 类型，

    按照之前讲的判断逻辑：

    如果 ref 不是Reference，那么 this 的值为 undefined
    this 为 undefined，非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象。
*/

/* 
    (false || foo.bar)()

    计算第二步：
    因为使用了 GetValue，所以返回的不是 Reference 类型

    this 为 undefined
*/

/* 
    (foo.bar, foo.bar)()
    看示例5，逗号操作符

    计算第二步：
    因为使用了 GetValue，所以返回的不是 Reference 类型

    this 为 undefined
*/

// 例子的结果是：

var value = 1;

var foo = {
    value: 2,
    bar: function () {
        return this.value;
    }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
// 注意：以上是在非严格模式下的结果，严格模式下因为 this 返回 undefined，所以示例 3 会报错。



// 补充
// 一个最最普通的情况：

function foo() {
    console.log(this)
}

foo(); // undefined。

// MemberExpression 是 foo，解析标识符，会返回一个 Reference 类型的值：

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

// base value 正是 Environment Record，所以会调用 ImplicitThisValue(ref)

// ImplicitThisValue 方法的介绍：该函数始终返回 undefined。

// 所以最后 this 的值就是 undefined。