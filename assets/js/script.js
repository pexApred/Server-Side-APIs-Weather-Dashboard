console.log("script running");

var cities = [];

var initListeners = function(){
    console.log("init listeners");

    $("new-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

        var newCity = $("#new-city").val();

        var newSearch = {
            city: newCity

        };

        addCity(newSearch)
    
    });
}

$(function(){
    console.log("init");
    initListeners();
    loadCities();
});