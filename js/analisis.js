var db = firebase.database();

var analisis = document.getElementById('lista_analisis');

db.ref('analisis').once('value', snap => {
    analisis.innerHTML = '';
    for (data of snap.val()) {
        analisis.innerHTML += `
        <div class="row body-analisis no-padding no-gutters justify-content-center">
            <div class="col-2 align-self-center">
                <img src="` + data.img + `" class="img-analisis no-gutters no-padding">
            </div>
            <div class="col-10 align-items-center">
                <div class="row no-gutters no-padding link-container">
                    <div class="col-10 align-items-center">
                        <div class="row no-gutters no-padding justify-content-center">
                            <a class="no-a" href="` + data.url + `">
                                <p class="no-padding no-gutters linktext-analisis">` + data.nombre + `</p>
                            </a>
                        </div>
                    </div>
                    <div class="col-2 align-items-start">
                        <div class="row box-analisis no-padding no-gutters justify-content-center">
                            <p class="pagina-analisis no-padding no-gutters">` + data.pagina + `</p>
                        </div>
                    </div>
                </div>
                <div class="row no-padding no-gutters">
                    <div class="col-6 align-items-center">
                        <div class="row justify-content-center valoraciones">
                            <p class="valoraciones-analisis valoracionesp-analisis">43% valoraciones positivas</p>
                        </div>
                    </div>
                    <div class="col-6 align-items-center">
                        <div class="row justify-content-center valoraciones">
                            <p class="valoraciones-analisis valoracionesn-analisis">57% valoraciones negativas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
});