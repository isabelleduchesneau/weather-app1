let apiKey = "f02f21f7d023e39e664c3fb73a162034";

let now = new Date();
let dateNow = document.querySelector("#date-time");
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
dateNow.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  // let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="45"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-maximum">${Math.round(
                    forecastDay.temp.max
                  )}</span>°
                  <span class="weather-forecast-temperature-minimum">${Math.round(
                    forecastDay.temp.min
                  )}</span>°
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#new-city");
  let city = `${searchInput.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(getTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f02f21f7d023e39e664c3fb73a162034";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#new-temp");
  newTemp.innerHTML = `${temperature}`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#new-temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#new-temp");
  temperatureElement.innerHTML = celciusTemperature;
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("click", search);

let farenheitLink = document.querySelector("#farenheit-temperature");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-temperature");
celciusLink.addEventListener("click", displayCelciusTemperature);

// //Current location

function geoLocation(event) {
  event.preventDefault();
  let currentLocation = document.querySelector("#current-location");
  currentLocation.addEventListener("click", geoLocation);
}

function handleWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let newTemp = document.querySelector("#new-temp");
  newTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  console.log(response);
}
function loadTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  //   // Get info from API
  axios.get(apiURL).then(handleWeather);
}
navigator.geolocation.getCurrentPosition(loadTemperature);
//  getWeather(lat, lon);

// function getWeather(lat, lon) {
//   // Build the API string
//   let units = "metric";

// Get the info from API

// }
//   let humidityElement = document.querySelector("#humidity");
//   humidityElement.innerHTML = response.data.main.humidity;
//   console.log(humidityElement);
// }
