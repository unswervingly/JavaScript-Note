/*
    浅拷贝
    
    现在有一个对象A，需求是将A拷贝一份到B对象当中？
    当B拷贝了A的数据，且当B的改变会导致A的改变时，此时叫B浅拷贝了A
    因为这种赋值方式只是将A的堆内存地址赋值给了B，A和B储存的是同一个地址，指向的是同一个内容，因此B的改变当然会引起A的改变。
*/

// 浅拷贝是只针对Object和Array这样的引用数据类型的。
// 浅拷贝只适用没有嵌套的数组或对象，对于嵌套的数组或对象，浅拷贝将会失效。

// 1. 扩展运算符 ... 适合没有嵌套的数组和对象进行浅拷贝
const array = ['A', 'B', 'c']
const copyWithSpread = [...array] // 改变array 不会改变 copyWithSpread


// 2. Array.slice(start,length)方法，适合数组的浅拷贝
const copyWithSlice = array.slice() // 改变 array 不会改变 copyWithSlice


// 3. Array.from() ,适用于数组的浅拷贝
const copyWithFrom = Array.from(array)


// 4. Object.assign() 可用于任何对象or数组的浅拷贝
const A = {
    name: "czm",
    data: { num: 10 },
    say: function () {
        console.log("hello world")
    }
}
const B = {}
Object.assign(B, A);    //将A拷贝到B
B.name = "lucy";
console.log(A.name);    //czm , 发现A中name并没有改变
B.data.num = 5;
console.log(A.data.num); //5 , 发现A中data的num属性改变了，说明data对象没有被深拷贝

/* 
    Object.assign(target(目标), source(源))
    这是ES6中新增的对象方法，它可以实现第一层的“深拷贝”，但无法实现多层的深拷贝。

    以当前A对象进行说明
    第一层“深拷贝”：就是对于A对象下所有的属性和方法都进行了深拷贝，但是当A对象下的属性如data是对象时，它拷贝的是地址，也就是浅拷贝，这种拷贝方式还是属于浅拷贝。
*/