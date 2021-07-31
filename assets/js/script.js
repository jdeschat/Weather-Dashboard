let cityName;
let saveHistory = [];

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
    $('.fiveDayForecast').empty();
    for (let i = 0; i < 5; i++) {
        var day = $("<div class='day'><div/>")
        console.log(fiveDayForecast);

        // var myDate = new Date(response.list[i * 8].dt * 1000);
        // newCard.append($("<h4>").html(myDate.toLocaleDateString()));
        // var iconCode = response.list[i * 8].weather[0].icon;
        // var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // newCard.append($("<img>").attr("src", iconURL));


        // converts K and removes decimals using Math.round
        $(day).append("<p>Temp: " + data.daily[i].temp.day + " K</p>");
        $(day).append("<p>Wind: " + data.daily[i].wind_speed + "MPH</p>");
        $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
        $('.fiveDayForecast').append(day)

    };
}








// save to local storage
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("saveHistory"));
    if (storedCities !== null) {
        saveHistory = storedCities;
    };
    // lists up to 10 locations
    for (i = 0; i < saveHistory.length; i++) {
        if (i == 10) {
            break;
        }
        //  creates links/buttons
        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        // appends history as a button below the search field
        cityListButton.text(saveHistory[i]);
        $(".list-group").append(cityListButton);
    }
};

// searches and adds to history(event)
$("#searchCity").click(function () {
    cityName = $("#city").val().trim();
    getData();
    var checkArray = saveHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        saveHistory.push(cityName);
        localStorage.setItem("saveHistory", JSON.stringify(saveHistory));
        var cityListButton = $("<a>").attr({
            // list-group-item-action keeps the search history buttons consistent
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityListButton.text(cityName);
        $(".list-group").append(cityListButton);
    };
});
// listens for action on the history buttons(event)
$(".list-group-item").click(function () {
    city = $(this).text();
    getData();
});