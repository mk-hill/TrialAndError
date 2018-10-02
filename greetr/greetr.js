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

  // Creating empty object for use below
  Greetr.prototype = {};

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
