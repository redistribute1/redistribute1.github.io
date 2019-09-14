window.onload = function(){
    $.get("/navBar.html", function(data){
        $("#include").html(data);
    })
    render_eventdetails_page();
}

auth.onAuthStateChanged(user => {
    /* if the user is logged in allowed for account features
     * otherwise simply display website as guest
     */
    if (user) {
        console.log('Main Script: ' + user);
        setupUI(user);
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

//render the event details page
function render_eventdetails_page() {
    var getValue = localStorage.getItem('id');
    var docRef = db.collection("event-list").doc(getValue);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var event_detailsID = document.getElementById("event_detail_box");
            
            html = `
                <span class="title"><strong>${doc.data().title}</strong></span><br>
                <span class="date"><strong>Date:</strong> ${doc.data().date}</span><br>
                <span class="address"><strong>Address:</strong> ${doc.data().address}</span><br>
                <span class="organ_name"><strong>Organization Name:</strong> ${doc.data().organization}</span><br>
                <span class="type"><strong>Charity Type:</strong> ${doc.data().type}</span><br><br>
                <span class="description"><strong>Descripton:</strong> ${doc.data().description}</span><br>
                
                <span class="volunteers"><strong>Volunteer List:</strong></span>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr> 
            `
            volunteerstring = doc.data().volunteers;
            varray = volunteerstring.split(";");
            var i = 0;
            
            for(i = 0; i < varray.length; i+=3) {
                html = html + `
                <tr>
                    <td>${varray[i]}</td>
                    <td>${varray[i+1]}</td>
                    <td>${varray[i+2]}</td>
                </tr>
                `
            }
            html = html + `
            </table><br><br>
            <span class="volunteers"><strong>Supplies:</strong></span>
            <table>
                    <tr>
                        <th>Item Description</th>
                        <th>Amount</th>
                    </tr> `; 

                    
            rstring = doc.data().resources;
            rarray = rstring.split(";");
            var j = 0;
            for(j = 0; j < rarray.length; j++) {
                item_array = rarray[j].split('-');
                console.log(item_array);
                html = html + `
                <tr>
                    <td>${item_array[0]}</td>
                    <td>${item_array[1]}</td>
                </tr>
                `
            }
            html = html + `
            </table><br><br>`

            event_detailsID.innerHTML = html;
            
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
}

//logout function
function logout() {
    auth.signOut();
}