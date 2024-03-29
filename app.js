const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apikey = "c13edfdafa16c33df4568b24f3b853";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey + "ad&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function (data){
            const weatherData = JSON.parse(data); 
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
            res.write("<p>The weather is currently "  + weatherDescription + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running at port 3000");
});

