// Cargamos la base de datos
var firebaseConfig = {
    apiKey: "AIzaSyD370dYi_BY6atxgza1OmIDSOXUoQRLxBE",
    authDomain: "trophie-games.firebaseapp.com",
    databaseURL: "https://trophie-games.firebaseio.com",
    projectId: "trophie-games",
    storageBucket: "trophie-games.appspot.com",
    messagingSenderId: "286202581827",
    appId: "1:286202581827:web:9898ef8d74a4caac9e55f6",
    measurementId: "G-GMV55YLF8P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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