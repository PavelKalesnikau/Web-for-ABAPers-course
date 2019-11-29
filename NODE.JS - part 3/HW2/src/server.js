const express = require("express");
const Worker = require("./worker");
const bodyParser = require("body-parser"); // парсер для html-форм
const path = require('path');

const app = express();
const port = 3000; 
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

//app.use(express.static(__dirname + "/public"));  
app.use(express.static("../public"));  

var workers = [ new Worker(1, "Иван", "Иванов", "отдел кадров"),
                new Worker(2, "Константин", "Константинов", "отдел юридических лиц"),
                new Worker(3, "Сергей", "Сергеев", "отдел физических лиц") ];

app.get("/workers", function(request, response){
    let responseText = "<ul>"; 

    workers.forEach(element => {
        responseText += "<li>" + element + "</li>";
    });
    responseText += "</ul>";
    
    response.send(responseText);
});

app.get("/worker", function(request, response){
    "url example ../worker?id=1"
    let id = request.query.id; 
    responseText = "<p>" + workers[id-1] + "</p>";
    response.send(responseText);
});
app.get("/new_worker", urlencodedParser, function (request, response) {
    response.sendFile(path.join(__dirname, "../public/newWorker.html"));
});
app.post("/new_worker", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    // console.log(request.body);    
    
    let name = request.body.name; 
    let surname = request.body.surname; 
    let department = request.body.department; 
    let next_id = workers.length;
    workers.push(new Worker(next_id, name, surname, department));
    
    responseText = `<p> В ${ department } принят ${ name } ${ surname } под номером ${ next_id+1}`;    
    response.send(responseText);
});

var input = 0;
app.get("/del_worker", function(request, response){
    console.log(input++); // почему-то заходит по два раза при вводе url в браузере один раз??? 

    "url example ../del_worker?id=1"
    let id = request.query.id-1;         
    let arrId = -1; 
    
    for(var i=0; i < workers.length; i++){
        if (id == workers[i]._id) { arrId = i; break;}
    }
    if (arrId != -1) {
        let name = workers[arrId].name; 
        let surname = workers[arrId].surname; 
        let department = workers[arrId].department; 
        workers.splice(arrId,1); // remove one element from array
        responseText = `<p> Сотрудник ${name} ${surname} уволен из ${department}</p>`;
    }else{
        responseText = `<p> Никто не уволен. Проверь Id!</p>`;
    }   

    response.send(responseText);
});

app.get("/", function(request, response){
     
    response.send("<h1>Главная страница</h1>");
});
// app.get("/about", function(request, response){
     
//     response.send("<h1>О сайте</h1>");
// });
// app.get("/contact", function(request, response){
     
//     response.send("<h1>Контакты</h1>");
// });
app.use("/index",function (request, response) {
    response.redirect("https://metanit.com")
  });

app.listen(port, (err)=>{
    if(err){
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`)
});