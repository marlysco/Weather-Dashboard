var weatherApiLink;
var API_KEY="62cebcf9638adc42b53ad6cc0d111fe5"
var userCity;
var recenCities=[]
var day1;


//Listening the search button 
$("#search-form").on("submit", function(event){
    event.preventDefault();
    if (!$("#cityInput").val()){
        $("#city").text("Please enter a name of a city")
    }
    else {
    var userCity=$("#cityInput").val();
    console.log(userCity);
    var weatherApiLink="http://api.openweathermap.org/data/2.5/weather?q="+userCity+"&units=imperial"+"&appid="+API_KEY;
    console.log(weatherApiLink);
//Fectching the API link with the value of the city
    fetch(weatherApiLink)
    .then(function (response) {
    if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
    console.log(data);
//Getting the parameters to show the info
    $("#city-name").text(userCity)
    $("#temperature").text("Temperature [F]: " + data.main.temp)
    $("#humidity").text("Humidity " + data.main.humidity)
    $("#uv").text("UV Index: " + data.main.uvi)
    $("#wind").text("Wind Speed:: " + data.wind.speed)       
            });
          } 
          else {
            $("#city-name").text("Please enter a valid city name")
          }
        })
    //Save the recent searched cities in the local memory
    recenCities.push(userCity)
    localStorage.setItem("cities", JSON.stringify(recenCities));
    console.log(recenCities);
    localStorage.getItem("cities")
    //Adding the recent searched cties dinamically to the left bar
    var addCity=$("<li>")
    addCity.text(userCity)
    addCity.appendTo("#recent-cities")   
    //Adding the 5 days forecast
    }
})

//Listener for the recent cities buttons
$("#recent-cities").on("click", "li",function(event){
    userCity = $(event.target).text();
    console.log(userCity); 
    var weatherApiLink="http://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid="+API_KEY;
    console.log(weatherApiLink);
    //Fectching the API link with the value of the city
    fetch(weatherApiLink)
    .then(function (response) {
    console.log(response);
    response.json().then(function (data) {
    console.log(data);
//Getting the parameters to show the info
    $("#city-name").text(userCity)
    $("#temperature").text("Temperature [K]: " + data.main.temp)
    $("#humidity").text("Humidity " + data.main.humidity)
    $("#uv").text("UV Index: " + "8.0")
    $("#wind").text("Wind Speed:: " + data.wind.speed)   
    });
})
})





