"use strict";

function Plant(obj){
    this.id = obj.id;
    this.name = obj.name;              
    this.description = obj.description;
    this.age = obj.age;             
    this.collection = obj.collection;   
    this.leaf_type = obj.leaf_type; 
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
  Plant.prototype.setAge = function(age){
    this.age = age;
  }

  //Setter for collection
  Plant.prototype.setClass = function(collection){
    this.collection = collection;
  }

  //Setter for leaf type
  Plant.prototype.setLeaf_type = function(leaf_type){
     Plant.leaf_type = leaf_type;
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
  
  //Getter for collection
  Plant.prototype.getClass = function(){
    return this.collection;
  }

    //Getter for Leaf type
  Plant.prototype.getLeaf_type = function(){
    return this.leaf_type;
  }

  function Fern( ){

    var oPlant={
      id:arguments[0],
      name:arguments[1],
      description:arguments[2],
      leaf_type:"Листовидный отросток",      
      age:arguments[3],
      collection: arguments[4],
    }
  
    // Plant.apply(this, arguments);    
       Plant.call(this, oPlant);  // funcitonal iheritance    
  } 

 function Spruce( ){
  var oPlant={
    id:arguments[0],
    name:arguments[1],
    description:arguments[2],
    leaf_type:"Иголки",
    age:arguments[3],
    collection: arguments[4],
  }
  
  Plant.call(this, oPlant);     // funcitonal iheritance    
  }

 // inheritance happens here 
//  Fern.prototype = Object.create(Plant.prototype);    // prototype inheritance
//  Spruce.prototype = Object.create(Plant.prototype);  // prototype inheritance