const input = document.querySelector('.search-input');
const result = document.querySelector('.search-results');
const weather = document.querySelector('.weather-card')
const weatherInfo = document.querySelector('.weather-card-container')

const myAPIkey = "4201aad943feb7c50d1cb5ad0de0ca52";

result.classList.add('hide');
hideWeather();

input.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    // result.innerHTML = "";
    // result.classList.remove('hide');
    // if(e.key == 'Enter')
    // {
    //     searchData();
    // }
    // if(value == '')
    // {
    //     result.classList.add('hide');
    // }
    if(value == "")
    {
        clearChildren();
        return;
    }
    if(e.key == 'Enter')
    {
        parsedData = [];
        result.classList.remove('hide');
        let coordData = getCoordinates(value,  createList);
    }
});

function showError()
{
    const error = createLi("Invalid city name. Please try again!", "search-error");        
    error.classList.add('error');
    hideWeather();
    result.appendChild(error);
}

// async function searchData()
// {
//     const cityName = input.value;
//     let data = await getCoordinates(cityName);
//     let list = createList(data);
//     input.value = "";
//     clearChildren();
//     if(result.childNodes.length == 0)
//     {
//         const error = createLi("Invalid city name. Please try again!", "search-error");        
//         error.classList.add('error');
//         hideWeather();
//         result.appendChild(error);
//     } 
// }

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
        return cities;
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
        console.log(element);
        getWeather(element);
    }
})

// function getWeather(element)
// {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lon}&appid=${myAPIkey}`
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(element, data.main.feelslike, data.main.temp, data.main.humidity, data.main.);
//     })
// }

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
    temp.innerText = element.temperature;

    const status = document.querySelector('.weather-temp-info>p');
    status.innerText = element.weather;

    const img = document.querySelector('.weather-location-info>img');
    img.src = './assets/location.png';

    const title = document.querySelector('.weather-location-info>h1');
    title.innerText = element.name;

    const div = document.querySelector('.weather-cards');

    const humidityCard = createWeatherCard('./assets/humidity.png', 'humidity', element.humidity);
    div.appendChild(humidityCard);

    const temperatureCard = createWeatherCard('./assets/temperature.png', 'temperature', element.temperature);
    div.appendChild(temperatureCard);
    
    const windCard = createWeatherCard('./assets/wind.png', 'wind', element.windspeed);
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

const cityData = [{name:"Dublin, IE", temperature:'12°C', humidity:'85%', feelslike:'12°C', windspeed:'18km/h', weather:'clear', icon:'icon-clear-day'},
{name:"Dublin, California, US", temperature:'15°C', humidity:'83%', feelslike:'16°C', windspeed:'12km/h', weather:'clear', icon:'icon-rainy-day'},
{name:"Dublin, Georgia, US", temperature:'10°C', humidity:'65%', feelslike:'9°C', windspeed:'15km/h', weather:'clear', icon:'icon-clear-night'},
{name:"Dublin, Texas, US", temperature:'12°C', humidity:'45%', feelslike:'11°C', windspeed:'21km/h', weather:'clear', icon:'icon-rainy-night'},
{name:"Dublin, Ohio, US", temperature:'20°C', humidity:'75%', feelslike:'20°C', windspeed:'11km/h', weather:'clear', icon:'icon-cloudy'}
]

function createList(cityData)
{
    for(let i = 0; i < cityData.length & i < 5; i++)
    {
        result.appendChild(createLi(cityData[i].name, 'search-result')); 
    }
}