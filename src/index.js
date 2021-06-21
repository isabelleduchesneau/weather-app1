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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                  alt=""
                  width="45"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-maximum">18</span>°
                  <span class="weather-forecast-temperature-minimum">12</span>°
                </div>
              </div>`;
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
  console.log(response);
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

displayForecast();

// //Current location
// let currentLocation = document.querySelector("#current-location");
// currentLocation.addEventListener("click", geoLocation);

// function geoLocation(event) {
//   navigator.geolocation.getCurrentPosition(loadTemperature);
// }
// function loadTemperature(position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;

//   // Get info from API
//   getWeather(lat, lon);
// }

// function getWeather(lat, lon) {
//   // Build the API string
//   let units = "metric";
//   let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

//   // Get the info from API
//   axios.get(apiURL).then(handleWeather);
// }

// function handleWeather(response) {
//   let temperature = Math.round(response.data.main.temp);

//   let newTemp = document.querySelector("#new-temp");
//   newTemp.innerHTML = `${temperature}`;

//   let h1 = document.querySelector("h1");
//   h1.innerHTML = `${response.data.name}`;
//   console.log(response);
// }

//   let humidityElement = document.querySelector("#humidity");
//   humidityElement.innerHTML = response.data.main.humidity;
//   console.log(humidityElement);
// }
