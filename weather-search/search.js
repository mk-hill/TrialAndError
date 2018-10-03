// Init Local Storage first
const storage = new Storage();
const weatherLocation = storage.getLocalData();

// Init weather/UI objects
const weather = new Weather(weatherLocation.city, weatherLocation.country);
const ui = new UI();


// Get stored location data

const getWeather = () => {
  weather.getData()
    .then(results => ui.paint(results))
    .catch(err => console.log(err));
};

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  weather.setLocation(city, country);
  storage.setLocalData(city, country);

  // Get and display weather
  getWeather();
  ui.closeModal();
});
