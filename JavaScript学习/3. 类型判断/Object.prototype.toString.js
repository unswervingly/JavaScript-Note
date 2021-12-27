    // Object.prototype.toString.call原理是：

    // “根”原型(Object.prototype)下，有个toString的方法，记录着所有 数据类型（构造函数）
    // .call作用是改this指向。让传入的对象，执行 “根”原型的toString方法