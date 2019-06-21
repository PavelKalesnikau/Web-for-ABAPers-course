const SERVER_URL = 'http://195.50.2.67:2403/pk-plants/';

// event for table update
var tblUpdate = new Event('toRefresh');
window.addEventListener('toRefresh', function (e) {
    tableRefresh();
}, false);


window.onload = () => {
    // build HTML markup dinamically
    buildHTMLMarkup();
    // fill table with data
    requestData();
};

function sendData() {
    // *******************  using FETCH  **************************    
    var myInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: $("#plant").serialize(),
    };

    fetch(SERVER_URL, myInit)
        .then(res => res.json())
        .then(() => requestData())
        .catch(err => console.log('Error:', err));
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

    // *******************  using FETCH  **************************          
    fetch(SERVER_URL + plant.id, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => requestData())
        .catch(err => console.log('Error:', err));
}

function deleteAllData() {

    if (!confirm("Are you sure want to delete all entries from DB?")) {
        return;
    }

    plants.forEach(function (plant, ind, arr) {
        // *******************  using FETCH  **************************          
        fetch(SERVER_URL + plant.id, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => requestData())
            .catch(err => console.log('Error:', err));
    });
}

function tableRefresh() {
    // used link https://www.quora.com/How-do-I-get-data-from-an-external-URL-by-using-JSON-and-display-it-in-an-HTML-table

    const SERVER_URL = 'http://195.50.2.67:2403/pk-plants';
    // get table element
    const table = document.querySelector('#plants');

    table.querySelector('tbody').innerHTML = "";    // clear table content    

    plants.forEach(function (plant, ind, arr) {
        // // create a `tr` element
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
    //    ************** using FETCH *************
    fetch(SERVER_URL)
        .then(res => res.json())
        .then(res => {
            // loop over all plants                       
            res.map(plant => {
                if (plant.planttype == 'spruce') {
                    plants.push(new Spruce(plant.id, plant.name, plant.description, plant.age, plant.collection, plant.habitat));
                } else if (plant.planttype == 'fern') {
                    plants.push(new Fern(plant.id, plant.name, plant.description, plant.age, plant.collection, plant.habitat));
                } else {
                    console.log('Unknown type of plant ' + plant.planttype);
                }
            });
            window.dispatchEvent(tblUpdate); // raise an event to refresh table (the event tblUpdate is defined above)
        })
        .catch(err => console.log('Error:', err));
}
function OnRBClick() {
    var radioValue = $("input[name='planttype']:checked").val();
    if (radioValue == 'fern') {
        document.getElementById('name').value = 'Орляк обыкновенный';
        document.getElementById('description').value = 'Многолетний травянистый папоротник.';
    } else if (radioValue == 'spruce') {
        document.getElementById('name').value = 'Ель обыкновенная';
        document.getElementById('description').value = 'Растение используется в озеленении, а также в декоративном садоводстве.';
    }
    document.getElementById('age').value = '';
    document.getElementById('collection').value = '';
    document.getElementById('habitat').value = '';
}
function buildHTMLMarkup() {
    const body = document.querySelector('body');
    body.innerHTML = "";    // clear body content   

    // create Form element
    const form = document.createElement('form');
    form.setAttribute('id', 'plant');

    // create RadioButton elements within div    
    const lblRB1 = document.createElement('label');
    lblRB1.setAttribute('for', 'plantType1');
    lblRB1.textContent = "Хвойные";
    const inputRB1 = document.createElement('input');
    inputRB1.setAttribute('type', 'radio');
    inputRB1.setAttribute('id', 'plantType1');
    inputRB1.setAttribute('name', 'planttype');
    inputRB1.setAttribute('value', 'spruce');
    inputRB1.setAttribute('onclick', 'OnRBClick()');

    const lblRB2 = document.createElement('label');
    lblRB2.setAttribute('for', 'plantType2');
    lblRB2.textContent = "Папоротники";
    const inputRB2 = document.createElement('input');
    inputRB2.setAttribute('type', 'radio');
    inputRB2.setAttribute('id', 'plantType2');
    inputRB2.setAttribute('name', 'planttype');
    inputRB2.setAttribute('value', 'fern');
    inputRB2.setAttribute('onclick', 'OnRBClick()');
    // add radiobuttons elements to div
    const divRBs = document.createElement('div');
    divRBs.appendChild(lblRB1);
    divRBs.appendChild(inputRB1);
    divRBs.appendChild(lblRB2);
    divRBs.appendChild(inputRB2);

    // create Name elements    
    const lblName = document.createElement('label');
    lblName.setAttribute('for', 'name');
    lblName.textContent = "Название растения";
    const inputName = document.createElement('input');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('name', 'name');
    // add Name elements to div
    const divName = document.createElement('div');
    divName.appendChild(lblName);
    divName.appendChild(inputName);

    // create Description elements    
    const lblDescription = document.createElement('label');
    lblDescription.setAttribute('for', 'description');
    lblDescription.textContent = "Описание";
    const inputDescription = document.createElement('textarea');
    inputDescription.setAttribute('rows', '3');
    inputDescription.setAttribute('cols', 'description');
    inputDescription.setAttribute('id', 'description');
    inputDescription.setAttribute('name', 'description');
    // add Description elements to div
    const divDescription = document.createElement('div');
    divDescription.appendChild(lblDescription);
    divDescription.appendChild(inputDescription);

    // create Age elements    
    const lblAge = document.createElement('label');
    lblAge.setAttribute('for', 'age');
    lblAge.textContent = "Возраст";
    const inputAge = document.createElement('input');
    inputAge.setAttribute('id', 'age');
    inputAge.setAttribute('name', 'age');
    // add Age elements to div
    const divAge = document.createElement('div');
    divAge.appendChild(lblAge);
    divAge.appendChild(inputAge);

    // create Collection elements    
    const lblCollection = document.createElement('label');
    lblCollection.setAttribute('for', 'collection');
    lblCollection.textContent = "Cемейство";
    const inputCollection = document.createElement('input');
    inputCollection.setAttribute('id', 'collection');
    inputCollection.setAttribute('name', 'collection');
    // add Collection elements to div
    const divCollection = document.createElement('div');
    divCollection.appendChild(lblCollection);
    divCollection.appendChild(inputCollection);

    // create Habitat elements    
    const lblHabitat = document.createElement('label');
    lblHabitat.setAttribute('for', 'habitat');
    lblHabitat.textContent = "Cреда обитания";
    const inputHabitat = document.createElement('input');
    inputHabitat.setAttribute('id', 'habitat');
    inputHabitat.setAttribute('name', 'habitat');
    // add Habitat elements to div
    const divHabitat = document.createElement('div');
    divHabitat.appendChild(lblHabitat);
    divHabitat.appendChild(inputHabitat);

    // create buttons for form
    const btnSend = document.createElement('button');
    btnSend.setAttribute('type', 'button');
    btnSend.setAttribute('onclick', 'sendData()');
    btnSend.textContent = "Добавить";

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('onclick', 'deleteData()');
    btnDelete.textContent = "Удалить";

    const btnDeleteAll = document.createElement('button');
    btnDeleteAll.setAttribute('type', 'button');
    btnDeleteAll.setAttribute('onclick', 'deleteAllData()');
    btnDeleteAll.textContent = "Удалить все записи";
    // add button elements to div
    const divButtons = document.createElement('div');
    divButtons.appendChild(btnSend);
    divButtons.appendChild(btnDelete);
    divButtons.appendChild(btnDeleteAll);

    // add div elements to form
    form.appendChild(divRBs);
    form.appendChild(divName);
    form.appendChild(divDescription);
    form.appendChild(divAge);
    form.appendChild(divCollection);
    form.appendChild(divHabitat);
    form.appendChild(divButtons);

    // table elements
    const tblHeader = document.createElement('h1'); // header of table
    tblHeader.textContent = 'Растения';

    // table 
    const table = document.createElement('table');
    table.setAttribute('id', 'plants');

    const thead = document.createElement('thead');

    const tr = document.createElement('tr');

    const thName = document.createElement('th');
    thName.textContent = 'Имя';
    const thDescription = document.createElement('th');
    thDescription.textContent = 'Описание';
    const thLeaf_type = document.createElement('th');
    thLeaf_type.textContent = 'Тип листа';
    const thAge = document.createElement('th');
    thAge.textContent = 'Возраст';
    const thCollection = document.createElement('th');
    thCollection.textContent = 'Семейство';
    const thHabitat = document.createElement('th');
    thHabitat.textContent = 'Среда обитания';

    tr.appendChild(thName);
    tr.appendChild(thDescription);
    tr.appendChild(thLeaf_type);
    tr.appendChild(thAge);
    tr.appendChild(thCollection);
    tr.appendChild(thHabitat);

    thead.appendChild(tr);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', '#tbodyid');

    table.appendChild(thead);
    table.appendChild(tbody);

    // Add form, tableHeader and table to body
    body.appendChild(form);
    body.appendChild(tblHeader);
    body.appendChild(table);
}