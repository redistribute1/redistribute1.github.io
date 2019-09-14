const event_list = document.querySelector('#event-list'); //reference main page event list

// create event list element and render to DOM on main page
function render_event_list_element(doc) {

    //assign variables to each one of event element attributes
    let li = document.createElement('li');
    let title = document.createElement('title');
    let date = document.createElement('span');
    let address = document.createElement('span');
    let description = document.createElement('span');
    let organization = document.createElement('span');
    let type = document.createElement('span');

    //set the textContent to the information retrieved from db
    li.setAttribute('event-id', doc.id);
    title.textContent = doc.data().title;
    date.textContent = doc.data().date;
    address.textContent = doc.data().address;
    description.textContent = doc.data().description;
    organization.textContent = doc.data().organization;
    type.textContent = doc.data().type;

    li.appendChild(title);
    li.appendChild(date);
    li.appendChild(address);
    li.appendChild(description);
    li.appendChild(organization);
    li.appendChild(type);
    
    event_list.appendChild(li);
}

//real time listener to query the charity event elements.
db.collection('event-list').orderBy('date').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    //for each element in the query
    changes.forEach(change => {
        //if it is tagged as added then render it otherwise remove it
        if (change.type == 'added') {
            render_event_list_element(change.doc);
        } else if (change.type == 'removed') {
            let li = event_list.querySelector('[event-id=' + change.doc.id + ']');
            event_list.removeChild(li);
        }
    })
})