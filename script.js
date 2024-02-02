let input = document.querySelector('.search-input');
let result = document.querySelector('.search-results');

input.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase();
    if(value == 'dublin')
    {
        result.style.display = 'block';
    }
    else
    {
        result.style.display = 'none';
    }
})

input.addEventListener('keydown', (e) => {
    if(e.key == 'Enter')
    {
        input.value = "";
    }
})