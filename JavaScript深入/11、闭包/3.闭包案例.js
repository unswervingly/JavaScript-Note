// 实例1
function A() {
    let count = 0;
    function B() {
        count++;
        console.log(count);
    }

    return B;
}

var C = A(); //通过C这样一个外部变量可以访问到A的内部变量
C(); // 1
C(); // 2
C(); // 3


// 实例2
function count() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push(
            (function (n) {
                return function () {
                    return n * n;
                };
            })(i)
        );
    }
    return arr;
}
var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[3];
f1(); //1

f2(); //4

f3(); //9


// 实例3
function sayHello(name) {
    var text = "Hello " + name;

    var sayAlert = function () {
        console.log(text);
    };

    sayAlert();
}

sayHello("Bob"); // 输出"Hello Bob"


// 实例4
function sayHello2(name) {
    var text = "Hello " + name; // 局部变量

    var sayAlert = function () {
        console.log(text);
    };

    return sayAlert;
}

var say2 = sayHello2("Jane");
say2(); // 输出"Hello Jane"


// 实例5
function say667() {
    var num = 666; // say667()函数return后，num变量将仍然保留在内存中

    var sayAlert = function () {
        console.log(num);
    };

    num++;

    return sayAlert;
}

var sayNumba = say667();

sayNumba(); // 输出667


// 实例6
function setupSomeGlobals() {
    var num = 666;

    gAlertNumber = function () {
        console.log(num);
    };

    gIncreaseNumber = function () {
        num++;
    };

    gSetNumber = function (x) {
        num = x;
    };
}

setupSomeGlobals();
gAlertNumber(); // 输出666

gIncreaseNumber();
gAlertNumber(); // 输出667

gSetNumber(5);
gAlertNumber(); // 输出5


// 实例7
function sayAlice() {
    var sayAlert = function () {
        console.log(alice);
    };

    var alice = "Hello Alice";

    return sayAlert;
}

var sayAlice2 = sayAlice();

sayAlice2(); // 输出"Hello Alice"
