var GoogleProvider = new firebase.auth.GoogleAuthProvider();

// GoogleProvider.addScope('https:://www.googleapis.com/auth/plus.login');

var db = firebase.database();

// Recogemos los campos del formulario
var inputs = document.querySelectorAll('form#form-registro > div > input');

var submitForm = document.getElementById('submit');
var googleSubmit = document.getElementById('google-register');

var googleUser;

// Validamos cuando el usuario deja de hacer focus (blur) de algun campo del formulario
for (input of inputs) {
    input.addEventListener('blur', event => {
        validateAll();
    });
}

// Iniciando registro por usuario y contraseña
submitForm.addEventListener('click', event => {

    if (!validateAll()) {
        alert('Todos los campos deben estar rellenados y los datos introducidos deben ser válidos');
        return;
    }

    // Damos de alta al usuario en el registro
    let error = false;
    firebase.auth().createUserWithEmailAndPassword(email.value, passwd.value).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        error = true;
        console.log(errorCode + ': ' + errorMessage);
    });

    if (!error) {
        registerUserData($('#user').val(), $('#email').val(), $('#nacimiento').val(), $('#mensaje').val());
        window.location = 'index.html';
    }
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

        setTimeout(() => { window.location = 'index.html'; }, 1000);

    }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(errorCode+": Error while signing up with "+email+" ("+credential+"): "+errorMessage);
    });
});

// Funciones de validacion de campos
function validateAll () {
    
    return validateUsername() && validatePassword() && validateConfirmPassword() && validateEmail() && validateConfirmEmail() && validatePersonalMessage();
}

function validateUsername () {
    let usuario = $('#user');
    if (usuario.val() == '') {
        usuario.removeClass('valid-form').removeClass('invalid-form');
        return false;
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
            usuario.removeClass('valid-form').addClass('invalid-form');
        } else {
            usuario.removeClass('invalid-form').addClass('valid-form');
        }
    });
    return usuario.hasClass('valid-form');
}

function validatePassword () {
    let password =  $("#passwd");
    if (password.val() == '') {
        password.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if (password.val().length < 8) {
        password.removeClass('valid-form').addClass('invalid-form');
        return false;
    } else {
        password.removeClass('invalid-form').addClass('valid-form');
        return true;
    }
}

function validateConfirmPassword () {
    let cpassword =  $("#cpasswd");
    if (cpassword.val() == '') {
        cpassword.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if ($("#passwd").hasClass('valid-form') && $("#passwd").val() == cpassword.val()) {
        cpassword.removeClass('invalid-form').addClass('valid-form');
        return true;
    } else {
        cpassword.removeClass('valid-form').addClass('invalid-form');
        return false;
    }
}

function validateEmail () {
    let email = $("#email");
    if (email.val() == '') {
        email.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    let mail = email.val();
    if (mail.includes('@') && mail.includes('.', mail.indexOf('@'))) {
        if (mail.substring(0, mail.indexOf('@')).length > 2 && mail.substring(mail.indexOf('@')+1, mail.indexOf('.')).length > 2 && mail.substring(mail.indexOf('.')+1).length >= 2) {
            email.removeClass('invalid-form').addClass('valid-form');
            return true;
        } else {
            email.removeClass('valid-form').addClass('invalid-form');
            return false;
        }
    }
}

function validateConfirmEmail () {
    // TODO: Validar confirmacion de email
    let cemail = $('#cemail');

    if (cemail.val() == '') {
        cemail.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if ($('#email').hasClass('valid-form') && cemail.val() == $('#email').val()) {
        cemail.removeClass('invalid-form').addClass('valid-form');
        return true;
    } else {
        cemail.removeClass('valid-form').addClass('invalid-form');
        return false;
    }
}

function validatePersonalMessage () {
    let mensajePersonal = $("#mensaje");
    if (mensajePersonal.val() == '') {
        mensajePersonal.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if (mensajePersonal.val().length > 60) {
        mensajePersonal.removeClass('valid-form').addClass('invalid-form');
        return false;
    } else {
        mensajePersonal.removeClass('invalid-form').addClass('valid-form');
        return true;
    }
}