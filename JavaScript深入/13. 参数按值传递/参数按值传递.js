// ECMAScript中所有函数的参数都是 按值传递的。

// 什么是按值传递呢？
// 把 函数外部的 值 复制给 函数内部的 参数，就和 把值 从一个变量 复制到另一个变量一样。

// 例子：

var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1
// 当传递 value 到函数 foo 中，相当于拷贝了一份 value，假设拷贝的这份叫 _value，函数中修改的都是 _value 的值，而不会影响原来的 value 值。


// 但是当值是一个复杂的数据结构的时候，拷贝就会产生性能上的问题。
// 所以还有另一种传递方式叫做 按引用传递。

// 按引用传递，就是传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。
// 举个例子：

var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2

// 有个问题
// 红宝书都说了 ECMAScript 中所有函数的参数都是按值传递的，这怎么能按"引用传递"成功呢？


// 不急，让我们再看个例子：
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1

// 第三种传递方式，叫按共享传递。
// 而共享传递是指，在传递对象的时候，传递对象的引用的副本。

// 注意： 按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！

// 所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。所以第二个和第三个例子其实都是按共享传递。
/* 
    // 类比的理解 第三种传递方式：

    A、变量名与变量值的关系好比快捷方式与真实文件的关系
    B、值类型类比为文件 引用类型类比为文件夹

    文中的第三种传递方式
    //1、2
    var obj = {value: 1};  
    //4
    function foo(o) {
        //5
        o = 2;
        console.log(o); 
    }
    //3
    foo(obj); 
    console.log(obj.value) 

    1.创建文件夹“{value: 1}”
    2.创建一个快捷方式obj
    3.实参：步骤2创建的快捷方式
    4.形参：创建o快捷方式，但o不指向obj指向的文件夹，却指向了快捷方式obj本身
    5.修改o快捷方式的指向，改为指向文件“2” 
*/


/* 
    总结：
    参数如果是基本类型是按值传递，如果是引用类型按共享传递。

    但是因为拷贝副本也是一种值的拷贝，所以在直接认为是按值传递了。 
*/