const g = G$('John', 'Doe');

// g.greet();
// g.greet(true);
// g.log();

// Chainable
g.greet().setLang('es').greet(true).log();
