// Para deshabilitar los trofeos online en caso de que se active la checkbox
$('#ch_no_online').change(() => {
    $('.trofeo-online').attr('disabled', (index, attr) => {
        return !attr;
    });
});

var dif_platino = document.getElementById('dificultad-platino');
dif_platino.addEventListener('blur', event => {
    if(dif_platino.value) {
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

var juegos;

// Añadimos todas los juegos disponibles al selector
db.ref('juegos/').once('value', snap => {
    games_without_sort = snap.val();
    var games = snap.val().sort((a,b) => {
        return (a['titulo'] === b['titulo']) ? 0 : ((a['titulo'] < b['titulo']) ? 1 : -1);
    }).reverse();
    // console.log(games);
    for (game of games) {
        games_without_sort.forEach( (data, index) => {
            if (data.titulo == game.titulo) {
                $('#select-game').append('<option id="game-'+index+'">'+game.titulo+'</option>');
                // console.log(game);
            }
        });
    }
});

var lista_juegos = document.getElementById('select-game');

lista_juegos.addEventListener('change', () => {
    var valor = lista_juegos.value;
    if(valor == '----') {
        $('#guide-name').attr('value','');
    } else {
        $('#guide-name').attr('value', 'Guía de trofeos de '+lista_juegos.value);
    }

    // Insertamos los trofeos
    var selected_id = $('#select-game option:selected').attr('id');
    var id_juego = selected_id.substring(selected_id.indexOf('-')+1);

    get_trophies(id_juego);

});

function get_trophies (id) {
    db.ref('trofeos/').once('value', snap => {
        let valores = snap.val();
        valores.forEach ( (trofeo, index) => {
            if (trofeo.id_juego == id) {
                if (trofeo.tipo == '0') {
                    lista_trofeos.innerHTML += `
                        <div id="trofeo-`+index+`" class="trofeo trofeo-platino row justify-content-around m-sm-1 ml-3 mb-3">
                            <div class="container-fluid no-gutters col-sm-1">
                                <div class="trofeo-ico">
                                    <img src="img/trophies/trofeo_platino.png" style="width:84px; height:84px;" alt="trofeo platino">
                                </div>
                            </div>
                            <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                                <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                            </div>
                            <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                                <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                            </div>
                        </div>
                    `
                } else if (trofeo.tipo == '1') {
                    lista_trofeos.innerHTML += `
                    <div id="trofeo-`+index+`" class="trofeo trofeo-bronce row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_bronce.png" style="width:84px; height:84px;" alt="trofeo bronce">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                } else if (trofeo.tipo == '2') {
                    lista_trofeos.innerHTML += `
                    <div id="trofeo-`+index+`" class="trofeo trofeo-plata row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_plata.png" style="width:84px; height:84px;" alt="trofeo plata">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                } else {
                    lista_trofeos.innerHTML += `
                    <div id="trofeo-`+index+`" class="trofeo trofeo-oro row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_oro.png" style="width:84px; height:84px;" alt="trofeo oro">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                }
            }
        });
    });
}

$('.new-comment p').on('click', (event) => {
    if (event.target.innerHTML == '+ Añadir comentario') {
        event.target.innerHTML = '- Añadir comentario';
        // event.target.parentNode.lastChild().classList.remove('hide-object');
        console.log($('this').siblings('div').hasClass('hide-object'));
    } else {
        event.target.innerHTML = '+ Añadir comentario';
    }
});