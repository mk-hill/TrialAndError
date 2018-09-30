// Init GitHub
const github = new GitHub();

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
        // Show profile
        console.log(data);
      }
    });
  } else {
    // Clear profile if input is empty
  }
});
