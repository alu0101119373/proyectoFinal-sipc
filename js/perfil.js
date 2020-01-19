// Variables globales
var db = firebase.database();
var storageRef = firebase.storage().ref();
var userdata;

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        userdata = user;
    } else {
        console.log('No estas logueado');
    }
});

// Descargamos los datos del usuario
db.ref('usuarios').once('value', snap => {
    console.log(snap.val());

    for (usuario of snap.val()) {
        console.log(usuario + ', ' + userdata);
        if (usuario == null) continue;
        if (usuario.email == userdata.email) {
            $('#name-user').text(usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1));
            $('#nac-user').text(usuario.fecha_nacimiento);
            $('#img-user').attr('src', usuario.imagen);
            $('#user-email').text(usuario.email);
            $('#user-personal-message').text('"'+usuario.mensaje+'"');
        }
    }
});

function changePhoto (file) {

    var ref = storageRef.child('profile-images/'+userdata.email+'-profile_image-'+file.name);

    ref.put(file).then ( snapshot => {
        ref.getDownloadURL().then ( url => {
            db.ref('usuarios').once('value', snap => {
                snap.val().forEach( (user, index) => {
                    if (user.email == userdata.email) {
                        var userRef = db.ref().child('usuarios/'+index);
                        userRef.update({ 'imagen': url });
                    }
                });
            });
        });
    });
}

document.getElementById('input-img-file').addEventListener('change', event => {
    var file = event.target.files[0];

    // console.log(file);

    changePhoto(file);

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-name').addEventListener('click', event => {
    var data = $('#input-new-name').val();
    db.ref('usuarios').once('value', snap => {
        snap.val().forEach( (user, index) => {
            if (user.email == userdata.email) {
                var userRef = db.ref().child('usuarios/'+index);
                userRef.update({ 'nombre' : data });
            }
        });
    });

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-email').addEventListener('click', event => {
    var data = $('#input-new-email').val();
    db.ref('usuarios').once('value', snap => {
        snap.val().forEach( (user, index) => {
            if (user.email == userdata.email) {
                var userRef = db.ref().child('usuarios/'+index);
                userRef.update({ 'email' : data });
                var user = firebase.auth().currentUser;
                var credential = firebase.auth.EmailAuthProvider.credential(
                    $('#input-actual-email-email').val(), 
                    $('#input-actual-passwd-email').val()
                );;
                user.reauthenticateWithCredential(credential).then ( () => {
                    firebase.auth().currentUser.updateEmail(data).then(() => {
                        setTimeout(() => { location.reload(); }, 1000);
                    });
                }).catch( error => {
                    alert(error.code+': '+error.message);
                });
            }
        });
    });
});

document.getElementById('confirmar-message').addEventListener('click', event => {
    var data = $('#input-new-message').val();
    db.ref('usuarios').once('value', snap => {
        snap.val().forEach( (user, index) => {
            if (user.email == userdata.email) {
                var userRef = db.ref().child('usuarios/'+index);
                userRef.update({ 'mensaje' : data });
            }
        });
    });

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-passwd').addEventListener('click', event => {
    var data = $('#input-new-passwd').val();

    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        $('#input-actual-email-passwd').val(), 
        $('#input-actual-passwd-passwd').val()
    );;

    user.reauthenticateWithCredential(credential).then ( () => {
        firebase.auth().currentUser.updatePassword(data).then( () => {
            setTimeout(() => { location.reload(); }, 1000);
        });
    }).catch( error => {
        alert(error.code+': '+error.message);
    });

});

document.getElementById('confirmar-delete').addEventListener('click', event => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        $('#input-actual-email-delete').val(), 
        $('#input-actual-passwd-delete').val()
    );

    user.reauthenticateWithCredential(credential).then ( () => {
        user.delete().then ( () => {
            alert('Tu cuenta ha sido borrada satisfactoriamente.');
            window.location = 'index.html';
        }).catch(() => {
            alert(error.code+': '+error.message);
        });
    }).catch( error => {
        alert(error.code+': '+error.message);
    });

});