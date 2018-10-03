class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.main = document.getElementById('w-main');
    this.desc = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.pressure = document.getElementById('w-pressure');
    this.windSpeed = document.getElementById('w-wind-speed');
    this.windDeg = document.getElementById('w-wind-deg');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.main.textContent = weather.weather[0].main;
    this.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    // Openweathermap sends temp in Kelvin by default, can change if desired
    const celsius = Math.floor((weather.main.temp - 273));
    const fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    this.temp.textContent = `${fahrenheit} °F (${celsius} °C)`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
    this.pressure.textContent = `Pressure: ${weather.main.pressure} hPa`;
    this.windSpeed.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
    this.windDeg.textContent = `Wind Direction: ${weather.wind.speed}°`;
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modal.classList.remove('show');
    modalBackdrop.classList.remove('show');
  }
}
