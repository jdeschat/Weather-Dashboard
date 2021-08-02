let cityName;
let saveHistory = [];
let storedCity = [];
// let storedCity = [JSON.parse(localStorage.getItem("City"))] || [];

var fetchWeather = function (cityName) {
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
            getCityInfo(data.city.coord.lat, data.city.coord.lon);
        })
        .catch(err => console.log(err));
};

// Search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
    cityName = $("#cityInput").val();
    fetchWeather(cityName);

    storedCity.push(cityName);

    for (let i = 0; i < storedCity.length; i++) {
        var addCityButtons = document.querySelector(".cityNames");
        addCityButtons.setAttribute("name", storedCity[i]);
        addCityButtons.textContent = storedCity[i];
        console.log(storedCity[i]);
        $(".cityNames").append(addCityButtons);
        // $(".cityNames").empty();
    }
    localStorage.setItem("City", JSON.stringify(storedCity));
})


// TODO: get the preset buttons to return weather information
var presetCityButtons = document.querySelectorAll(".cityNames");
presetCityButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        // console.log(document.querySelectorAll(".cityNames"));
        cityName = e.target.innerText;
        fetchWeather(cityName);
    });
});

// Create a function to get the date
let toDateTime = function (time) {
    let someDate = new Date();
    someDate.setTime(time * 1000);
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}
// toDateTime(1627725936);

// TODO: Create a container that contains the city, date, temp, wind, humidity and UV index
var getCityInfo = function (lat, lon) {
    let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=908d66bc443a59edcf38648405a06695' + '&units=metric'
    fetch(uvApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log(data);
            // Add the date using moment.js
            $('.cityDate').html(cityName + " (" + toDateTime(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
            $('.temperature').text("Temp: " + data.current.temp + " °C");
            $('.wind').text("Wind: " + data.current.wind_speed + " MPH");
            $('.humidity').text("Humidity: " + data.current.humidity + " %");
            // $('.uvIndex').html("UV Index: " + `<button class="btn btn-success" id="uvBtn">${data.current.uvi}</button>`);
            $('.uvIndex').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
            fiveDayForecast(data);
            console.log(uvApi);
            if (data.current.uvi <= 2) {
                $(".btnColor").attr("class", "btn btn-success");
            };
            if (data.current.uvi > 2 && data.current.uvi <= 5) {
                $(".btnColor").attr("class", "btn btn-warning");
            };
            if (data.current.uvi > 5) {
                $(".btnColor").attr("class", "btn btn-danger");
            };

        });
};

// TODO: Create a container with a 5-day forecast
var fiveDayForecast = function (data) {
    $('.fiveDayForecast').empty();
    for (let i = 1; i < 6; i++) {
        var day = $("<div class='day'><div />")
        // console.log(fiveDayForecast);
        $(day).append(toDateTime(data.daily[i].dt));
        $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
        $(day).append("<p>Temp: " + data.daily[i].temp.day + " °C</p>");
        $(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
        $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
        $('.fiveDayForecast').append(day)

    };
}
