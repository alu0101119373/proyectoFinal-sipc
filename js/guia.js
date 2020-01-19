var db = firebase.database();
var userdata;

// Obtenemos el id de la guia
var str = window.location.href;
var id = str.substring(str.indexOf('?')+1).substring(3);
console.log(id);

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        userdata = user;
        // $('#formulario-nuevo-comentario').removeClass('hide-object');
    } else {
        // $('#formulario-nuevo-comentario').addClass('hide-object');
    }
});

db.ref('guias/'+id).once('value', snap => {
    // Introducimos la informacion general
    $('#dificultad-platino').text(snap.val().dificultad+'.');
    $('#duracion-estimada').text(snap.val().duracion+'.');
    $('#trofeos-offline').text(snap.val().offline.bronce+' de bronce, '+snap.val().offline.plata+' de plata y '+snap.val().offline.oro+' de oro.');
    if (snap.val().online.bronce == 0 && snap.val().online.plata == 0 && snap.val().online.oro == 0) {
        $('#trofeos-online').text('No hay trofeos online.');
    } else {
        $('#trofeos-online').text(snap.val().online.bronce+' de bronce, '+snap.val().online.plata+' de plata y '+snap.val().online.oro+' de oro.');
    }
    $('#minimo-partidas').text(snap.val().minimo_partidas+'.');
    $('#trofeos-perdibles').text(snap.val().trofeos_perdibles+'.');
    if (snap.val().activar_trucos == 0) {
        $('#activar-trucos').text('Sí afectan.');
    } else if (snap.val().activar_trucos == 1) {
        $('#activar-trucos').text('No afectan.');
    } else {
        $('#activar-trucos').text('No tiene trucos.');
    }

    $('#influye-dificultad').text(snap.val().influye_dificultad+'.');
    if (snap.val().influye_dificultad == 0) {
        $('#influye-dificultad').text('Sí influye.');
    } else if (snap.val().influye_dificultad == 1) {
        $('#influye-dificultad').text('No influye.');
    } else {
        $('#influye-dificultad').text('La dificultad es única.');
    }
    $('#total-trofeos').text(snap.val().total_trofeos+( snap.val().total_trofeos > 1 ? ' trofeos.' : ' trofeo.'));

    // Comentarios del autor
    $('#comentarios-autor').text(snap.val().comentarios);

    // Nombre de la guia
    $('#nombre-guia').text(snap.val().titulo);

    // Añadimos los trofeos
    get_trophies(snap.val().id_juego);
});

var lista_trofeos = document.getElementById('lista-trofeos');

function get_trophies(id_juego) {
    db.ref('trofeos/').once('value', snap => {
        let valores = snap.val();
        lista_trofeos.innerHTML = '';
        valores.forEach((trofeo, index) => {
            if (trofeo.id_juego == id_juego) {
                lista_trofeos.innerHTML += '<div id="trofeo-'+index+'"></div>';
                if (trofeo.tipo == '0') {
                    $('#trofeo-'+index).append(`
                        <div class="trofeo trofeo-platino row justify-content-around m-sm-1 ml-3 mb-3">
                            <div class="container-fluid no-gutters col-sm-1">
                                <div class="trofeo-ico">
                                    <img src="img/trophies/trofeo_platino.png" style="width:84px; height:84px;" alt="trofeo platino">
                                </div>
                            </div>
                            <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                                <p class="no-padding no-gutters">`+ trofeo.titulo + `</p>
                            </div>
                            <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                                <p class="no-padding no-gutters">`+ trofeo.descripcion + `</p>
                            </div>
                        </div>
                    `);
                } else if (trofeo.tipo == '1') {
                    $('#trofeo-'+index).append(`
                    <div class="trofeo trofeo-bronce row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_bronce.png" style="width:84px; height:84px;" alt="trofeo bronce">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+ trofeo.titulo + `</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+ trofeo.descripcion + `</p>
                        </div>
                    </div>
                    `);
                } else if (trofeo.tipo == '2') {
                    $('#trofeo-'+index).append(`
                    <div class="trofeo trofeo-plata row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_plata.png" style="width:84px; height:84px;" alt="trofeo plata">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+ trofeo.titulo + `</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+ trofeo.descripcion + `</p>
                        </div>
                    </div>
                    `);
                } else {
                    $('#trofeo-'+index).append(`
                    <div class="trofeo trofeo-oro row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_oro.png" style="width:84px; height:84px;" alt="trofeo oro">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+ trofeo.titulo + `</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+ trofeo.descripcion + `</p>
                        </div>
                    </div>
                    `);
                }
            }
            db.ref('comentarios_trofeos/').once('value', snap => {
                for (comentario of snap.val()) {
                    if (comentario == null) continue;
                    if (comentario.id_trofeo == index && comentario.id_guia == id) {
                        $('#trofeo-'+index).append(`
                            <div class="container new-comment" style="width: 1022px;">
                                <p id="trofeo-`+index+`-boton" data-toggle="collapse" href="#collapseTrofeo-`+index+`" onClick="openComment(`+index+`)" aria-expanded="false" aria-controls="collapseTrofeo-`+index+`">+ Ver spoiler</p>
                                <div class="collapse" id="collapseTrofeo-`+index+`" aria-expanded="false" aria-controls="collapseTrofeo-`+index+`">
                                    <div class="row no-gutters no-padding body_infogen p-2">
                                        <p class="info-text-guide no-gutters">`+comentario.comentario+`</p>
                                    </div>
                                </div>
                            </div> 
                        `);
                    }
                }
            });
        });
    });
}

function openComment (id_trofeo) {

    if (document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML == '+ Ver spoiler') {
        document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML = '- Ver spoiler';
    } else {
        document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML = '+ Ver spoiler';
    }
}

var porcentaje_positivos = document.getElementById('porc-positivos');
var porcentaje_negativos = document.getElementById('porc-negativos');
var valoracion_total = document.getElementById('valoraciones-totales');

function get_valorations (data, id) {
    database = data + '/';
    db.ref(database).once('value', snap => {
        console.log(snap.val());
        // Obtenemos los datos
        var pos = 0;
        var neg = 0;
        var cont = 0;
        for (valoracion of snap.val()) {
            console.log(valoracion);
            if (valoracion.id_guia == id) {
                console.log(neg + ', ' + pos + ', ' + cont);
                if (valoracion.valor == '0') {
                    neg += 1;
                } else {
                    pos += 1;
                }
                cont += 1;
            }
        }
        // Calculamos los porcentajes
        pos = (cont != 0 ? (pos * 100) / cont : 0);
        neg = (cont != 0 ? (neg * 100) / cont : 0);

        // Colocamos en el HTML
        // console.log(neg + ', ' + pos);
        porcentaje_negativos.innerHTML = neg + '%';
        porcentaje_positivos.innerHTML = pos + '%';
        if (cont == 1) {
            valoracion_total.innerHTML = '1 valoración en total';
        } else {
            valoracion_total.innerHTML = cont + ' valoraciones en total';
        }
    });
}

get_valorations('valoraciones_guia', id);