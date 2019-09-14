//reference to the create event form
const create_event = document.querySelector('#create-event-form');

create_event.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //get all the values from the create event form
    //and upload them to the database
    db.collection('event-list').add({
        title: create_event['title'].value,
        date: create_event['date'].value,
        address: create_event['address'].value,
        description: create_event['description'].value,
        organization: create_event['organization'].value,
        type: create_event['type'].value,
        volunteers: ''
    }).then(() => {
        window.location.replace("index.html");
    });
});
