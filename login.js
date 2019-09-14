//Vishnu comment
const login_form = document.querySelector('#login_form');
login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = login_form['login_email'].value;
    var pass = login_form['login_pass'].value;

    //login to firebase
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        login_form.reset();
        //redirect to courses
        window.location.replace("index.html"); 
    }).catch(function(error) {
        var errorMessage = error.message;
        login_error(errorMessage);
    });
});

//helper message for displaying login up errors
function login_error(error_message) {
    var error_box = document.getElementById("error_box");
    error_box.innerHTML = error_message;
}