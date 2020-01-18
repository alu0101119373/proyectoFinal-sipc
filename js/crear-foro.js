db = firebase.database();
var userdata;

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        userdata = user;
    }
});

var boton_submit = document.getElementById('crear-foro');
var titulo = document.getElementById('nombre-foro');

boton_submit.addEventListener('click', event => {
    var contenido = titulo.value;
    var hoy = new Date();

    db.ref('foros').once('value', snap => {
        var sz = snap.val().length;
        db.ref('usuarios').once('value', snap => {
            snap.val().forEach((usuario, index) => {
                if (usuario.email == userdata.email) {
                    // Añadimos a la base de datos
                    db.ref('foros/'+sz).set({
                        titulo: contenido,
                        fecha_creacion: hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear(),
                        hora_creacion: hoy.getHours()+':'+hoy.getMinutes(),
                        id_usuario: index
                    });
                }
            });
        });
    });
    setTimeout(() => { window.location = 'foros.html' }, 1000);
});