// Variables globales
var id_juego;
var userdata;

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        userdata = user;
    }
});

// Para deshabilitar los trofeos online en caso de que se active la checkbox
$('#ch_no_online').change(() => {
    $('.trofeo-online').attr('disabled', (index, attr) => {
        return !attr;
    });
});

var dif_platino = document.getElementById('dificultad-platino');
dif_platino.addEventListener('blur', () => {
    if (dif_platino.value) {
        $('#dificultad-platino').removeClass('valid-form').removeClass('invalid-form');
        $('#dificultad-platino-error').addClass('hide-object');
    }

    if (dif_platino.value > 10) {
        $('#dificultad-platino').removeClass('valid-form').addClass('invalid-form');
        $('#dificultad-platino-error').removeClass('hide-object');
    } else {
        $('#dificultad-platino').removeClass('invalid-form').addClass('valid-form');
        $('#dificultad-platino-error').addClass('hide-object');
    }
});

// Referencia a la base de datos de Firebase
var db = firebase.database();

// Añadimos todas los juegos disponibles al selector
db.ref('juegos/').once('value', snap => {
    games_without_sort = snap.val();
    var games = snap.val().sort((a, b) => {
        return (a['titulo'] === b['titulo']) ? 0 : ((a['titulo'] < b['titulo']) ? 1 : -1);
    }).reverse();
    // console.log(games);
    for (game of games) {
        games_without_sort.forEach((data, index) => {
            if (data.titulo == game.titulo) {
                $('#select-game').append('<option id="game-' + index + '">' + game.titulo + '</option>');
                // console.log(game);
            }
        });
    }
});

var lista_juegos = document.getElementById('select-game');

lista_juegos.addEventListener('change', () => {
    var valor = lista_juegos.value;
    if (valor == '----') {
        $('#guide-name').attr('value', '');
    } else {
        $('#guide-name').attr('value', 'Guía de trofeos de ' + lista_juegos.value);
    }

    // Insertamos los trofeos
    var selected_id = $('#select-game option:selected').attr('id');

    document.getElementById('lista-trofeos').innerHTML = '';

    if (valor != '----') {
        id_juego = selected_id.substring(selected_id.indexOf('-') + 1);
        get_trophies(id_juego);
    } else {
        document.getElementById('lista-trofeos').innerHTML = `
        <div class="container jumbotron">
            <p class="lead text-center text-muted font-italic">Todavía no has seleccionado ningún juego</p>
        </div>
        `;
    }
});

var lista_trofeos = document.getElementById('lista-trofeos');

function get_trophies(id) {
    db.ref('trofeos/').once('value', snap => {
        let valores = snap.val();
        lista_trofeos.innerHTML = '';
        valores.forEach((trofeo, index) => {
            if (trofeo.id_juego == id) {
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
                $('#trofeo-'+index).append(`
                    <div class="container new-comment">
                        <p id="trofeo-`+index+`-boton" onClick="new_comment(`+index+`)">+ Añadir comentario</p>
                        <div id="trofeo-`+index+`-comentario" class="container pb-4 hide-object">
                            <textarea class="form-control" rows="5"></textarea>
                        </div>
                    </div> 
                `);
            }
        });
    });
}

function new_comment (id_trofeo) {

    if (document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML == '+ Añadir comentario') {
        document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML = '- Añadir comentario';

        $('#trofeo-' + id_trofeo + '-comentario textarea').val('');
        $('#trofeo-' + id_trofeo + '-comentario').removeClass('hide-object');

    } else {
        document.getElementById('trofeo-'+id_trofeo+'-boton').innerHTML = '+ Añadir comentario';
        $('#trofeo-' + id_trofeo + '-comentario').addClass('hide-object');
    }
}

function submitData() {
    // Obtenemos los datos

    // Trucos
    var trucos;
    if ($('#trucos-si').is(':checked')) {
        trucos = 1;
    } else if ($('#trucos-no').is(':checked')) {
        trucos = 0;
    } else {
        trucos = -1;
    }

    // Trofeos offline
    var trofeos_bronce_offline = $('#bronzeOffline').val();
    var trofeos_plata_offline = $('#silverOffline').val();
    var trofeos_oro_offline = $('#goldOffline').val();

    // Trofeos online
    var trofeos_bronce_online;
    var trofeos_plata_online;
    var trofeos_oro_online;
    if ($('#ch_no_online').is(':checked')) {
        trofeos_bronce_online = trofeos_plata_online = trofeos_oro_online = 0; 
    } else {
        trofeos_bronce_online = $('#bronzeOnline').val();
        trofeos_plata_online = $('#silverOnline').val();
        trofeos_oro_online = $('#goldOnline').val();
    }

    // Comentarios del autor
    var comentarios_autor = $('#comentarios-autor-guia').val();

    // Consola
    var consola = '...';

    // Nivel dificultad
    var nivel_dificultad = $('#dificultad-platino').val();
    
    // Duracion
    var duracion = $('#duracion-estimada-platino').val();

    // Dificultad trofeos
    var dificultad;
    if ($('#dif-si').is(':checked')) {
        dificultad = 1;
    } else if ($('#dif-no').is(':checked')) {
        dificultad = 0;
    } else {
        dificultad = -1;
    }

    // Minimo de partidas para el platino
    var minimo_partidas = $('#minimo-partidas').val();

    // Titulo de la guia
    var titulo = $('#guide-name').val();

    // Total trofeos
    var total_trofeos = $('#total-trofeos').val();

    // Trofeos perdibles
    var trofeos_perdibles = $('#trofeos-perdibles').val();

    // Datos de fecha actual
    var hoy = new Date();

    // Guardamos los datos de la guia
    db.ref('guias').once('value', snap => {
        var id_guia = snap.val().length;
        db.ref('usuarios').once('value', snap => {
            snap.val().forEach((usuario, index) => {
                if (usuario.email == userdata.email) {
                    // Añadimos a la base de datos
                    db.ref('guias/'+id_guia).set({
                        activar_trucos: trucos,
                        comentarios: comentarios_autor,
                        consola: consola,
                        dificultad: nivel_dificultad,
                        duracion: duracion,
                        fecha_creacion: hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear(),
                        hora_creacion: hoy.getHours()+':'+hoy.getMinutes(),
                        id_juego: id_juego,
                        id_usuario: index,
                        influye_dificultad: dificultad,
                        minimo_partidas: minimo_partidas,
                        offline: {
                            bronce: trofeos_bronce_offline,
                            plata: trofeos_plata_offline,
                            oro: trofeos_oro_offline
                        },
                        online: {
                            bronce: trofeos_bronce_online,
                            plata: trofeos_plata_online,
                            oro: trofeos_oro_online
                        },
                        titulo: titulo,
                        total_trofeos: total_trofeos,
                        trofeos_perdibles: trofeos_perdibles
                    });
                }
            });
        });

        db.ref('comentarios_trofeos').once('value', snap => {
            var sz = snap.val().length;
            for (trofeo of $('#lista-trofeos').children()) {
                var id = trofeo.getAttribute('id');

                id = id.substring(id.indexOf('-')+1);
                var coment = $('#trofeo-'+id+'-comentario').find('textarea').val();

                if (coment != '') {
                    db.ref('comentarios_trofeos/'+sz).set({
                        id_trofeo: id,
                        comentario: coment,
                        id_guia: id_guia
                    });
                    sz++;
                }
            }
        });
    });
    setTimeout(() => { window.location = 'guias.html' }, 1000);
}