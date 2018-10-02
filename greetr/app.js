// Testing greetr.js
$('#login').click(function() {
  const user = G$('John', 'Doe');
  $('#logindiv').hide();
  user.setLang($('#lang').val()).greetInElem('#greeting', true).log();
});


// Prior experiments
// const g = G$('John', 'Doe');

// g.greet();
// g.greet(true);
// g.log();

// Chainable
// g.greet().greetInElem('#greeting').setLang('es').log().greetInElem('#greeting', true);
