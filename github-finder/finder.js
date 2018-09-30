// Instantiate GitHub & UI
const github = new GitHub();
const ui = new UI();

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
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
      }
    });
  } else {
    // Clear profile section if input is empty
    ui.clearProfile();
  }
});
