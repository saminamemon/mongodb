
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');


const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = '8a5ff99127ff5b1eed031645eccfb8a6'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url)
    .then(response => response.json());

    if (weather_data.cod === '404') {
        location_not_found.style.display = 'flex';
        weather_body.style.display = 'none';
        return;
    }


        weather_body.style.display = 'flex';
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

   

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = 'cloud.png';
            break;
        case 'Clear':
            weather_img.src = 'clear.png';
            break;
        case 'Rain':
            weather_img.src = 'rain.png';
            break;
        case 'Mist':
            weather_img.src = 'mist.png';
            break;
        case 'Snow':
            weather_img.src = 'snow.png';
            break;
    }
}



searchBtn.addEventListener('click', () => {
  const city = inputBox.value;
  fetch('/api/Weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Weather data sent to server:', data);
      // Handle the response from the server if needed
    })
    .catch((error) => {
      console.error('Error sending data to server:', error);
    });
});