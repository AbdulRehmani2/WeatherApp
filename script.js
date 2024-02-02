let input = document.querySelector('.search-input');
let result = document.querySelector('.search-results');
result.style.display = 'none';

input.addEventListener('keyup', (e) => {
    let value = e.target.value.toLowerCase();
    console.log(value);
    result.innerHTML = "";
    result.style.display = 'block';
    if(e.key == 'Enter')
    {
        input.value = "";
    }
    if(value == 'dublin')
    {
        let list = createList(cityData);
        // console.log(list)
        for(let i = 0; i < list.length; i++)
        {
            result.appendChild(list[i]); 
        }
    }
    else if(value == '')
    {
        result.style.display = 'none';
    }
    else
    {
        let error = createLi("Invalid city name. Please try again!", "search-error");        error.style.color = 'red';
        result.appendChild(error);
        document.querySelector('.weather-card').innerHTML = "";
        document.querySelector('.weather-card-container').innerHTML = "";
    }
    
})

result.addEventListener('click', (e) => {
    if(e.target.classList.contains('search-result'))
    {
        cityData.map(element => {
            if(element.name == e.target.innerText)
            {
                result.style.display = 'none';
                renderElement(element);
            }
        })
    }
})

function renderElement(element)
{
    let weatherInfo = createWeatherContainer(element.icon, element.temperature, element.weather);
    let weatherTitle = createWeatherTitle(element.name);
    let card1 = createWeatherCard('./assests/humidity.png', 'humidity', element.humidity);
    let card2 = createWeatherCard('./assests/temperature.png', 'temperature', element.temperature);
    let card3 = createWeatherCard('./assests/wind.png', 'wind', element.windspeed);
    let div = document.createElement('div');
    div.classList.add("weather-cards");
    document.querySelector('.weather-card').appendChild(weatherInfo);
    document.querySelector('.weather-card-container').appendChild(weatherTitle);
    div.appendChild(card1);
    div.appendChild(card2);
    div.appendChild(card3);
    document.querySelector('.weather-card-container').appendChild(div);
}

function createWeatherContainer(iconNumber, temp, weather)
{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('weather-info-container')
    let sprite = document.createElement('div');
    sprite.classList.add('sprite-container')
    let icon = document.createElement('div');
    icon.classList.add(iconNumber)
    icon.classList.add('icon')
    let tempInfo = document.createElement('div');
    tempInfo.classList.add('weather-temp-info');
    let tem = document.createElement('h2');
    tem.innerText = temp;
    let wthr = document.createElement('p');
    wthr.innerText = weather;
    tempInfo.appendChild(tem);
    tempInfo.appendChild(wthr);
    sprite.appendChild(icon);
    mainDiv.appendChild(sprite);
    mainDiv.appendChild(tempInfo);
    return mainDiv;
}

function createWeatherTitle(name)
{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('weather-location-info');
    let image = document.createElement('img');
    image.src = './assests/location.png';
    let title = document.createElement('h1');
    title.innerText = name;
    mainDiv.appendChild(image);
    mainDiv.appendChild(title);
    return mainDiv;
}

function createWeatherCard(image, value, item)
{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('weather-info-card');
    let img = document.createElement('img');
    img.src = image;
    let subDiv = document.createElement('div');
    let val = document.createElement('h3');
    val.innerText = value;
    let it = document.createElement('p');
    it.innerText = item;
    subDiv.appendChild(val);
    subDiv.appendChild(it);
    mainDiv.appendChild(img);
    mainDiv.appendChild(subDiv);
    return mainDiv;
}

let cityData = [{name:"Dublin, IE", temperature:'12°C', humidity:'85%', feelslike:'12°C', windspeed:'18km/h', weather:'clear', icon:'icon1'},
{name:"Dublin, California, US", temperature:'15°C', humidity:'83%', feelslike:'16°C', windspeed:'12km/h', weather:'clear', icon:'icon2'},
{name:"Dublin, Georgia, US", temperature:'10°C', humidity:'65%', feelslike:'9°C', windspeed:'15km/h', weather:'clear', icon:'icon3'},
{name:"Dublin, Texas, US", temperature:'12°C', humidity:'45%', feelslike:'11°C', windspeed:'21km/h', weather:'clear', icon:'icon4'},
{name:"Dublin, Ohio, US", temperature:'20°C', humidity:'75%', feelslike:'20°C', windspeed:'11km/h', weather:'clear', icon:'icon5'}
]

function createLi(cityName, className)
{
    let li = document.createElement('li');
    li.classList.add(className);
    li.innerHTML = cityName;
    return li;
}

function createList(cityData)
{
    let list = [];
    for(let i = 0; i < cityData.length; i++)
    {
        list.push(createLi(cityData[i].name, 'search-result')); 
    }
    // console.log(list);
    return list;
}