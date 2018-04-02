const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

var express = require('express');
var app = express();

app.use(cors());

app.get('/api', function (req, res) {
    request('https://www.calendrier-365.fr/lune/calendrier-lunaire.html', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let moonData;
            $('.img-responsive').each((i, element) => {
                // Récupération de la date actuelle
                let date = new Date();
                let day = date.getDate();

                // Récupération de la liste des lunes
                let value = element.attribs.title;

                // Récupération de la valeur en pourcentage de la visibilité de la lune
                if(i === day - 1) {
                    console.log(value);
                    if(value.includes("Pleine lune") === true) {
                        value = "100";
                        strValue = value;
                        //console.log(strValue);
                    } else if(value.includes("Dernier quartier") === true) {
                        value = "55";
                        strValue = value;
                        //console.log(strValue);
                    } else if(value.includes("Nouvelle lune") === true) {
                        value = "2";
                        strValue = value;
                        //console.log(strValue);
                    } else if(value.includes("Premier quartier") === true) {
                        value = "98";
                        strValue = value;
                        //console.log(strValue);
                    } else {
                        strValue = value.substr(0, 2);
                        //console.log(strValue);
                    }
                    console.log("valeur finale : " + strValue);
                    moonData = strValue;
                }
            });
            res.send(moonData);
        }
    });
});

// On démarre le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});