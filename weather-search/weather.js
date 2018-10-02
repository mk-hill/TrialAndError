class Weather {
  constructor(city, country) {
    this.apiKey = '< insert api key >';
    this.city = city;
    this.country = country;
  }

  async getData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apiKey}`);

    const responseData = await response.json();
    return responseData;
  }

  setLocation(city, country) {
    this.city = city;
    this.country = country;
  }
}
