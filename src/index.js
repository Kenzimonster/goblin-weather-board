//Functions
function formatTopDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let newDate = date.getDate();
  let year = date.getFullYear();
  return `${month} ${newDate}, ${year}`;
}

function formatDayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function changeInfo(response) {
  let now = new Date(response.data.time*1000);
  let currentTemp = Math.round(response.data.temperature.current);
  let newTemp = document.querySelector("#current-temperature-value");
  let newHumidity = document.querySelector("#current-city-humidity");  
 let newDescription = document.querySelector("#current-city-description");
 let newWindspeed = document.querySelector("#current-city-windspeed");
  let cityElement = document.querySelector("#current-city");
  let descriptionDayTime = document.querySelector("#day-time");
  let topDate = document.querySelector("#date-top");
  let conditionImage =document.querySelector("#current-temp-icon")
  newTemp.innerHTML = currentTemp;
  newHumidity.innerHTML = response.data.temperature.humidity;
  newWindspeed.innerHTML = response.data.wind.speed;
  newDescription.innerHTML = response.data.condition.description;
  conditionImage.innerHTML = `<img src="${response.data.condition.icon_url}" alt="condition image" class="currentTempIcon"/>`
  cityElement.innerHTML = response.data.city;
  descriptionDayTime.innerHTML = formatDayTime(now);
  topDate.innerHTML = formatTopDate(now);
  getForecast(response.data.city);
}

function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  citySearch(searchInput.value.toLowerCase().trim());
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"];
  return days[date.getDay()];
}

function getForecast(city){
  let apiKey = `3at0foeb77eba84a5c21cf21f38b13e9`;
  let apiLink =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiLink).then(displayForecast);
}

function citySearch(city) {
  let apiKey = `3at0foeb77eba84a5c21cf21f38b13e9`;
  let apiLink = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiLink).then(changeInfo);
}

//Calls and Interaction
let changeCity = document.querySelector("#city-search");
changeCity.addEventListener("submit", handleSearchSubmit);

citySearch("brisbane");
