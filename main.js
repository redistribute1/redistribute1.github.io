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

//logout function
function logout() {
    auth.signOut();
}