/**
 * Greetr
 * When given a first name, last name, and optional language,
 * it generates formal and informal greetings.
 * Requirements:
 * - Support English and Spanish
 * - Be reusable
 * - Easy to type - G$
 * - Support jQuery
 */

// ? Semicolon before iife ?
// Can apparently be useful in case the code before has issues with
// automatic semicolon insertion
;(function (global, $) {
  // Point to .init for user convenience
  // 'new' an object - added here so the user doesn't have to
  const Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // Creating some separte variables for internal use which will be:
  // Hidden within the scope of the IIFE,
  // Not directly accessible,
  // Not exposed to global through Greetr object,
  // Accessible to Greetr methods through closure.
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

  // Creating object for use below after actual constructor Greetr.init
  // Prototype methods added here
  Greetr.prototype = {
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    validate() {
      // ? Use .includes instead ?
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Language not supported';
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

    // Insert greeting into HTML element with jQuery support
    // Will take jQuery selector
    greetInElem(selector, isFormal) {
      // ? console.assert instead of these ?
      if (!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector';
      }

      let msg;
      // Will be falsy if undefined or null
      if (isFormal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;

    },

  };

  // Actual function constructor
  // Object created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function (firstName = '', lastName = '', language = 'en') {
    const self = this; // ? necessary without any nested functions ?
    // Trying defaults above instead
    // self.firstName = firstName || '';
    // self.lastName = lastName || '';
    // self.language = language || 'en';
    self.firstName = firstName;
    self.lastName = lastName;
    self.language = language;
    // Ensure unsupported language is not used when instantiating new obj
    self.validate();
  };

  // Objects created with .init will use the function's prototype
  // property as their __proto__ by default.
  // Pointing to empty object created above by reference instead.
  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // Expose Greetr to global object passed into IIFE
  // Assign easy to type alias
  global.Greetr = global.G$ = Greetr;

  // Could later modify this call to check for window
  // Passing $ in as well to allow future modification
}(window, jQuery));
