// http://api.icndb.com/jokes/random

const getJokes = (e) => {
  // //let number = document.querySelector('input[type="number"]').value;
  // Assigning 1 if form is left empty
  // ? Is longer but arguably more readable if statement considered better practice ?
  const number = document.querySelector('input[type="number"]').value ? document.querySelector('input[type="number"]').value : 1;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}?exclude=[explicit]`, true);
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if (response.type === 'success') {
        // API returns object, "value" key holds required array
        response.value.forEach(function (joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong.</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  };

  xhr.send();
  e.preventDefault();
};

document.querySelector('.get-jokes').addEventListener('click', getJokes);
