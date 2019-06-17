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
    let name = $("#plant").serializeArray()[0].value; // get value for form field's name  
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

    // // call API using `fetch`
    // fetch(SERVER_URL)
    //     .then(res => res.json())
    //     .then(res => {
    //         // loop over all plants                       
    //         res.map(plant => {
    //             // create a `tr` element
    //             const tr = document.createElement('tr');
    //             // create ID `td`
    //             const name = document.createElement('td');
    //             name.textContent = plant.name;
    //             // create Name `td`
    //             const description = document.createElement('td');
    //             description.textContent = `${plant.description}`;
    //             // add tds to tr
    //             tr.appendChild(name);
    //             tr.appendChild(description);
    //             // app tr to table
    //             table.querySelector('tbody').appendChild(tr);
    //         });
    //     })
    //     .catch(err => console.log('Error:', err));

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
        // add tds to tr
        tr.appendChild(name);
        tr.appendChild(description);
        tr.appendChild(leaf_type);
        // app tr to table
        table.querySelector('tbody').appendChild(tr);
    });
}

function requestData() {
    plants = [];
    const SERVER_URL = 'http://195.50.2.67:2403/pk-plants';
    // ************** using FETCH *************
    // fetch(SERVER_URL)
    //     .then(res => res.json())
    //     .then(res => {
    //         // loop over all plants                       
    //         res.map(plant => {
    //             plants.push(new Plant(plant.id, plant.name, plant.description));
    //         });
    //         window.dispatchEvent(tblUpdate);
    //     })
    //     .catch(err => console.log('Error:', err));


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
                    plants.push(new Spruce(plant.id, plant.name, plant.description));
                } else if (plant.planttype == 'fern') {
                    plants.push(new Fern(plant.id, plant.name, plant.description));
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