var db = firebase.database();

var guias = document.getElementById('lista_guias');

db.ref('guias').once('value', snap => {
    guias.innerHTML = '';
    for (data of snap.val()) {
        guias.innerHTML += `
        <a class="no-a" href="#">
            <div class="row body-analisis no-padding no-gutters justify-content-start">
                <div class="col-2 align-self-center">
                    <img src="` + data.url + `" class="img-analisis no-gutters no-padding">
                </div>
                <div class="col-10 align-items-center">
                    <div class="row no-gutters no-padding link-container">
                        <div class="col-10 align-items-center">
                            <div class="row no-gutters no-padding justify-content-start">
                                <p class="no-padding no-gutters linktext-analisis">` + data.titulo + `</p>
                            </div>
                        </div>
                        <div class="col-2 align-items-start">
                            <div class="row box-analisis no-padding no-gutters justify-content-center">
                                <p class="pagina-analisis no-padding no-gutters">` + data.consola + `</p>
                            </div>
                        </div>
                    </div>
                    <div class="row no-padding no-gutters justify-content-start">
                        <p class="linktext-analisis">` + data.total_trofeos + ` trofeos</p>
                    </div>
                </div>
            </div>
        </a>
        `
    }
});