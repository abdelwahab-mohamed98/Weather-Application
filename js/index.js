// For Today Weather
let today = document.getElementById('today'),
todayDate = document.getElementById('todayDate'),
locationCity = document.getElementById('locationCity'),
todayDegree = document.getElementById('todayDegree'),
todayIcon = document.getElementById('todayIcon'),
humidty = document.getElementById('humidty'),
wind = document.getElementById('wind'),
compass = document.getElementById('compass'),
todayDescription = document.getElementById('todayDescription'),
apiResponse,
responseData,
currentCity = 'Cairo',
searchBox = document.getElementById('searchBox'),
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// For Next Day Weather
let nextDay = document.getElementsByClassName('next-day'),
nextDayIcon = document.getElementsByClassName('next-day-icon'),
nextDayMax = document.getElementsByClassName('next-day-max-degree'),
nextDayMin = document.getElementsByClassName('next-day-min-degree'),
nextDayDesc = document.getElementsByClassName('next-day-description');

//Get API Response
async function getWeatherData(currentCity) {
  apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4baf8cd7b7e04683947121056222610&q=${currentCity}&days=3`);
  responseData = await apiResponse.json();
  getWeatherTodayData();
  getNextDayWeatherData();
}

getWeatherData('Cairo');

let date = new Date;
function getWeatherTodayData() {
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML =  `${date.getDate()}  ${monthName[date.getMonth()]}`;
  locationCity.innerHTML = responseData.location.name;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute('src', `https:${responseData.current.condition.icon}`);
  todayDescription.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
}

function getNextDayWeatherData(){
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
    nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    nextDayMax[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
    nextDayMin[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDesc[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
  }
}


searchBox.addEventListener('input', function(){
  currentCity = searchBox.value;
  console.log(currentCity);
  getWeatherData(currentCity)
})