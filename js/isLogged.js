var db = firebase.database();

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        // User is signed in
        $('#logged').removeClass('hide-object');
        $('#no-logged').addClass('hide-object');
        
        // Accedemos a la base de datos
        db.ref('usuarios').once('value', snap => {
            for (userData of snap.val()) {
                if (userData == null) continue;
                if (userData.email == user.email) {
                    $('#logged-name').text(userData.nombre);
                    $('#logged-img').attr('src', userData.imagen);
                    return;
                }
            }
        });

    } else {
        // User is not logged in
        $('#no-logged').removeClass('hide-object');
        $('#logged').addClass('hide-object');
    }
});

document.getElementById('perfilRequest').addEventListener('click', event => {
    window.location = 'perfil.html';
});

document.getElementById('close-session').addEventListener('click', event => {
    // Cerrramos sesion
    firebase.auth().signOut().then( () => {
        // Sign-out successful
        location.reload();
    }).catch (error => {
        // An error happened
        console.log(error.code + ": " + error.message);
    });
});