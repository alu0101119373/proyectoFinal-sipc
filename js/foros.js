var db = firebase.database();

var foros = document.getElementById('lista-foros');

// db.ref('foros').once('value', snap => {
//     foros.innerHTML = '';
//     var img_usuario;
//     var username;
//     for (data of snap.val()) {
//         var img_usuario = db.ref('usuarios').once('value', snap => {
//             db.ref('usuarios').once('value', snap => {

//             });
//         });
//         var username = db.ref('foros').once('value', snap => {
//             db.ref('usuarios').once('value', snap => {

//             });
//         });
//         foros.innerHTML += `
//             <div class="row no-padding no-gutters foro justify-content-center">
//                 <div class="col-4">
//                     <div class="row no-gutters no-padding justify-content-center">
//                         <div class="col-6">
//                             <img src=` + img_usuario + ` class="icon-foro">
//                         </div>
//                         <div class="col-6 col-user align-items-center">
//                             <p class="no no-padding no-gutters text-foros foro-text align-self-center " style=margin-top:33px;>` + username + `</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-8 align-items-center ">
//                     <div class="row justify-content-center no-gutters no-padding ">
//                         <div class="col-8 align-items-center ">
//                             <p class="no-padding no-gutters text-foros nombre-foro ">` + data.titulo + `</p>
//                         </div>
//                         <div class="col-4 ">
//                             <div class="row no-gutters no-padding justify-content-center ">
//                                 <p class="text-foros foro-text ">` + data.fecha_creacion + `</p>
//                             </div>
//                             <div class="row no-gutters no-padding justify-content-center ">
//                                 <p class="text-foros foro-text ">` + data.hora_creacion + `</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//     }
// });

db.ref('foros').once('value', snap => {
    foros.innerHTML = '';
    snap.val().forEach((foro, index) => {
        // Para cada foro, debemos mostrar toda la informacion tanto de la misma como del usuario
        // Accedemos a los datos del usuario
        $('#lista-foros').append('<div id="foro-'+index+'"class="row no-padding no-gutters foro p-3 mb-2 mt-2 justify-content-center"></div>');
        db.ref('usuarios/'+foro.id_usuario).once('value', snap => {
            $('#foro-'+index).prepend(`
                <div class="col-4">
                    <div class="row no-gutters no-padding justify-content-center">
                        <div class="col-5">
                            <img src=` + snap.val().imagen + ` class="icon-foro">
                        </div>
                        <div class="col-7 col-user align-items-center">
                            <p class="no no-padding no-gutters text-foros foro-text align-self-center " style=margin-top:33px;>` + snap.val().nombre + `</p>
                        </div>
                    </div>
                </div>
            `);
        });
        $('#foro-'+index).prepend(`
                <div class="col-8 align-items-center">
                    <div class="row justify-content-center no-gutters no-padding go-to-forum">
                        <div class="col-8 align-items-center ">
                            <p class="no-padding no-gutters text-foros nombre-foro pl-3">` + foro.titulo + `</p>
                        </div>
                        <div class="col-4 ">
                            <div class="row no-gutters no-padding justify-content-center ">
                                <p class="text-foros foro-text ">` + foro.fecha_creacion + `</p>
                            </div>
                            <div class="row no-gutters no-padding justify-content-center ">
                                <p class="text-foros foro-text ">` + foro.hora_creacion + `</p>
                            </div>
                        </div>
                    </div>
                </div>
        `);
        // document.getElementById('foro-'+foro.).removeAttribute('id');
    });
});