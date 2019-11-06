hconst User = require("./user");
const Worker = require("./worker");

var Vasya = new User("Вася", 25, "vasya555@gmail.com");
var Kolya = new User("Коля", 35, "kolyaKKK@gmail.com");

Vasya.playGame();
Kolya.increaseAge();

var worker = new Worker("Иван", "Иванов", "отдел автоматизации");
console.log(worker.toString());
// user class in ES5
function User (name, age, email){
    this.name = name;
    this.age = age;
    this.email = email;
}

User.prototype.increaseAge = function(){
    this.age++;
    console.log( this.name + " исполнилось " + this.age + " лет.");
}
User.prototype.setEmail = function(email){
    this.email = email; 
}
User.prototype.getEmail = function(){
    return this.email;
}
User.prototype.getName = function(){
    return this.name;
}
User.prototype.playGame = function(){
    console.log( this.name + " играет в игру.");
}

module.exports = User; 
class Worker{
    constructor(name, surname, department){
        this._name = name;
        this._surname = surname;         
        this._department = department; // declare it starting with _, because setter doens't work without this symbol 
    }
    toString(){
        return `Меня зовут ${this._name} ${this._surname}. Я - рабочий.`;
    }
    
    set department(newDepartment){       
        this._department = newDepartment;
    }
    
    get department(){
        return this._department;
    }
}

module.exports = Worker; 