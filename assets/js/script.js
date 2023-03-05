console.log("script running");

var cities = [];



var getCity = function() {
    console.log("get city");
    var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={517b598cb370b4d60b6492926681f7ac}";
    fetch(cityUrl)
        .then( function(response) {
            return response.json();
        })
        .then( function(data) {
            console.log("fetched city", data);

            updateForm(data.city);
        });
};

var updateForm = function(city){
    console.log("update form:"+city+" ... ")
    $("#new-city").val(city);
};

var initListeners = function(){
    console.log("init listeners");

    $("#new-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

        var newCity = $("#new-city").val();

        var newSearch = {
            city: newCity

        };

        addCity(newSearch);
    
    });

    $("#search-button").click()
}

$(function(){
    console.log("init");
    initListeners();
    // loadCities();
});