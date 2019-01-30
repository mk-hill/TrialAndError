/**
 * Pramp implementation for reference
 * Split top and bottom half of animation into two separate elements,
 * Only display relevant div by changing z-index throughout animation
 */

function count(digitPrefix) {
  $('.container').removeClass('play');
  let activeDigit = $(`ul.${digitPrefix} li.active`);

  // If no digit is active
  if (activeDigit.html() === undefined) {
    // Activate the first digit for this counter
    activeDigit = $(`ul.${digitPrefix} li`).eq(0);
    activeDigit
      .addClass('before')
      .removeClass('active')
      .next('li')
      .addClass('active')
      .closest('.container')
      .addClass('play');

    // If the last digit is active
  } else if (activeDigit.is(':last-child')) {
    $(`ul.${digitPrefix} li`).removeClass('before');
    activeDigit.addClass('before').removeClass('active');
    activeDigit = $(`ul.${digitPrefix} li`).eq(0);
    activeDigit
      .addClass('active')
      .closest('.container')
      .addClass('play');

    // Otherwise, proceed to the next digit
  } else {
    $(`ul.${digitPrefix} li`).removeClass('before');
    activeDigit
      .addClass('before')
      .removeClass('active')
      .next('li')
      .addClass('active')
      .closest('.container')
      .addClass('play');
  }
}

setInterval(() => {
  count('ones');
}, 1000);

setInterval(() => {
  count('tens');
}, 10000);
