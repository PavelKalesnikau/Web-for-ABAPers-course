"use strict";
class Plant{
  constructor(id, name, description, leaf_type){
    this.id = id;
    this.name = name;               
    this.description = description;     
    this.leaf_type = leaf_type;
  }
  set ID(id){
    this.id = id;
  }
  set Name(name){
    this.name = name;
  }
  set Description(description){
    this.description = description;
  }

  set Leaf_type(leaf_type){
    this.leaf_type = leaf_type;
  }

  get ID(){
    return this.id;
  }

  get Name(){
    return this.name;
  }

  get Description(){
    return this.description;
  }

  get Leaf_type(){
    return this.leaf_type;
  }
}

class Fern extends Plant{
  constructor(){
    super(...arguments);    
    this.leaf_type = "Листовидный отросток";
  }
} 
 class Spruce extends Plant{
    constructor(){      
      super(...arguments);
      this.leaf_type = "Иголки";
    }    
 }   