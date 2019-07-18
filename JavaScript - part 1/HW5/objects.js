"use strict";
class Plant{
  leaf_type; // Global parameter
  constructor(id, name, description, age, collection, habitat){
    this.id = id;
    this.name = name;               
    this.description = description;         
    this.age = age;             
    this.collection = collection;   
    this.habitat = habitat;
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

  set Age(age){
    this.age = age;
  }

  set Collection(collection){
    this.collection = collection;
  }

  set Habitat(habitat){
    this.habitat = habitat;
  }

  set Leaf_type(leaf_type){
    leaf_type = leaf_type;
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

  get Age(){
    return this.age;
  }

  get Collection(){
    return this.collection;
  }

  get Habitat(){
    return this.habitat;
  }

  get Leaf_type(){
    return leaf_type;
  }
}

class Fern extends Plant{
  leaf_type = "Листовидный отросток";
  constructor(){
    super(...arguments);       
  }
} 
 class Spruce extends Plant{
  leaf_type = "Иголки";  
    constructor(){      
      super(...arguments);      
    }    
 }   