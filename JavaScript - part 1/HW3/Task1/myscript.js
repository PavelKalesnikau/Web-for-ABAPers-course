// The article to the topic of Class inheritance (prototyp)
// https://learn.javascript.ru/class-inheritance

"use strict";

function Plant(name, description, height, habitat){
    this.name = name;               // Setter for name
    this.description = description; // Setter for description
    this.height = height;           // Setter for height
  };

  //Getter for name
  Plant.prototype.getName = function(){
    return this.name;
  }
  //Getter for description
  Plant.prototype.getDescription = function(){
    return this.description;
  }
  //Getter for height
  Plant.prototype.getHeight = function(){
    return this.height;
  }

 //CRUD mocks
 Plant.prototype.create = function(){
  console.log(this.name + " посажено.");
}

Plant.prototype.read = function(){
  console.log("Я - растение под названием \"" +  this.name + "\".");
}

Plant.prototype.update = function(){
  console.log(this.name + " подросло.");
}

Plant.prototype.delete = function(){
  console.log(this.name + " срубили.");
}
 
 function Fern( ){
    Plant.apply(this, arguments);
 } 
 function Spruce( ){
    Plant.apply(this, arguments);
 }

 // inheritance happens here 
 Fern.prototype = Object.create(Plant.prototype);
 Spruce.prototype = Object.create(Plant.prototype);

 var fern = new Fern( 'Орляк обыкновенный', 'многолетний травянистый папоротник', 100, 'Светлые леса');
//  console.log(fern.name);

 var fern2 = new Fern("Сальвиния плавающая", "мелкий плавающий на поверхности водоёмов папоротник", 0.15, 'в водоёмах со стоячей или медленно текущей водой');
//  console.log(fern2);

 var spruce = new Spruce( 'Ель обыкновенная', 'хвойное дерево, типовой вид рода Ель', 30, 'Растение широко распространено на северо-востоке Европы' );
//  console.log(spruce);

 fern.create();
 fern.read();
 fern.update();
 fern.delete();

 fern2.create();
 fern2.read();
 fern2.update();
 fern2.delete();

 spruce.create();
spruce.read();
spruce.update();
spruce.delete();