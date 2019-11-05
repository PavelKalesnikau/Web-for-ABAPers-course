class Worker{
    constructor(name, surname, department){
        this._name = name;
        this._surname = surname; 
        this._department = department; // declare it starting with _, because setter doens't work without this symbol 
    }
    toString(){
        return `Меня зовут ${this._name} ${this._surname}`;
    }
    
    set department(newDepartment){       
        this._department = newDepartment;
    }
    
    get department(){
        return this._department;
    }
}

module.exports = Worker; 