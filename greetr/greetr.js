/**
 * Greetr
 * When given a first name, last name, and optional language,
 * it generates formal and informal greetings.
 * Requirements:
 * Support English and Spanish
 * Be reusable
 * Easy to type - G$
 * Support jQuery
 */

(function (global, $) {
  // Point to .init for user convenience
  const Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // Creating some separte variables for internal use which
  // will not be exposed to global through Greetr object.
  // Greetr methods will have access through closure
  const supportedLangs = ['en', 'es'];

  const greetings = {
    en: 'Hello',
    es: 'Hola',
  };

  const formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
  };

  const logMessages = {
    en: 'Logged in',
    es: 'Inicio sesión',
  };

  // Creating object for use below
  // Prototype methods added here
  Greetr.prototype = {
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    validate() {
      // ? Use .includes instead ?
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Language not supported";
      }
    },

    // ? Add _ to these two methods which aren't intended for the user ?
    greeting() {
      return `${greetings[this.language]} ${this.firstName}!`;
    },

    formalGreeting() {
      return `${formalGreetings[this.language]}, ${this.getFullName()}.`;
    },

    greet(isFormal) {
      let msg;
      // Will be falsy if undefined or null
      if (isFormal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' will refer to the calling object at execution time
      // makes the method chainable!
      return this;
    },

    log() {
      // ? IE doesn't have console object if it's not opened ?
      // * test later *
      // Confirm console existence first
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.getFullName()}`);
      }

      return this;
    },

    // Allow changing the language on the fly
    setLang(lang) {
      this.language = lang;
      this.validate();

      return this;
    },

  };

  // Actual function constructor
  Greetr.init = function (firstName = '', lastName = '', language = 'en') {
    const self = this; // ? is this necessary without any nested functions ?
    // Trying defaults above instead
    // self.firstName = firstName || '';
    // self.lastName = lastName || '';
    // self.language = language || 'en';
    self.firstName = firstName;
    self.lastName = lastName;
    self.language = language;
  };

  // Objects created with .init will use the function's prototype
  // property as their __proto__ by default.
  // Pointing to empty object created above by reference instead.
  Greetr.init.prototype = Greetr.prototype;

  // Expose Greetr to global object passed into IIFE
  // Assign easy to type alias
  global.Greetr = global.G$ = Greetr;

  // Could later modify this call to check for window
}(window, jQuery));
