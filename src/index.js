// Store API key in a separate file or environment variable
const apiKey = process.env.API_KEY;


const form = document.querySelector("#search-form");
const cityInputElement = document.querySelector("#city-input");
const celsiusLink = document.querySelector("#celsius-link");
const fahrenheitLink = document.querySelector("#fahrenheit-link");
const cityElement = document.querySelector("#city");
const iconElement = document.querySelector("#icon");
const temperatureElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const descriptionElement = document.querySelector("#description");
const dateElement = document.querySelector("#date");


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

async function search(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    const { name, weather, main, wind, dt } = response.data;
    cityElement.innerHTML = name;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${weather[0].icon}.png`);
    iconElement.setAttribute("alt", weather[0].description);
    temperatureElement.innerHTML = Math.round(main.temp);
    humidityElement.innerHTML = main.humidity;
    windElement.innerHTML = Math.round(wind.speed);
    descriptionElement.innerHTML = weather[0].description;
    dateElement.innerHTML = formatDate(dt * 1000);
    // Store the temperature in Celsius for use in the conversion functions
    celsiusTemperature = main.temp;
  } catch (error) {
   
    alert("An error occurred while fetching weather data. Please try again later.");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  const fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;
search("Lagos");


form.addEventListener("submit", handleSubmit);
celsiusLink.addEventListener("click", displayCelsiusTemperature);
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

