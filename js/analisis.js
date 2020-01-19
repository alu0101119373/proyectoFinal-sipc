var db = firebase.database();

var analisis = document.getElementById('lista_analisis');

db.ref('analisis').once('value', snap => {
    analisis.innerHTML = '';
    for (data of snap.val()) {
        analisis.innerHTML += `
        <a class="no-a" href="` + data.url + `">
        <div class="row body-analisis no-padding no-gutters justify-content-center">
            <!-- Imagen -->
            <div class="col-2 align-self-center hide-xs-object">
                <img src="` + data.img + `" class="img-analisis no-gutters no-padding" style="width:150px; height:150px;">
            </div>
            <div class="col-xl-10 align-items-center">
                <div class="row no-gutters no-padding link-container">
                    <div class="col-xl-2">
                        <div class="row box-analisis no-padding no-gutters justify-content-center">
                            <p class="pagina-analisis no-padding no-gutters">` + data.pagina + `</p>
                        </div>
                    </div>
                    <div class="col-xl-10 align-items-center">
                        <div class="row no-gutters no-padding justify-content-center">
                            
                                <p class="no-padding no-gutters linktext-analisis">` + data.nombre + `</p>
                            
                        </div>
                    </div>
                    <div class="container row no-padding no-gutters">
                        <div class="col-6 align-items-center">
                            <div class="row justify-content-center valoraciones">
                                <p class="valoraciones-analisis valoracionesp-analisis">43%<span class="hide-analisis-valorations"> valoraciones positivas</span></p>
                            </div>
                        </div>
                        <div class="col-6 align-items-center">
                            <div class="row justify-content-center valoraciones">
                                <p class="valoraciones-analisis valoracionesn-analisis">57%<span class="hide-analisis-valorations"> valoraciones negativas</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </a>
        `
    }
});