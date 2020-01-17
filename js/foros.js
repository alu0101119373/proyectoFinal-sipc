var db = firebase.database();

var foros = document.getElementById('lista-foros');

db.ref('foros').once('value', snap => {
    foros.innerHTML = '';
    var img_usuario;
    var username;
    for (data of snap.val()) {
        var img_usuario = db.ref('usuarios').once('value', snap => {
            db.ref('usuarios').once('value', snap => {

            });
        });
        var username = db.ref('foros').once('value', snap => {
            db.ref('usuarios').once('value', snap => {

            });
        });
        foros.innerHTML += `
            <div class="row no-padding no-gutters foro justify-content-center">
                <div class="col-4">
                    <div class="row no-gutters no-padding justify-content-center">
                        <div class="col-6">
                            <img src=` + img_usuario + ` class="icon-foro">
                        </div>
                        <div class="col-6 col-user align-items-center">
                            <p class="no no-padding no-gutters text-foros foro-text align-self-center " style=margin-top:33px;>` + username + `</p>
                        </div>
                    </div>
                </div>
                <div class="col-8 align-items-center ">
                    <div class="row justify-content-center no-gutters no-padding ">
                        <div class="col-8 align-items-center ">
                            <p class="no-padding no-gutters text-foros nombre-foro ">` + data.titulo + `</p>
                        </div>
                        <div class="col-4 ">
                            <div class="row no-gutters no-padding justify-content-center ">
                                <p class="text-foros foro-text ">` + data.fecha_creacion + `</p>
                            </div>
                            <div class="row no-gutters no-padding justify-content-center ">
                                <p class="text-foros foro-text ">` + data.hora_creacion + `</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
});