const event_list = document.querySelector('#event-list'); //reference main page event list
var googlemap = document.getElementById("map"); //reference google map being displayed on the landing page

function convert_list_element(doc) {
    html = `
    <li id=${doc.id} class="listelement">
        <button class="details" onclick="upload_event_item_info('${doc.id}')">View Details</button>
        <span class="title"><strong>${doc.data().title}</strong></span><br>
        <span class="date"><strong>Date:</strong> ${doc.data().date}</span><br>
        <span class="address"><strong>Address:</strong> ${doc.data().address}</span><br>
        <span class="organ_name"><strong>Organization Name:</strong> ${doc.data().organization}</span><br>
        <span class="type"><strong>Charity Type:</strong> ${doc.data().type}</span><br>
        <span class="contact"><strong>Contact:</strong> ${doc.data().contact}</span><br><br>
        <span class="description"><strong>Descripton:</strong> ${doc.data().description}</span>
    </li>
    `
    return html
}

function upload_event_item_info(docid) {
    console.log(docid);
    localStorage.setItem('id', docid);
    window.location.replace("event-details.html");

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
            element = convert_list_element(change.doc);
            
        } else if (change.type == 'removed') {
            /*
            console.log("index remove");
            let li = event_list.querySelector('[event-id=' + change.doc.id + ']');
            event_list.removeChild(li);
            */
           var item = document.getElementById(change.doc.id);
           event_listID.removeChild(item);
        }
        finalhtml = finalhtml + element
    });
    event_listID.innerHTML = finalhtml;
})