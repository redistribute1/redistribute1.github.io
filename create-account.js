const signup_form = document.querySelector('#signup_form'); //reference to the sign up form

//creating an account
signup_form.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = signup_form['signup_email'].value;
    var pass = signup_form['signup_pass'].value;
    var confirm_pass = signup_form['signup_confirmpass'].value;
    var org_name = signup_form['organization_name'].value;

    if (String(pass) == String(confirm_pass)) {
        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            //add first,last, and bio to user info
            return db.collection('users').doc(cred.user.uid).set({
                organization_name: org_name
            });
        }).then(() => {
            //then reset the form and redirect to index
            document.getElementById("error_box").innerHTML = "";
            signup_form.reset();
            window.location.replace("index.html");
        }).catch(function(error) {
            //any errors are displayed to signup box
            var errorMessage = error.message;
            signup_error(errorMessage);
        }); 
    } else {
        signup_error("Passwords Do Not Match!");
    }
});

//helper message for displaying sign up errors
function signup_error(error_message) {
    var error_box = document.getElementById("error_box");
    error_box.innerHTML = error_message;
}