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

// GoogleProvider.addScope('https:://www.googleapis.com/auth/plus.login');

var db = firebase.database();

// Recogemos los campos del formulario
var inputs = document.querySelectorAll('form#form-registro > div > input');
// var usuario = document.getElementById('user');
// var passwd = document.getElementById('passwd');
// var cpasswd = document.getElementById('cpasswd');
// var email = document.getElementById('email');
// var cemail = document.getElementById('cemail');
// var fecha_nacimiento = document.getElementById('nacimiento');
// var mensaje_personal = document.getElementById('mensaje');

var submitForm = document.getElementById('submit');
var googleSubmit = document.getElementById('google-register');

var googleUser;

// Validamos cuando el usuario deja de hacer focus (blur) de algun campo del formulario
for (input of inputs) {
    console.log(input);
    input.addEventListener('blur', event => {
        validateUsername();
        validatePassword();
        validateConfirmPassword();
        validateEmail();
        validateConfirmEmail();
        validatePersonalMessage();
    });
}

// usuario.addEventListener('blur', event => {
//     validateUsername(event);
// });

// passwd.addEventListener('blur', event => {
//     validatePassword(event);
// });

// cpasswd.addEventListener('blur', event => {
//     validateConfirmPassword(event);
// });

// email.addEventListener('blur', event => {
//     validateEmail(event);
// });

// nacimiento.addEventListener('blur', event => {
//     // El propio campo se verifica
// });

// mensaje.addEventListener('blur', event => {
//     validatePersonalMessage(event);
// });

// Iniciando registro por usuario y contraseña
submitForm.addEventListener('click', event => {
    console.log("Enviando registro...");

    // Damos de alta al usuario en el registro
    let error = false;
    firebase.auth().createUserWithEmailAndPassword(email.value, passwd.value).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        error = true;
        console.log(errorCode + ': ' + errorMessage);
    });

    if (!error)
        registerUserData(usuario.value, email.value, nacimiento.value, mensaje.value);
});

// funciones para autenticacion
function registerUserData (nombre, email, nacimiento, mensaje) {
    // Determinamos el tamaño de la tabla
    db.ref('usuarios').once('value', snap => {
        var sz = snap.val().length;
        db.ref('usuarios/'+sz).set({
            nombre: nombre,
            email: email,
            fecha_nacimiento: nacimiento,
            mensaje: mensaje,
            pais: "españa",
            imagen: "https://firebasestorage.googleapis.com/v0/b/trophie-games.appspot.com/o/login_icon.png?alt=media&token=47045fca-5d6b-4010-9171-673d1df5ca73"
        });
    });
}

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

// Funciones de validacion de campos
function validateUsername () {
    let usuario = $('#user');
    if (usuario.val() == '') {
        console.log("Campos username vacio");
        usuario.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    // Leemos de la base de datos de firebase
    db.ref('usuarios').once('value', snap => {
        let found = false;
        for (userData of snap.val()) {
            if (userData.nombre.toLowerCase() == user.value.toLowerCase()) {
                found = true;
                break;
            }
        }
        if (found) {
            console.log("Ya está registrado");
            usuario.removeClass('valid-form').addClass('invalid-form');
        } else {
            console.log("NO está registrado");
            usuario.removeClass('invalid-form').addClass('valid-form');
        }
    });
}

function validatePassword () {
    let password =  $("#passwd");
    if (password.val() == '') {
        console.log("Campos password vacio");
        password.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    if (password.val().length < 8) {
        password.removeClass('valid-form').addClass('invalid-form');
    } else {
        password.removeClass('invalid-form').addClass('valid-form');
    }
}

function validateConfirmPassword () {
    let cpassword =  $("#cpasswd");
    if (cpassword.val() == '') {
        console.log("Campos confirm password vacio");
        cpassword.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    if ($("#passwd").hasClass('valid-form') && $("#passwd").val() == cpassword.val()) {
        cpassword.removeClass('invalid-form').addClass('valid-form');
    } else {
        cpassword.removeClass('valid-form').addClass('invalid-form');
    }
}

function validateEmail () {
    let email = $("#email");
    if (email.val() == '') {
        console.log("Campos email vacio");
        email.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    let mail = email.val();
    if (mail.includes('@') && mail.includes('.', mail.indexOf('@'))) {
        if (mail.substring(0, mail.indexOf('@')).length > 2 && mail.substring(mail.indexOf('@')+1, mail.indexOf('.')).length > 2 && mail.substring(mail.indexOf('.')+1).length >= 2) {
            email.removeClass('invalid-form').addClass('valid-form');
        } else {
            email.removeClass('valid-form').addClass('invalid-form');
        }
    }
}

function validateConfirmEmail () {
    // TODO: Validar confirmacion de email
    let cemail = $('#cemail');

    if (cemail.val() == '') {
        console.log("Campos confirm email vacio");
        email.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    if ($('#email').hasClass('valid-form') && cemail.val() == $('#email').val()) {
        email.removeClass('invalid-form').addClass('valid-form');
    } else {
        email.removeClass('valid-form').addClass('invalid-form');
    }
}

function validatePersonalMessage () {
    let mensajePersonal = $("#mensaje");
    if (mensajePersonal.val() == '') {
        console.log("Campo mensaje personal vacio");
        mensajePersonal.removeClass('valid-form').removeClass('invalid-form');
        return;
    }

    if (mensajePersonal.val().length > 60) {
        mensajePersonal.removeClass('valid-form').addClass('invalid-form');
    } else {
        mensajePersonal.removeClass('invalid-form').addClass('valid-form');
    }
}