const input = document.querySelector('.search-input');
const result = document.querySelector('.search-results');
const weather = document.querySelector('.weather-card')
const weatherInfo = document.querySelector('.weather-card-container')

const myAPIkey = "4201aad943feb7c50d1cb5ad0de0ca52";

result.classList.add('hide');
hideWeather();

input.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    if(value == "")
    {
        clearChildren();
        return;
    }
    if(e.key == 'Enter')
    {
        parsedData = [];
        hideWeather();
        result.classList.remove('hide');
        getCoordinates(value,  createList);
    }
});

function showError()
{
    const error = createLi("Invalid city name. Please try again!", "search-error");        
    error.classList.add('error');
    hideWeather();
    result.appendChild(error);
}

function clearChildren()
{
    while(result.firstChild)
    {
        result.removeChild(result.firstChild);
    }
}

function getCoordinates(cityName, callback)
{
    clearChildren();
    if(cityName == "") return;
    const limit = 5;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${myAPIkey}`
    fetch(url).then(res => res.json()).then(data => {
        let cities = parseData(data);
        callback(cities);
        cities.length == 0 && showError();
    });
}

let parsedData = [];

function parseData(resultData)
{
    parsedData = [];
    resultData.map(i => {
        let name = `${i.name}, ${i.state}, ${i.country}`;
        name.includes('undefined') == false && parsedData.push({name:name, lat:i.lat, lon:i.lon});
    });
    return parsedData;
}

result.addEventListener('click', (e) => {
    if(e.target.classList.contains('search-result'))
    {
        let element = parsedData.filter((element) => element.name == e.target.innerText)[0];
        result.classList.add('hide');
        resetUI();
        getWeather(element);
    }
})

function getWeather(element)
{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lon}&units=metric&appid=${myAPIkey}`
    fetch(url).then(res => res.json()).then(data => {
        let weatherData = {temperature: data.main.temp, name: element.name, humidity:data.main.humidity, temperature:data.main.feels_like, windspeed:data.wind.speed, weather:data.weather[0].main, icon:icons[data.weather[0].icon]};
        loadElement(weatherData);
    })
}

function resetUI()
{
    document.querySelector('.weather-cards').innerHTML = '';
    document.querySelector('.sprite-container>div').classList = ['icon'];
}

function loadElement(element)
{
    showWeather();
    const icon = document.querySelector('.icon');
    icon.classList.add(element.icon);

    const temp = document.querySelector('.weather-temp-info>h2');
    temp.innerText = `${element.temperature}°C`;

    const status = document.querySelector('.weather-temp-info>p');
    status.innerText = element.weather;

    const img = document.querySelector('.weather-location-info>img');
    img.src = './assets/location.png';

    const title = document.querySelector('.weather-location-info>h1');
    title.innerText = element.name;

    const div = document.querySelector('.weather-cards');

    const humidityCard = createWeatherCard('./assets/humidity.png', 'Humidity', `${element.humidity}%`);
    div.appendChild(humidityCard);

    const temperatureCard = createWeatherCard('./assets/temperature.png', 'Feels Like', `${element.temperature}°C`);
    div.appendChild(temperatureCard);
    
    const windCard = createWeatherCard('./assets/wind.png', 'Wind', `${element.windspeed}m/s`);
    div.appendChild(windCard);
}

function showWeather()
{
    weather.classList.remove('hide');
    weatherInfo.classList.remove('hide');
}

function hideWeather()
{
    weather.classList.add('hide');
    weatherInfo.classList.add('hide');
}

function createWeatherCard(image, value, item)
{
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('weather-info-card');

    const img = document.createElement('img');
    img.src = image;

    const subDiv = document.createElement('div');

    const val = document.createElement('h3');
    val.innerText = value;

    const it = document.createElement('p');
    it.innerText = item;

    subDiv.appendChild(val);
    subDiv.appendChild(it);
    mainDiv.appendChild(img);
    mainDiv.appendChild(subDiv);

    return mainDiv;
}

function createLi(cityName, className)
{
    const li = document.createElement('li');
    li.classList.add(className);
    li.innerHTML = cityName;
    return li;
}

const icons = {'01d':'icon-clear-day', '01n':'icon-clear-night', '03d':'icon-cloudy', '03n':'icon-cloudy', '02d':'icon-cloudy', '02n':'icon-cloudy', '04d':'icon-cloudy', '04n':'icon-cloudy', '09d':'icon-rain', '09n':'icon-rain', '10d':'icon-rainy-day', '10n':'icon-rainy-night', '11d':'icon-thunderstorm', '11n':'icon-thunderstorm', '13d':'icon-snow', '13n':'icon-snow', '50d':'icon-mist', '50n':'icon-mist'}

function createList(cityData)
{
    for(let i = 0; i < cityData.length & i < 5; i++)
    {
        result.appendChild(createLi(cityData[i].name, 'search-result')); 
    }
}