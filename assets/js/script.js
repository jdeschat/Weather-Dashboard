let cityName;

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
            console.log(data)
            getCityInfo(data.city.coord.lat, data.city.coord.lon);
        })
        .catch(err => console.log(err));
};

// Search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
    // console.log("search button clicked");
    cityName = $("#cityInput").val();
    fetchWeather(cityName);

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

// TODO: Create a container that contains the city, date, temp, wind, humidity and UV index
var getCityInfo = function (lat, lon) {
    let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=908d66bc443a59edcf38648405a06695'
    fetch(uvApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            // Add the date using moment.js
            $('.cityDate').text(cityName); // in the city variable
            $('.temperature').text("Temp: " + data.current.temp + " K");
            $('.wind').text("Wind: " + data.current.wind_speed + "MPH");
            $('.humidity').text("Humidity: " + data.current.humidity + " %");
            $('.uvIndex').text("UV Index: " + data.current.uvi);
            fiveDayForecast(data);
        });
};

// TODO: Create a container with a 5-day forecast
var fiveDayForecast = function (data) {
    for (let i = 0; i < 5; i++) {
        console.log(fiveDayForecast);
        $('.fiveDayForecast').append(fiveDayForecast[i]);
        $('.dailyForecast').append("Temp: " + data.daily[i].temp + " K");
        $('.dailyForecast').append("Wind: " + data.daily[i].wind_speed + "MPH");
        $('.dailyForecast').append("Humidity: " + data.daily[i].humidity + " %");
        fiveDayForecast = "";

    };
}


// save to local storage
// localStorage.setItem("cityName", JSON.stringify());