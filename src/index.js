function formatDate(timestamp) {
  let date = new Date(timestamp)
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
  
function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");

    cityElement.innerHTML = response.data.name;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`); 
    iconElement.setAttribute("alt" , response.data.weather[0].description);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

}

function search(city) {
  let apiKey = "9059385bd64583ed2218072dfccd53f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9 /5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}


function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click" , displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click" , displayCelsiusTemperature);

search("Lagos");
