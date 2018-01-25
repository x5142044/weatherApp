var APPID = "06934f16362357dbd8a8448515897953";
var temp;
var feels;
var wind;
var humidity;
var night;
var pressure;
var description;
var icon;

function updateByCity(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city +
        "&APPID=" + APPID;


    sendRequest(url);

}

//function updateByZip(zip){
//    var url = "http://api.openweathermap.org/data/2.5/weather?" +
//	"zip=" + zip +
//	"&APPID=" + APPID;
//    
//    sendRequest(url);
//    
//}


function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed * 3.6 + " km/h";
            weather.temp = data.main.temp;
            weather.pressure = data.main.pressure + " hPa";
            weather.night = data.main.temp_min - 273.15;
            weather.feels = Math.round(data.main.temp - 273.15 - data.wind.speed);

            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;

            update(weather);

        }

    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {


    icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    temp.innerHTML = weather.temp;
    feels.innerHTML = weather.feels;
    wind.innerHTML = weather.wind;
    humidity.innerHTML = weather.humidity;
    night.innerHTML = weather.night;
    pressure.innerHTML = weather.pressure;
    description.innerHTML = weather.description;


}

function getCity() {
    var enteredCity = document.getElementById("enteredCity").value;
    updateByCity(enteredCity);


}

window.onload = function () {
    temp = document.getElementById("temp");
    feels = document.getElementById("feels");
    wind = document.getElementById("wind");
    humidity = document.getElementById("humidity");
    night = document.getElementById("night");
    pressure = document.getElementById("pressure");
    description = document.getElementById("description");
    icon = document.getElementById("icon");
    //    var weather = {};
    //    weather.wind = 6;
    //    weather.feels = 3;
    //    weather.humidity = "33%";
    //    weather.night = -1;
    //    weather.presure = "1000pa";
    //
    //    update(weather);
    updateByCity("toronto");
    //    
    //    updateByZip(10010);
}
