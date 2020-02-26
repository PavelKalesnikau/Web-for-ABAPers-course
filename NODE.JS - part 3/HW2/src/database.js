const MongoClient = require("mongodb").MongoClient;
const Worker = require("./worker");

// создаем объект MongoClient и передаем ему строку подключения
const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); 

let worker = {
    id: 1,
    name: "John",
    surname: "Smith",
    department: "K16"
};

let workers = [{
    id: 1,
    name: "Иван",
    surname: "Иванов",
    department: "отдел кадров"
}, {
    id: 2,
    name: "Константин",
    surname: "Константинов",
    department: "отдел юридических лиц"
}, {
    id: 3,
    name: "Сергей",
    surname: "Сергеев",
    department: "отдел физических лиц"
}
];

function initDB() {
    mongoClient.connect(function (err, client) {

        if (err) {
            return console.log(err);
        }
        // взаимодействие с базой данных

        // подключаемся к БД myDataBase
        const db = client.db("myDataBase");

        // подключаемся к коллекции
        const collection = db.collection("workers");

        // добавим запись в коллекцию workers    
        // collection.insertOne(worker, function (err, result) {

        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("Новая запись добавлена");
        //     console.log(result.ops);
        // });

        // добавим записи в коллекцию workers    
        collection.insertMany(workers, function (err, result) {

            if (err) {
                return console.log(err);
            }
            console.log("Новые записи добавлены");
            console.log(result.ops);
        });

        // прекращение взаимодействия в базой данных
        client.close();
    })
};

class db {

    // static dbName = 'myDataBase';  !!!!!!!!! DOESN'T WORK
    // static workersCollection = 'workers';     

    constructor() {
        this._mongoClient = new MongoClient(url, { useUnifiedTopology: true });
        this.isReadyResult = false;
        this.result;
    }
    static getDbName() {
        return 'myDataBase';
    }
    initDB() {

        this._mongoClient.connect(function (err, client) {

            if (err) {
                return console.log(err);
            }

            // подключаемся к БД myDataBase
            const db = client.db("myDataBase");

            // подключаемся к коллекции
            const collection = db.collection("workers");

            // добавим записи в коллекцию workers    
            collection.insertMany(workers, function (err, result) {

                if (err) {
                    return console.log(err);
                }
                console.log("Новые записи добавлены");
                console.log(result.ops);
            });

            // прекращение взаимодействия в базой данных
            client.close();
        });
    }
    getEntries() {
        this.isReadyResult = false;
        this._mongoClient.connect(function (err, client) {

            //  const db = client.db(dbName);
            //  const collection = db.collection(workersCollection);
            const db = client.db("myDataBase");
            const collection = db.collection("workers");

            if (err) return console.log(err);

            collection.find().toArray(function (err, results) {

                // console.log(results);
                client.close();

                this.isReadyResult = true;
                this.result = results; 
            });
        });
        // while (!this.isReadyResult){
        //     console.log("waiting for result...");
        // }
        // console.log("result is ready");
        // return result;
    }
    insertEntry(workerJSON) {

        if (err) {
            return console.log(err);
        }

        // подключаемся к БД myDataBase
        const db = client.db("myDataBase");

        // подключаемся к коллекции
        const collection = db.collection("workers");

        // добавим запись в коллекцию workers    
        collection.insertOne(workerJSON, function (err, result) {

            if (err) {
                return console.log(err);
            }
            console.log("Новая запись добавлена");
            console.log(result.ops);
        });

        // прекращение взаимодействия в базой данных
        client.close();
    }

};

// console.log(db.getDbName());

DB = new db();
DB.getEntries();

module.exports = db; 