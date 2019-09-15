window.onload = function(){
    $.get("/navBar.html", function(data){
        $("#include").html(data);
    })
}

auth.onAuthStateChanged(user => {
    /* if the user is logged in allowed for account features
     * otherwise simply display website as guest
     */
    if (user) {
        console.log('Main Script: ' + user);
        setupUI(user);
        db.collection('users').doc(user.uid).get().then(doc => {
            render_page(doc.data().organization_name);
        });
        
    } else {
        console.log('Main Script: no user logged in');
        setupUI();
    }
});

//setup up UI based on logged in out logged out
function setupUI(user) {
    const logged_out_links = document.querySelectorAll('.logged_out');
    const logged_in_links = document.querySelectorAll('.logged_in');
    if (user) {
        //user is logged in 
        logged_in_links.forEach(item => item.style.display = 'block');
        logged_out_links.forEach(item => item.style.display = 'none');
        
    } else {
        //user is logged out
        logged_in_links.forEach(item => item.style.display = 'none');
        logged_out_links.forEach(item => item.style.display = 'block');
    }
}


function convert_list_element(doc) {
    html = `
    <li id=${doc.id} class="listelement">
        <button class="details" onclick="upload_event_item_info('${doc.id}')">View Details</button>
        <button class="delete" onclick="delete_item_info('${doc.id}')">Delete Event</button>
        <span class="title"><strong>${doc.data().title}</strong></span><br>
        <span class="date"><strong>Date:</strong> ${doc.data().date}</span><br>
        <span class="address"><strong>Address:</strong> ${doc.data().address}</span><br>
        <span class="organ_name"><strong>Organization Name:</strong> ${doc.data().organization}</span><br>
        <span class="type"><strong>Charity Type:</strong> ${doc.data().type}</span><br><br>
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

function delete_item_info(docid) {
    db.collection("event-list").doc(docid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//real time listener to query the charity event elements.
const event_list = document.querySelector('#myevent-list'); //reference main page event list
function render_page(org_name) {
    db.collection('event-list').where("organization", "==", org_name).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        var event_listID = document.getElementById("myevent-list");
        var finalhtml = "";
        
        //for each element in the query
        changes.forEach(change => {
            console.log(changes);
            //if it is tagged as added then render it otherwise remove it
            if (change.type == 'added') {
                element = convert_list_element(change.doc);
                
            } else if (change.type == 'removed') {
                let li = event_list.querySelector('[event-id=' + change.doc.id + ']');
                event_list.removeChild(li);
            }
            finalhtml = finalhtml + element
        });
        event_listID.innerHTML = finalhtml;
    })

}


//logout function
function logout() {
    auth.signOut();
}
