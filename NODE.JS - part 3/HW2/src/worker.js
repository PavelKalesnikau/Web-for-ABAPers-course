class Worker{
    constructor(id, name, surname, department){
        this._id = id;
        this._name = name;
        this._surname = surname;         
        this._department = department; // declare it starting with _, because setter doens't work without this symbol 
    }
    toString(){
        return `Меня зовут ${this._name} ${this._surname}. Я - работник в ${this._department}`;
    }
    
    set department(newDepartment){       
        this._department = newDepartment;
    }
    
    get name(){
        return this._name;
    }
    get surname(){
        return this._surname;
    }
    get department(){
        return this._department;
    }
}

module.exports = Worker; 