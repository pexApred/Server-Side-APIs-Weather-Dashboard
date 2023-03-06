var cities = [];

var addCity = function() {
    // console.log("add city");
    var APIKey = "517b598cb370b4d60b6492926681f7ac";
    
    var city = $("#new-city").val();
    // console.log(city);

    var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&limit=5&appid="+APIKey;

    fetch(cityUrl)
        .then( function(response) {
            return response.json();
        })
        .then( function(data) {
            // console.log("fetched city", data);

            populateCityToday(data);
            populateForecast(data);
            // updateForm(data.city);
        });

    
};

var populateCityToday = function(APIResponse){
    // console.log(APIResponse.city.name);
    
    var resultsToday = {
        cityName: APIResponse.city.name,
        currentDate: APIResponse.list[0].dt_txt.split(" ")[0],
        weatherIcon: APIResponse.list[0].weather[0].icon,
        cityTemp: (APIResponse.list[0].main.temp - 273.15) * 1.8 + 32,
        cityWind: APIResponse.list[0].wind.speed,
        cityHumidity: APIResponse.list[0].main.humidity,
    };

   var cityNameEL = document.createElement("h2");
   cityNameEL.innerHTML = resultsToday.cityName +" ("+ resultsToday.currentDate.split("-").sort().join("/") + ") ";
   document.getElementById("weather-today").appendChild(cityNameEL);

   var weatherIconEl = document.createElement("img");
   weatherIconEl.src = "https://openweathermap.org/img/w/" + resultsToday.weatherIcon + ".png";
   cityNameEL.appendChild(weatherIconEl);

   var cityTempEL = document.createElement("p");
   cityTempEL.innerHTML = "Temp: " + resultsToday.cityTemp.toFixed(2) + "ºF";
   document.getElementById("weather-today").appendChild(cityTempEL);

   var cityWindEL = document.createElement("p");
   cityWindEL.innerHTML = "Wind: " + resultsToday.cityWind + " MPH";
   document.getElementById("weather-today").appendChild(cityWindEL);

   var cityHumidityEL = document.createElement("p");
   cityHumidityEL.innerHTML = "Humidity: " + resultsToday.cityHumidity + "%";
   document.getElementById("weather-today").appendChild(cityHumidityEL);
}

var populateForecast = function (APIResponse){
    console.log(APIResponse.city.name);
    var forecastContainer = document.getElementById("five-day");
    var cityForecastTitle = document.createElement("h3");
    cityForecastTitle.textContent = "5-Day Forecast: "
    forecastContainer.appendChild(cityForecastTitle);

    for (var i=0; i < APIResponse.list.length; i += 8) {
        var forecastDay = APIResponse.list[i];

        var forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        var forecastDate = document.createElement("h4");
        forecastDate.textContent = forecastDay.dt_txt.split(" ")[0].split("-").reverse().join("/");
        forecastItem.appendChild(forecastDate)

        var forecastIcon = document.createElement("img");
        forecastIcon.src = "https://openweathermap.org/img/w/" + resultsToday.weather[0].icon + ".png";


    }
    // document.getElementById("five-day").appendChild(forecastContainer);
}

var updateCityList = function(){
    console.log("update city list");

    var citiesHtml = "";
    for (var i=0;i<cities.length; i++) {
        citiesHtml += "<article class='cities' data-index='"+i+"'>";
        citiesHtml += "<p class='city'>"+cities[i].city+'</p>';
    };
}

var initListeners = function(){
    // console.log("init listeners");

    $("#new-search").submit(function(event){
        event.preventDefault();
        // console.log("submitted form");
    
    });

    $("#search-button").click(addCity);
}

$(function(){
    // console.log("init");
    initListeners();
    // loadCities();
});