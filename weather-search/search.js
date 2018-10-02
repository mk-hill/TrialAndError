// Init weather object
const weather = new Weather('Boston', 'US');

// weather.setLocation('London', 'UK');

const getWeather = () => {
  weather.getData()
    .then(results => console.log(results))
    .catch(err => console.log(err));
};

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);