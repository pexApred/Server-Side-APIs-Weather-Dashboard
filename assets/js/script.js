var cities = JSON.parse(localStorage.getItem('search-history')) || [];
var addCity = function (city) {
    console.log("add city");
    var APIKey = "517b598cb370b4d60b6492926681f7ac";
    console.log(city);
    var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&limit=5&appid=" + APIKey;
    
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("fetched city", data);
            populateCityToday(data);
            populateForecast(data);
        });
    saveCity(city);
};

var saveCity = function (cityName) {
    var cityObject = {
        city: cityName
    };
    cities.unshift(cityObject);
    cities = cities.slice(0, 10);
    localStorage.setItem("cities", JSON.stringify(cities));
    updateCityList();
    // $("cities").click(function () {
    //     var index = $(this).attr("data-index");
    // })
};

var loadCities = function () {
    var savedCities = localStorage.getItem("cities");

    if (savedCities) {
        cities = JSON.parse(savedCities);
        updateCityList();
    }
};

var clearCities = function () {
    cities = [];
    localStorage.removeItem("cities");
    updateCityList();
};

var populateCityToday = function (APIResponse) {
    // console.log(APIResponse.city.name);
    document.getElementById('weather-today').innerHTML = '';
    document.getElementById('five-day').innerHTML = '';

    var resultsToday = {
        cityName: APIResponse.city.name,
        currentDate: APIResponse.list[0].dt_txt.split(" ")[0],
        weatherIcon: APIResponse.list[0].weather[0].icon,
        cityTemp: (APIResponse.list[0].main.temp - 273.15) * 1.8 + 32,
        cityWind: APIResponse.list[0].wind.speed,
        cityHumidity: APIResponse.list[0].main.humidity,
    };


    var cityNameEL = document.createElement("h2");
    var dateArray = resultsToday.currentDate.split("-");
    var firstItem = dateArray.shift();
    dateArray.push(firstItem);
    console.log(dateArray);
    cityNameEL.innerHTML = resultsToday.cityName + " (" + dateArray.join("/") + ") ";
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

var populateForecast = function (APIResponse) {
    // console.log(APIResponse.city.name);
    var forecastContainer = document.getElementById("five-day");
    var cityForecastTitle = document.createElement("h3");
    cityForecastTitle.textContent = "5-Day Forecast: "
    forecastContainer.appendChild(cityForecastTitle);
    

    for (var i = 2; i < APIResponse.list.length; i += 8) {
        var forecastDay = APIResponse.list[i];

        var forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        var forecastDate = document.createElement("h4");
        var dateArray = forecastDay.dt_txt.split(" ")[0].split("-");
        var firstItem = dateArray.shift();
        dateArray.push(firstItem);
        console.log(dateArray);
        forecastDate.textContent = " (" + dateArray.join("/") + ") ";
        // console.log(forecastDate.textContent);
        forecastItem.appendChild(forecastDate)

        var forecastIcon = document.createElement("img");
        forecastIcon.src = "https://openweathermap.org/img/w/" + forecastDay.weather[0].icon + ".png";
        forecastItem.appendChild(forecastIcon);

        var forecastTemp = document.createElement("p");
        forecastTemp.textContent = "Temp: " + ((forecastDay.main.temp - 273.15) * 1.8 + 32).toFixed(2) + "ºF";
        forecastItem.appendChild(forecastTemp);

        var forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + forecastDay.wind.speed + "MPH";
        forecastItem.appendChild(forecastWind);

        var forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + forecastDay.main.humidity + "%";
        forecastItem.appendChild(forecastHumidity);

        forecastContainer.appendChild(forecastItem);
    };

}

var updateCityList = function () {
    console.log("update city list", cities);
    var $cityList = $("#search-history");
    var citiesHtml = "";
    for (var i = 0; i < cities.length; i++) {
        citiesHtml += "<article class='cities' data-index='" + i + "'>";
        citiesHtml += "<button class='city'>" + cities[i].city + '</button>';
        citiesHtml += "</article>";
    };
    $cityList.html(citiesHtml);
    $('.city').click(function (){
        let city = this.innerText;
        addCity(city);
    });
    // document.getElementById("search-history").innerHTML = citiesHtml;
};



var initListeners = function () {
    // console.log("init listeners");

    $("#new-search").submit(function (event) {
        event.preventDefault();
        // console.log("submitted form");

    });

    $("#search-button").click(function(){
        let city = $("#new-city").val().trim() || "Raleigh";
        addCity(city);
    });

}

$(function () {
    // console.log("init");
    initListeners();
    loadCities();
});