"use strict";

function Plant(id, name, description, leaf_type, age){
    this.id = id;
    this.name = name;               // Setter for name
    this.description = description; // Setter for description
    this.age = age;                 // Setter for age
    this.leaf_type = leaf_type;
  };

  //Setter for id
  Plant.prototype.setID = function(id){
    this.id = id;
  }
  //Setter for name
  Plant.prototype.setName = function(name){
    this.name = name;
  }
  //Setter for description
  Plant.prototype.setDescription = function(description){
    this.description = description;
  }
  //Setter for age
  Plant.prototype.setage = function(age){
    this.age = age;
  }
  //Getter for id
  Plant.prototype.getID = function(){
    return this.id;
  }
  
  //Getter for name
  Plant.prototype.getName = function(){
    return this.name;
  }
  //Getter for description
  Plant.prototype.getDescription = function(){
    return this.description;
  }
  //Getter for age
  Plant.prototype.getAge = function(){
    return this.age;
  }

    //Getter for Leaf type
    Plant.prototype.getLeaf_type = function(){
      return this.leaf_type;
    }

  function Fern( ){
    Plant.apply(this, arguments);
    this.leaf_type = "Листовидный отросток";
 } 
 function Spruce( ){
    Plant.apply(this, arguments);
    this.leaf_type = "Иголки";    
 }
   // inheritance happens here 
 Fern.prototype = Object.create(Plant.prototype);
 Spruce.prototype = Object.create(Plant.prototype);