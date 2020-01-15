// Cargamos la base de datos
var firebaseConfig = {
    apiKey: "AIzaSyD370dYi_BY6atxgza1OmIDSOXUoQRLxBE",
    authDomain: "trophie-games.firebaseapp.com",
    databaseURL: "https://trophie-games.firebaseio.com",
    projectId: "trophie-games",
    storageBucket: "trophie-games.appspot.com",
    messagingSenderId: "286202581827",
    appId: "1:286202581827:web:9898ef8d74a4caac9e55f6",
    measurementId: "G-GMV55YLF8P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var GoogleProvider = new firebase.auth.GoogleAuthProvider();

var db = firebase.database();

// Recogemos los datos
var email = $('#email');
var passwd = $('#passwd');

var errorBox = $('#error-container');

var btnAccess = document.getElementById('submit');

// Acciones
btnAccess.addEventListener('click', event => {
    firebase.auth().signInWithEmailAndPassword(email.val(), passwd.val()).catch(error => {
        var errorCode = error.code;
        errorBox.removeClass('hide-object');
        if (errorCode == 'auth/user-not-found') {
            errorBox.children('p').text('El email indicado no está registrado.');
        } else if (errorCode == 'auth/invalid-email') {
            errorBox.children('p').text('El email indicado no es válido.');
        } else if (errorCode == 'auth/user-disabled') {
            errorBox.children('p').text('Lo sentimos, este usuario se encuentra deshabilitado.');
        } else if (errorCode == 'auth/wrong-password') {
            errorBox.children('p').text('La contraseña indicada no es correcta.');
        }
    });
});

// Autenticacion con google
var googleSubmit = document.getElementById('google-register');

googleSubmit.addEventListener('click', event => {
    firebase.auth().signInWithPopup(GoogleProvider).then( result => {
        var googleToken = result.credential.accessToken;
        googleUser = result.user;
        console.log(googleUser);

        registerUserData(googleUser.displayName, googleUser.email, '','');
    }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(errorCode+": Error while signing up with "+email+" ("+credential+"): "+errorMessage);
    });
});