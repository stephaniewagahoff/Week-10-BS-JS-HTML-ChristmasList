// Create Person Class
// Parameters: id is unique identifier, name is name of person
// addGift: Adds a gift for the person
// deleteGift: Deletes a gift from the person
class Person{
    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.gifts = [];
    }

    addGift(gift) {
        this.gifts.push(gift);
    }
    deleteGift(gift) {
        let index = this.gifts.indexOf(gift);
        this.gifts.splice(index, 1);
    }
}

// Create Gift Class
// Parameters: name is name of gift, location is where it was bought
class Gift{
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
}

let people = [];
let personId = 0;

// Add event listener for New Friend Button
let element = document.getElementById("new-friend");
element.addEventListener('click', () => {
    people.push(new Person(personId++, document.getElementById('new-friend-family').value));
    drawDOM();} );

// Redraws the DOM
function drawDOM() {
    let listDiv = document.getElementById('lists');
    
    // Clear the gift list
    while(listDiv.firstChild)
        listDiv.removeChild(listDiv.firstChild);
    
    // Recreate the gift list table
    for (let person of people) {
        let table = createPersonTable(person);
        let title = document.createElement('h2');
        title.innerHTML = person.name;

        /* Create Delete Person Button */
        let btn = createButton('Delete', () => {let index = people.indexOf(person); people.splice(index, 1); drawDOM();});
        title.appendChild(btn);

        listDiv.appendChild(title);
        listDiv.appendChild(table);
        
        for (let gift of person.gifts) {
            createGiftRow(person, table, gift);
        }
    }
}

// Create a row for the new Gift
function createGiftRow(person, table, gift) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = gift.name;
    row.insertCell(1).innerHTML = gift.location;
    let actions = row.insertCell(2);

    // Create Delete Gift Button
    let btn = createButton('Delete', () => {
            let index = person.gifts.indexOf(gift);
            person.gifts.splice(index, 1); drawDOM();});

    actions.appendChild(btn); 
}

// Create the table for new person
function createPersonTable(person) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-primary table-hover table-striped');
    let row = table.insertRow(0);
    let giftColumn = document.createElement('th');
    let locationColumn = document.createElement('th');
    let blankColumn = document.createElement('th');
    giftColumn.innerHTML = 'Gift';
    locationColumn.innerHTML = 'Location';
    row.appendChild(giftColumn);
    row.appendChild(locationColumn);
    row.appendChild(blankColumn);
    let formRow = table.insertRow(1);
    let giftTh = document.createElement('th');
    let locationTh = document.createElement('th');
    let createTh = document.createElement('th');
    let giftInput = document.createElement('input');
    giftInput.setAttribute('id', `gift-input-${person.id}`);
    giftInput.setAttribute('type', 'text');
    giftInput.setAttribute('class', 'form-control');

    let locationInput = document.createElement('input');
    locationInput.setAttribute('id', `location-input-${person.id}`)
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('class', 'form-control');

    // Create New Gift Button
    let btn = createButton('Create', () => {
                person.gifts.push(new Gift (document.getElementById(`gift-input-${person.id}`).value, 
                document.getElementById(`location-input-${person.id}`).value)); drawDOM();} );
    
    giftTh.appendChild(giftInput);
    locationTh.appendChild(locationInput);
    createTh.appendChild(btn);
    formRow.appendChild(giftTh);
    formRow.appendChild(locationTh);
    formRow.appendChild(createTh);
    return table;
}

// General function use for creating a button
// Parameters: name is the name of the button, action is the function when clicked
function createButton(name, action) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = `${name}`;
    btn.onclick = action;
    return btn;
}











