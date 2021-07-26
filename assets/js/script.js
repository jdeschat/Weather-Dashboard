// Search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
    console.log("search button clicked");
    let cityName = $("#cityInput").val();
    // console.log(cityName);
    let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=908d66bc443a59edcf38648405a06695";
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== "200") {
                console.log("City not found. Please try again");
                return;
            }
            // Use 'querySelector' to get the ID of where the Search for a City will be displayed
            var responseContainerEl = document.querySelector("#response-container");
            console.log(data)
        })
        .catch(err => console.log(err));
})

// TODO: get the preset buttons to return weather information
var presetCityButtons = document.querySelector(".cityNames");
presetCityButtons.addEventListener("click", function (e) {

    let cityName = e.target.innerText;
    // console.log(cityName);
    let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=908d66bc443a59edcf38648405a06695";
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== "200") {
                console.log("City not found. Please try again");
                return;
            }
            // Use 'querySelector' to get the ID of where the Search for a City will be displayed
            var responseContainerEl = document.querySelector("#response-container");
            console.log(data)
        })
        .catch(err => console.log(err));

});

// TODO: Create a container that contains the city, date, temp, wind, humidity and UV index
var jsonData;

$(document).ready(function () {
    $.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=&appid=908d66bc443a59edcf38648405a06695', function (data) {
        jsonData = data;
        $('.cityDate').text(jsonData.name);
        // etc
    });
});

// TODO: Create a container with a 5-day forecast
