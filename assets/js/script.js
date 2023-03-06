console.log("script running");

var cities = [];

var addCity = function() {
    console.log("add city");
    var APIKey = "517b598cb370b4d60b6492926681f7ac";
    
    var city = $("#new-city").val();
    console.log(city);

    var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&limit=5&appid="+APIKey;
    // var cityDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;

    fetch(cityUrl)
        .then( function(response) {
            return response.json();
        })
        .then( function(data) {
            console.log("fetched city", data);

            populateCityToday(data);
            // updateForm(data.city);
        });

    
};

var populateCityToday = function(APIResponse){
    console.log(APIResponse.city.name);
    
    var resultsToday = {
        cityName: APIResponse.city.name,
        currentDate: APIResponse.list[0].dt_txt.split(" ")[0],
        cityTemp: APIResponse.list[0].main.temp,
        cityWind: APIResponse.list[0].wind.speed,
        cityHumidity: APIResponse.list[0].main.humidity,
    };

   var cityNameEL = document.createElement("h2");
   cityNameEL.innerHTML = resultsToday.cityName +" "+ resultsToday.currentDate.split("-").reverse().join("/");
   document.getElementById("weather-today").appendChild(cityNameEL);

   var cityTempEL = document.createElement("p");
   cityTempEL.innerHTML = "Temp: " + resultsToday.cityTemp;
   document.getElementById("weather-today").appendChild(cityTempEL);

   var cityWindEL = document.createElement("p");
   cityWindEL.innerHTML = "Wind: " + resultsToday.cityWind;
   document.getElementById("weather-today").appendChild(cityWindEL);

   var cityHumidityEL = document.createElement("p");
   cityHumidityEL.innerHTML = "Humidity: " + resultsToday.cityHumidity;
   document.getElementById("weather-today").appendChild(cityHumidityEL);


}

// Create button to append 
// var searchHistory = function(city){
//     console.log("update form:"+city+" ... ")
//     $("#new-city").val();
// };

var updateCityList = function(){
    console.log("update city list");

    var citiesHtml = "";
    for (var i=0;i<cities.length; i++) {
        citiesHtml += "<article class='cities' data-index='"+i+"'>";
        citiesHtml += "<p class='city'>"+cities[i].city+'</p>';
    };
}

var initListeners = function(){
    console.log("init listeners");

    $("#new-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");
    
    });

    $("#search-button").click(addCity);
}

$(function(){
    console.log("init");
    initListeners();
    // loadCities();
});