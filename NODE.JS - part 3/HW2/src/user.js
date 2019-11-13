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