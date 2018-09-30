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
        // Show alert in UI
      } else {
        // data returns object with profile key specified in GitHub.js
        ui.showProfile(data.profile);
      }
    });
  } else {
    // Clear profile if input is empty
  }
});
