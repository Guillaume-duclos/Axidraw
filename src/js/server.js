const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());

// Création de l'API
app.get('/api', function (req, res) {
    request('https://www.calendrier-365.fr/lune/calendrier-lunaire.html', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let moonDatas = [];
            $('.img-responsive').each((i, element) => {
                // Récupération de la date actuelle
                let date = new Date();
                let day = date.getDate();

                // Récupération de la liste des lunes
                let value = element.attribs.title;
                let imgValue = element.attribs.src;

                // Récupération de la valeur en pourcentage de la visibilité de la lune
                if(i === day - 1) {
                    let strValue;
                    let moonDirection;

                    // Vérification du sens des phases de la Lune <- ou ->
                    if(imgValue.indexOf('-') > -1) {
                        moonDirection = 'right';
                    } else {
                        moonDirection = 'left';
                    }

                    if(value.includes("Pleine lune") === true) {
                        value = "100";
                        strValue = value;
                    } else if(value.includes("Dernier quartier") === true) {
                        value = "50";
                        strValue = value;
                    } else if(value.includes("Nouvelle lune") === true) {
                        value = "0";
                        strValue = value;
                    } else if(value.includes("Premier quartier") === true) {
                        value = "50";
                        strValue = value;
                    } else {
                        strValue = value.substr(0, 2);
                    }
                    moonDatas.push(strValue, moonDirection);
                }
            });
            res.send(moonDatas);
        }
    });
});

// On démarre le serveur sur le port 3000
app.listen(3000, () => {
    console.log('App is listen on port 3000!');
});