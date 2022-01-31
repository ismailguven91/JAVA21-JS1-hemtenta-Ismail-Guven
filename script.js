const KEY = "7a496c942c254d6d86dc7959eae22a91";
const days = 5;

const btn = document.querySelector("button");
const input = document.querySelector("input");

btn.innerText = "Sök";
btn.addEventListener("click", searchWeather);


const weatherDescription = document.getElementById("current-description");
const weatherWind = document.getElementById("current-wind");
const weatherHumidity = document.getElementById("current-humidity");
const weatherTemp = document.getElementById("current-temp");
const error = document.getElementById("error-message");
const weatherImage = document.getElementById("current-weather-icon");



function searchWeather() {
  clearInput();
  const cityName = input.value;

  getWeather(cityName);
}

function getWeather(cityName) {
  const url = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${KEY}&include=minutely&lang=sv`;


  fetch(url)
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        showError(response.status);
        throw "Error: ";
      }
    })
    .then(function (data) {
      showWeather(data);
      return data;
    })
    .catch(function () {
      showError();
    });
}

function showWeather(watherNow) {
  console.log(watherNow);

  weatherDescription.innerText = `${watherNow.data[0].weather.description}`;
  weatherTemp.innerText = `Temperatur: ${Math.round(
    watherNow.data[0].temp
  )}`;
  weatherWind.innerText = `Vindhastighet: ${Math.round(
    watherNow.data[0].wind_spd
  )};`;
  weatherHumidity.innerText = `Luftfuktighet: ${Math.round(
    watherNow.data[0].rh
  )}`;

  const image = watherNow.data[0].weather.icon;
  weatherImage.src = `https://www.weatherbit.io/static/img/icons/${image}.png`;


}

function clearInput() {
  error.innerText = "";
}

function showError() {
  error.innerText = "The city was not found. Please try something else.";
}
