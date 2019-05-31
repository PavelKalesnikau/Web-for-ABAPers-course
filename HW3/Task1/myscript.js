function Plant(name, description, height, habitat){
    this.name = name;
    this.description = description;
    this.height = height;    
  };

 function Fern( ){

 } 
 function Spruce( ){

 }
 var plant = new Plant( );
 Fern.prototype = plant;    // inherit by protytpe 
 Spruce.prototype = plant;  // inherit by protytpe 
//  extend(Spruce, Plant); // inherit by protytpe with function 'extend'


 var fern = new Fern( 'Орляк обыкновенный', 'многолетний травянистый папоротник', 100, 'Светлые леса');
 console.log(fern.name);

 var fern2 = new Fern("Сальвиния плавающая", "мелкий плавающий на поверхности водоёмов папоротник", 0.15, 'в водоёмах со стоячей или медленно текущей водой');
 console.log(fern2);

 var spruce = new Spruce( 'Ель обыкновенная', 'хвойное дерево, типовой вид рода Ель', 30, 'Растение широко распространено на северо-востоке Европы' );
 console.log(spruce);


//  function extend(Child, Parent) {
// 	var F = function() { }
// 	F.prototype = Parent.prototype
// 	Child.prototype = new F()
// 	Child.prototype.constructor = Child
// 	Child.superclass = Parent.prototype
// }