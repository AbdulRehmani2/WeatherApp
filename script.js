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
        console.log(list)
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
    }
    
})

let cityData = ["Dublin, IE", "Dublin, California, US", "Dublin, Georgia, US", "Dublin, Texas, US", "Dublin, Ohio, US"];

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
        list.push(createLi(cityData[i], 'search-result')); 
    }
    console.log(list);
    return list;
}