import scss from '@css/style.scss';
import canvasToSVG from 'canvas2svg';

// Récupération des données de l'API

const monCb = (err, data) => {

    // Calcule du pourcentage visible de la lune
    getDatas();

    // Rotation du canvas en fonction du sens des phases de la Lune
    if(data[1] == 'left') {
        document.querySelector('canvas').style.transform = 'rotate(180deg)';
    }

    // Récupération des valeurs des sliders
    let slider1 = document.getElementById('slider_1');
    slider1.setAttribute("value", data[0]);

    slider1.addEventListener('input', getSlider1Value);

    document.getElementById('label1').innerHTML = 'Phase : ' + slider1.value + '%';

    createMoon(data[0]);

    function getSlider1Value() {
        document.getElementById('label1').innerHTML = 'Phase : ' + slider1.value + '%';
        createMoon(this.value);
    }

    // Boutton reset
    document.getElementById('resetButton').addEventListener('click', reset);
    function reset() { window.location.reload(); }

    function createMoon(slider1Value) {
        let visibility;

        if(slider1Value) {
            visibility = "0." + slider1Value;
        } else {
            visibility = "0." + data;
        }

        if(slider1Value == 100) {
            visibility = 1
        } else if(slider1Value < 10) {
            visibility = "0.0" + slider1Value;
        }

        // Création de la Lune
        const canvas = document.querySelector('canvas');
        let ctxCanvas = canvas.getContext('2d');
        let ctxSvg = canvas.getContext('2d');

        let canvasWidth = window.innerWidth * 0.8;

        canvas.width = canvasWidth;
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

            drawLineForCanvas(60);
            drawQuarterForCanvas(180);
        }

        function drawMoonForSvg(ctxSvg) {
            ctxSvg.beginPath();
            ctxSvg.moveTo((canvas.width / 2) - (moonDiameter / 2), canvas.height / 2);
            ctxSvg.lineTo((canvas.width / 2) + (moonDiameter / 2), canvas.height / 2);
            ctxSvg.stroke();

            drawLineForSvg(60);
            drawQuarterForSvg(180);
        }

        function drawLineForCanvas(nombre) {
            let nb = nombre;

            // Calcule de la distance vertical entre chaque trait
            let distTop = moonRadius / nb;
            const constanteDistTop = moonRadius / nb;

            let distBottom = -moonRadius / nb;
            const constanteDistBottom = -moonRadius / nb;

            for (let i = 0; i < nb; i++) {
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

            for (let i = 0; i < nb; i++) {
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
            let nb = nombre;

            // Calcule de la distance vertical entre chaque trait
            let distTop = moonRadius / nb;
            const constanteDistTop = moonRadius / nb;

            let distBottom = -moonRadius / nb;
            const constanteDistBottom = -moonRadius / nb;

            for (let i = 0; i < nb; i++) {
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

            for (let i = 0; i < nb; i++) {
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

            let distBottom = -moonRadius / nb;
            const constanteDistBottom = -moonRadius / nb;

            for (let i = 0; i < nb; i++) {
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

            for (let i = 0; i < nb; i++) {
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

            // Calcule de la distance vertical entre chaque trait
            let distTop = moonRadius / nb;
            const constanteDistTop = moonRadius / nb;

            let distBottom = -moonRadius / nb;
            const constanteDistBottom = -moonRadius / nb;

            for (let i = 0; i < nb; i++) {
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

            for (let i = 0; i < nb; i++) {
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

        // Rendu final du SVG
        let renderSvg = ctxSvg.getSerializedSvg(true);
        console.log(renderSvg);
    }
};

getDatas(monCb);

function getDatas(monCb) {
    fetch("http://localhost:3000/api")
        .then(response => response.json())
        .then(response => {
            monCb(null, response);
        });
}