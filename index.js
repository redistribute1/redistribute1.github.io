const event_list = document.querySelector('#event-list'); //reference main page event list

// create event list element and render to DOM on main page
function render_event_list_element(doc) {

    //assign variables to each one of event element attributes
    let li = document.createElement('li');
    let title = document.createElement('span');
    let date = document.createElement('span');
    let address = document.createElement('span');
    let description = document.createElement('span');
    let organization = document.createElement('span');
    let type = document.createElement('span');

    //set the attributes for css styles
    li.setAttribute('event-id', doc.id);
    li.setAttribute('class', "listelement");
    title.setAttribute('class', "title");
    date.setAttribute('class', "date");
    address.setAttribute('class', "address");
    description.setAttribute('class', "description");
    organization.setAttribute('class', "organ_name");
    type.setAttribute('class', "type");

    
    //set the textContent to the information retrieved from db
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

function convert_list_element(doc) {
    html = `
    <li event-id=${doc.ide} class="listelement">
        <span class="title">${doc.data().title}</span><br>
        <span class="date">Date: ${doc.data().date}</span><br>
        <span class="address">Address: ${doc.data().address}</span><br>
        <span class="organ_name">Organization Name: ${doc.data().organization}</span><br>
        <span class="type">Charity Type: ${doc.data().type}</span><br>
        <span class="description">${doc.data().description}</span>
    </li>
    `
    return html
}

//real time listener to query the charity event elements.
db.collection('event-list').orderBy('date').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    var event_listID = document.getElementById("event-list");
    var finalhtml = "";
    //for each element in the query
    changes.forEach(change => {
        console.log(changes);
        //if it is tagged as added then render it otherwise remove it
        if (change.type == 'added') {
            //render_event_list_element(change.doc);
            element = convert_list_element(change.doc);
            
        } else if (change.type == 'removed') {
            let li = event_list.querySelector('[event-id=' + change.doc.id + ']');
            event_list.removeChild(li);
        }
        finalhtml = finalhtml + element
    });
    event_listID.innerHTML = finalhtml;
})