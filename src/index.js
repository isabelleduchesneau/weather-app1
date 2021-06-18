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
  console.log(response);
}
let form = document.querySelector("#search-form");
form.addEventListener("click", search);

//Current location
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", geoLocation);

function geoLocation(event) {
  navigator.geolocation.getCurrentPosition(loadTemperature);
}
function loadTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // Get info from API
  getWeather(lat, lon);
}

function getWeather(lat, lon) {
  // Build the API string
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  // Get the info from API
  axios.get(apiURL).then(handleWeather);
}

function handleWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let newTemp = document.querySelector("#new-temp");
  newTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}