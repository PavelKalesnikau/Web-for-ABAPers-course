// source of learning - https://metanit.com/web/nodejs/6.5.php

const express = require("express");
const Worker = require("./worker");

const bodyParser = require("body-parser"); // парсер для html-форм
const path = require('path');

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const app = express();
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//const jsonParser = express.json();
const port = 3000;

let dbClient;

//app.use(express.static(__dirname + "/public"));  
app.use(express.static("../public"));


// ----------- Mongo Client DB -----------------
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(function (err, client) {

    if (err) {
        return console.log(err);
    }

    dbClient = client;
    // подключаемся к БД myDataBase
    const db = client.db("myDataBase");

    // подключаемся к коллекции и сохраняем ссылку на неё в локальную переменную приложения
    app.locals.collection = db.collection("workers");
    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err);
        }
        console.log(`server is listening on ${port}`)
    });
});

// Use mongodb instead 
//  var workers = [ new Worker(1, "Иван", "Иванов", "отдел кадров"),
//                  new Worker(2, "Константин", "Константинов", "отдел юридических лиц"),
//                  new Worker(3, "Сергей", "Сергеев", "отдел физических лиц") ];

app.get("/workers", function (request, response) {
    const collection = request.app.locals.collection;

    collection.find().toArray(function (err, results) {
        // 'results' contains collection 'workers'
        let responseText = "<ul>";
        results.forEach(element => {
            worker = new Worker(element.id, element.name, element.surname, element.department);
            responseText += "<li>" + worker + "</li>";
        });
        responseText += "</ul>";
        response.send(responseText);
    });

});

app.get("/worker", function (request, response) {
    // url example ../worker?id=1
    let par_id = Number(request.query.id);
    const collection = request.app.locals.collection;
    collection.findOne({ id: par_id }, function (err, element) {
        if (element == null) {
            responseText = "Worker is not found!"
        } else {
            worker = new Worker(element.id, element.name, element.surname, element.department);
            responseText = "<p>" + worker + "</p>";
        }
        response.send(responseText);
    });
});
app.get("/new_worker", urlencodedParser, function (request, response) {
    // app.get("/new_worker", jsonParser, function (request, response) {
    // app.get("/new_worker", function (request, response) {
    response.sendFile(path.join(__dirname, "../public/newWorker.html"));
});
app.post("/new_worker", urlencodedParser, function (request, response) {
    // app.post("/new_worker", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // console.log(request.body);    

    const collection = request.app.locals.collection;

    let name = request.body.name;
    let surname = request.body.surname;
    let department = request.body.department;
    let next_id;
    let new_worker;
    // An aricle about Promises - https://learn.javascript.ru/promise
    new Promise((resolve, reject) => {
        collection.countDocuments({}, function (err, count) {
            if (err) {
                // return console.log(err.message);
                reject(err);
            }
            resolve(count);
        });
    }).then(count => {        
        return new_worker = { id: count, name: name, surname: surname, department: department };
    }).then(new_worker => {
        collection.insertOne(new_worker, function (err, result) {
            responseText = `<p> В ${new_worker.department} принят ${new_worker.name} ${new_worker.surname} под номером ${new_worker.id}`;
            response.send(responseText);
        });
    });
});

var input = 0;
app.get("/del_worker", function (request, response) {
    console.log(input++); // почему-то заходит по два раза при вводе url в браузере один раз??? 

    "url example ../del_worker?id=1"
    let id = Number(request.query.id);    

    const collection = request.app.locals.collection;
    collection.deleteOne({id: id}, function(err, results){
        if(results.deletedCouny = 0){
            responseText = `<p> Никто не уволен. Проверь Id!</p>`;
        }else{
            // responseText = `<p> Сотрудник ${worker.name} ${worker.surname} уволен из ${worker.department}</p>`;
            responseText = `<p> Сотрудник под номером ${id} уволен </p>`;
        }
        response.send(responseText);
    })
   
});

app.get("/", function (request, response) {

    response.send("<h1>Главная страница</h1>");
});
// app.get("/about", function(request, response){

//     response.send("<h1>О сайте</h1>");
// });
// app.get("/contact", function(request, response){

//     response.send("<h1>Контакты</h1>");
// });
app.use("/index", function (request, response) {
    response.redirect("https://metanit.com")
});

// прослушиваем прерывание работы программы (ctrl+c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});