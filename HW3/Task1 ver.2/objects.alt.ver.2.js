"use strict";

function Plant(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.description = obj.description;
  this.age = obj.age;
  this.collection = obj.collection;
  this.habitat = obj.habitat;
  this.leaf_type = obj.leaf_type;
};

//Setter for id
Plant.prototype.setID = function (id) {
  this.id = id;
}

//Setter for name
Plant.prototype.setName = function (name) {
  this.name = name;
}

//Setter for description
Plant.prototype.setDescription = function (description) {
  this.description = description;
}

//Setter for age
Plant.prototype.setAge = function (age) {
  this.age = age;
}

//Setter for collection
Plant.prototype.setCollection = function (collection) {
  this.collection = collection;
}

//Setter for habitat
Plant.prototype.setHabitat = function (habitat) {
  this.habitat = habitat;
}

//Setter for leaf type
Plant.prototype.setLeaf_type = function (leaf_type) {
  Plant.leaf_type = leaf_type;
}


//Getter for id
Plant.prototype.getID = function () {
  return this.id;
}

//Getter for name
Plant.prototype.getName = function () {
  return this.name;
}

//Getter for description
Plant.prototype.getDescription = function () {
  return this.description;
}

//Getter for age
Plant.prototype.getAge = function () {
  return this.age;
}

//Getter for collection
Plant.prototype.getCollection = function () {
  return this.collection;
}

//Getter for habitat
Plant.prototype.getHabitat = function () {
  return this.habitat;
}

//Getter for Leaf type
Plant.prototype.getLeaf_type = function () {
  return this.leaf_type;
}
function Fern() {
  Plant.apply(this, arguments);
  Fern.prototype.leaf_type = "Листовидный отросток";
}

 function Fern( ){

    var oPlant={
      id:arguments[0],
      name:arguments[1],
      description:arguments[2],
      leaf_type:"Листовидный отросток",      
      age:arguments[3],
      collection: arguments[4],
      habitat: arguments[5],
    }

       Plant.call(this, oPlant);    
  } 
 function Spruce( ){
  var oPlant={
    id:arguments[0],
    name:arguments[1],
    description:arguments[2],
    leaf_type:"Иголки",
    age:arguments[3],
    collection: arguments[4],
    habitat: arguments[5],
  }

  Plant.call(this, oPlant);        
  }

 // inheritance happens here 
  Fern.prototype = Object.create(Plant.prototype);    // prototype inheritance
  Fern.prototype.constructor = Fern; 

  Spruce.prototype = Object.create(Plant.prototype);  // prototype inheritance
  Spruce.prototype.constructor = Spruce; 