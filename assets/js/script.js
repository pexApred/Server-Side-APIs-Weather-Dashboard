console.log("script running");

var cities = [];

var initListeners = function(){
    console.log("init listeners");
    
}

$(function(){
    console.log("init");
    initListeners();
    loadCities();
});