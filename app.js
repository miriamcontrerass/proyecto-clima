const api_key = "d7907d6dd36a031c2a417e487954540b";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=3532617&appid=${api_key}&units=metric&lang=es`;
    devolverDatos(url, res, req,"Atlacomulco de Fabela");
});
app.get("/lugar", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/lugar", function (req, res){
    const lugar = req.body.ciudad;
   // res.send("Lugar: "+ lugar);
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${api_key}&units=metric&lang=es`;
   devolverDatos(url, res, req, lugar);
});

function devolverDatos(url, res, req, lugar){
    https.get(url, function (response) {
        response.on("data", function (data) {
            //const lugar = `San Felipe del Progreso`;
            const datosClima = JSON.parse(data);
            const icono = datosClima.weather[0].icon;
            const temperatura = datosClima.main.temp;
            const descripcion = datosClima.weather[0].description;
            const imagenURL = `http://openweathermap.org/img/wn/${icono}@2x.png`;
            res.write(`<h1>Temperatura de ${lugar}: ${temperatura} grados C</h1>`);
            res.write(`<h3>Descripcion: ${descripcion}</h3>`);
            res.write(`<img src=${imagenURL}>`);
            res.write(`<h3>Victor y Carolina</h3>`);
            res.send();
        });
    });
} 

app.listen(3000, function(){
    console.log("Servidor corriendo el puerto 3000");
});