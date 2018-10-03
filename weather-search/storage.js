class Storage {
  constructor() {
    this.city;
    this.country;
    this.DefaultCity = 'Boston';
    this.DefaultCountry = 'US';
  }

  getLocalData() {
    // ? Use or trick instead of if/else or ternary operator ?
    this.city = localStorage.getItem('city') || this.DefaultCity;
    this.country = localStorage.getItem('country') || this.DefaultCountry;
    return {
      city: this.city,
      country: this.country,
    };
  }

  setLocalData(city, country) {
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
  }
}
