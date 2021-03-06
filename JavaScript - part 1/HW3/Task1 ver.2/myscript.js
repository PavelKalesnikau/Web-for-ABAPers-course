window.onload = () => {
    requestData();
};

var tblUpdate = new Event('toRefresh');
window.addEventListener('toRefresh', function (e) {
    tableRefresh();
}, false);


function sendData() {
    let XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.addEventListener('load', function (event) {
        // alert('Yeah! Data sent and response loaded.');
        requestData();
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function (event) {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', 'http://195.50.2.67:2403/pk-plants');

    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // use JQuery serialize function to send data from form
    XHR.send($("#plant").serialize());

}
function deleteData() {

    // use JQuery
    let name = $("#plant").serializeArray()[1].value; // get value of name from form 
    let plant;
    for (var i = 0; i < plants.length; i++) {
        plant = plants[i];
        if (plant.name == name) {
            break; // we found right element for delition
        }
    }

    let XHR = new XMLHttpRequest();
    // Define what happens on successful data submission
    XHR.addEventListener('load', function (event) {
        //    alert('Yeah! Data sent and response loaded.');
        requestData();
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function (event) {
        alert('Oops! Something went wrong.');
    });

    XHR.open('DELETE', 'http://195.50.2.67:2403/pk-plants/' + plant.id);
    XHR.send();

}

function deleteAllData() {

    if (!confirm("Are you sure want to delete all entries from DB?")) {
        return;
    }

    plants.forEach(function (plant, ind, arr) {
        let XHR = new XMLHttpRequest();
        // Define what happens on successful data submission
        XHR.addEventListener('load', function (event) {
            //    alert('Yeah! Data sent and response loaded.');
            requestData();
        });

        // Define what happens in case of error
        XHR.addEventListener('error', function (event) {
            alert('Oops! Something went wrong.');
        });

        XHR.open('DELETE', 'http://195.50.2.67:2403/pk-plants/' + plant.id);
        XHR.send();
    });
}

function tableRefresh() {
    // used link https://www.quora.com/How-do-I-get-data-from-an-external-URL-by-using-JSON-and-display-it-in-an-HTML-table

    const SERVER_URL = 'http://195.50.2.67:2403/pk-plants';
    // get table element
    const table = document.querySelector('#plants');

    table.querySelector('tbody').innerHTML = "";    // clear table content    
    plants.forEach(function (plant, ind, arr) {        
        // create a `tr` element
        const tr = document.createElement('tr');
        // create ID `td`
        const name = document.createElement('td');
        name.textContent = plant.name;
        // create Name `td`
        const description = document.createElement('td');
        description.textContent = plant.description;
        // create Leaf type `td`
        const leaf_type = document.createElement('td');
        leaf_type.textContent = plant.leaf_type;        
        // create Age type `td`
        const age = document.createElement('td');
        age.textContent = plant.age;        
        // create Collection type `td`
        const collection = document.createElement('td');
        collection.textContent = plant.collection;        
        // create Habitat type `td`
        const habitat = document.createElement('td');
        habitat.textContent = plant.habitat;        
        // add tds to tr
        tr.appendChild(name);
        tr.appendChild(description);
        tr.appendChild(leaf_type);
        tr.appendChild(age);
        tr.appendChild(collection);
        tr.appendChild(habitat);
        // app tr to table
        table.querySelector('tbody').appendChild(tr);
    });
}

function requestData() {
    plants = [];
    const SERVER_URL = 'http://195.50.2.67:2403/pk-plants';
   
    // ********** Using XHR *****************        
    let XHR = new XMLHttpRequest();

    // Setup our listener to process compeleted requests
    XHR.onreadystatechange = function () {

        // Only run if the request is complete
        if (XHR.readyState !== 4)
            return;

        // Process our return data
        if (XHR.status >= 200 && XHR.status < 300) {
            // What do when the request is successful
            var json_parsed_string = JSON.parse(XHR.responseText);

            json_parsed_string.map(plant => {
                if (plant.planttype == 'spruce') {
                    plants.push(new Spruce(plant.id, plant.name, plant.description, plant.age, plant.collection, plant.habitat));
                } else if (plant.planttype == 'fern') {
                    plants.push(new Fern(plant.id, plant.name, plant.description, plant.age, plant.collection, plant.habitat));
                } else {
                    console.log('Unknown type of plant ' + plant.planttype);
                }
            });
        }
        window.dispatchEvent(tblUpdate);
    }
    XHR.open('GET', SERVER_URL);
    XHR.send();

}
function OnRBClick(){
    var radioValue = $("input[name='planttype']:checked").val();
    if(radioValue == 'fern'){
        document.getElementById('name').value='Орляк обыкновенный';
        document.getElementById('description').value='Многолетний травянистый папоротник.';
    }else if(radioValue == 'spruce'){
        document.getElementById('name').value='Ель обыкновенная';
        document.getElementById('description').value='Растение используется в озеленении, а также в декоративном садоводстве.';        
    }
}