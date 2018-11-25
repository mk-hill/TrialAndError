// Instantiate GitHub & UI
const github = new GitHub();
const ui = new UI();

const searchUser = document.getElementById('searchUser');

const searchHandler = (e) => {
  // Get input text
  const userText = e.target.value;

  if (userText) {
    // Make get request
    github.getUser(userText).then((data) => {
      if (data.profile.message === 'Not Found') {
        // Send message and bootsrap classes to ui method
        ui.showAlert('User not found', 'alert alert-danger');
        // ? Also clear last profile that was loaded ?
        ui.clearProfile();
      } else {
        // data returns object with profile key specified in GitHub.js
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear profile section if input is empty
    ui.clearProfile();
  }
};

function debounced(fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, 300);
  };
}

const debouncedSearchHandler = debounced(searchHandler);

searchUser.addEventListener('keyup', debouncedSearchHandler);
