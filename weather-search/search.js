// Init weather & UI objects
const weather = new Weather('Boston', 'US');
const ui = new UI();

// weather.setLocation('London', 'UK');

const getWeather = () => {
  weather.getData()
    .then(results => ui.paint(results))
    .catch(err => console.log(err));
};

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);