import css from '@css/style.css';
import scss from '@css/style.scss';
import canvasToSVG from 'canvas2svg';
import datas from './datas';

// Récupération des données de l'API

const monCb = (err, data) => {

    // Calcule du pourcentage visible de la lune
    getDatas();
    console.log(data);

    createMoon();

    let visibility = "0." + data;
    console.log(visibility);

    // Création de la Lune
    const canvas = document.querySelector('canvas');
    let ctxCanvas = canvas.getContext('2d');
    let ctxSvg = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const moonDiameter = canvas.height - 100;
    const moonRadius = (canvas.height - 100) / 2;

    // Initialisation de la lune pour la création du SVG finale

    ctxSvg = new C2S(canvas.width, canvas.height);
    // Création du cercle de la lune

    drawMoonForCanvas(ctxCanvas);
    drawMoonForSvg(ctxSvg);

    function drawMoonForCanvas(ctxCanvas) {
        ctxCanvas.beginPath();
        ctxCanvas.moveTo((canvas.width / 2) - (moonDiameter / 2), canvas.height / 2);
        ctxCanvas.lineTo((canvas.width / 2) + (moonDiameter / 2), canvas.height / 2);
        ctxCanvas.stroke();

        drawLineForCanvas(40);
        drawQuarterForCanvas(120);
    }

    function drawMoonForSvg(ctxSvg) {
        ctxSvg.beginPath();
        ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2), canvas.height / 2);
        ctxSvg.lineTo((canvas.width / 2) + (moonDiameter / 2), canvas.height / 2);
        ctxSvg.stroke();

        drawLineForSvg(40);
        drawQuarterForSvg(80);
    }

    function drawLineForCanvas(nombre) {
        let nb = nombre;

        // Calcule de la distance vertical entre chaque trait
        let distTop = moonRadius / nb;
        const constanteDistTop = moonRadius / nb;

        let distBottom = - moonRadius / nb;
        const constanteDistBottom = - moonRadius / nb;

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distTop, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = (long * 2);
            let dif = (moonDiameter - long) / 2;

            // Création du nouveau trait
            ctxCanvas.beginPath();
            ctxCanvas.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distTop);
            ctxCanvas.lineTo((canvas.width / 2) + (moonDiameter / 2) - dif, (canvas.height / 2) - distTop);
            ctxCanvas.stroke();

            distTop = distTop + constanteDistTop;
        }

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distBottom, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = (long * 2);
            let dif = (moonDiameter - long) / 2;

            // Création du nouveau trait
            ctxCanvas.beginPath();
            ctxCanvas.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distBottom);
            ctxCanvas.lineTo((canvas.width / 2) + (moonDiameter / 2) - dif, (canvas.height / 2) - distBottom);
            ctxCanvas.stroke();

            distBottom = distBottom + constanteDistBottom;
        }
    }

    function drawQuarterForCanvas(nombre) {

        let quarterSize = moonDiameter / 4; // Pour avoir 25% de la longueur
        let nb = nombre;
        //console.log(quarterSize);

        // Calcule de la distance vertical entre chaque trait
        let distTop = moonRadius / nb;
        const constanteDistTop = moonRadius / nb;

        let distBottom = - moonRadius / nb;
        const constanteDistBottom = - moonRadius / nb;

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distTop, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = long * 2;
            let dif = (moonDiameter - long) / 2;

            let rr = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif));
            let quarterLineWidth = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif)) * visibility;

            // Création du nouveau trait
            ctxCanvas.beginPath();
            ctxCanvas.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distTop);
            ctxCanvas.lineTo(((canvas.width / 2) + (moonDiameter / 2) - dif) - quarterLineWidth, (canvas.height / 2) - distTop);
            ctxCanvas.stroke();

            distTop = distTop + constanteDistTop;
        }

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distBottom, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = long * 2;
            let dif = (moonDiameter - long) / 2;

            let rr = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif));
            let quarterLineWidth = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif)) * visibility;

            // Création du nouveau trait
            ctxCanvas.beginPath();
            ctxCanvas.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distBottom);
            ctxCanvas.lineTo(((canvas.width / 2) + (moonDiameter / 2) - dif) - quarterLineWidth, (canvas.height / 2) - distBottom);
            ctxCanvas.stroke();

            distBottom = distBottom + constanteDistBottom;
        }
    }

    function drawLineForSvg(nombre) {
        let nb = nombre;

        // Calcule de la distance vertical entre chaque trait
        let distTop = moonRadius / nb;
        const constanteDistTop = moonRadius / nb;

        let distBottom = - moonRadius / nb;
        const constanteDistBottom = - moonRadius / nb;

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distTop, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = (long * 2);
            let dif = (moonDiameter - long) / 2;

            // Création du nouveau trait
            ctxSvg.beginPath();
            ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distTop);
            ctxSvg.lineTo((canvas.width / 2) + (moonDiameter / 2) - dif, (canvas.height / 2) - distTop);
            ctxSvg.stroke();

            distTop = distTop + constanteDistTop;
        }

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distBottom, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = (long * 2);
            let dif = (moonDiameter - long) / 2;

            // Création du nouveau trait
            ctxSvg.beginPath();
            ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distBottom);
            ctxSvg.lineTo((canvas.width / 2) + (moonDiameter / 2) - dif, (canvas.height / 2) - distBottom);
            ctxSvg.stroke();

            distBottom = distBottom + constanteDistBottom;
        }
    }

    function drawQuarterForSvg(nombre) {

        let quarterSize = moonDiameter / 4; // Pour avoir 25% de la longueur
        let nb = nombre;
        //console.log(quarterSize);

        // Calcule de la distance vertical entre chaque trait
        let distTop = moonRadius / nb;
        const constanteDistTop = moonRadius / nb;

        let distBottom = - moonRadius / nb;
        const constanteDistBottom = - moonRadius / nb;

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distTop, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = long * 2;
            let dif = (moonDiameter - long) / 2;

            let rr = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif));
            let quarterLineWidth = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif)) * visibility;

            // Création du nouveau trait
            ctxSvg.beginPath();
            ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distTop);
            ctxSvg.lineTo(((canvas.width / 2) + (moonDiameter / 2) - dif) - quarterLineWidth, (canvas.height / 2) - distTop);
            ctxSvg.stroke();

            distTop = distTop + constanteDistTop;
        }

        for(let i = 0; i < nb; i++) {
            // Calcule de la longueur du nouveau trait
            let long = (Math.sqrt(Math.pow(moonRadius, 2) - Math.pow(distBottom, 2)));
            long = Math.floor(long);

            // Calcule de l'écart du nouveau trait
            long = long * 2;
            let dif = (moonDiameter - long) / 2;

            let rr = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif));
            let quarterLineWidth = (((canvas.width / 2) + (moonDiameter / 2) - dif) - ((canvas.width / 2) - (moonDiameter / 2) + dif)) * visibility;

            // Création du nouveau trait
            ctxSvg.beginPath();
            ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2) + dif, (canvas.height / 2) - distBottom);
            ctxSvg.lineTo(((canvas.width / 2) + (moonDiameter / 2) - dif) - quarterLineWidth, (canvas.height / 2) - distBottom);
            ctxSvg.stroke();

            distBottom = distBottom + constanteDistBottom;
        }
    }

    // Gestion du redimensionnement de la fenêtre
    window.onresize = function (event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawMoon(ctxCanvas);
    }

    let renderSvg = ctxSvg.getSerializedSvg(true);
    console.log(renderSvg);
};

function createMoon() {

}

getDatas(monCb);

function getDatas(cb) {
    fetch("http://localhost:3000/api")
        .then(response => response.json())
        .then(response => {
            cb(null, response);
        });
}