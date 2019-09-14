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

db.collection('event-list').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        render_event_list_element(doc);
        console.log(doc.data);
    })
})