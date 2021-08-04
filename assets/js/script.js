let cityName;
let storedCity = JSON.parse(localStorage.getItem("City")) || [];

var fetchWeather = function (cityName) {
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
            getCityInfo(data.city.coord.lat, data.city.coord.lon);
        })
        .catch(err => console.log(err));
};

// Get the preset buttons to return weather information
function addWeatherEventListener() {
    var presetCityButtons = document.querySelectorAll(".cityNames");
    presetCityButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            cityName = e.target.innerText;
            fetchWeather(cityName);
        });
    });
}

// Search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
    cityName = $("#cityInput").val();
    fetchWeather(cityName);
    console.log(storedCity);
    storedCity.push(cityName);

    for (let i = 0; i < storedCity.length; i++) {
        var addCityButtons = document.createElement("button");
        addCityButtons.setAttribute("class", "cityNames");
        addCityButtons.textContent = storedCity[i];
        console.log(storedCity[i]);
        $("#presetCities").append(addCityButtons);
    }
    localStorage.setItem("City", JSON.stringify(storedCity));
    addWeatherEventListener();
})

// Create a function to get the date
let toDateTime = function (time) {
    let someDate = new Date();
    someDate.setTime(time * 1000);
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}

// Create a container that contains the city, date, temp, wind, humidity and UV index
var getCityInfo = function (lat, lon) {
    let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=908d66bc443a59edcf38648405a06695' + '&units=metric'
    fetch(uvApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('.cityDate').html(cityName + " (" + toDateTime(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
            $('.temperature').text("Temp: " + data.current.temp + " °C");
            $('.wind').text("Wind: " + data.current.wind_speed + " MPH");
            $('.humidity').text("Humidity: " + data.current.humidity + " %");
            $('.uvIndex').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
            fiveDayForecast(data);

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
        $(day).append(toDateTime(data.daily[i].dt));
        $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
        $(day).append("<p>Temp: " + data.daily[i].temp.day + " °C</p>");
        $(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
        $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
        $('.fiveDayForecast').append(day)

    };
}
