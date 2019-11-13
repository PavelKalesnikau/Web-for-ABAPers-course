"use strict";

var User = require("./user");

var Worker = require("./worker");

var Vasya = new User("Вася", 25, "vasya555@gmail.com");
var Kolya = new User("Коля", 35, "kolyaKKK@gmail.com");
Vasya.playGame();
Kolya.increaseAge();
var worker = new Worker("Иван", "Иванов", "отдел автоматизации");
console.log(worker.toString());
//# sourceMappingURL=index-compiled.js.map
