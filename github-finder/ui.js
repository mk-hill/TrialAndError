class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(user) {
    // ? Change null's into something human readable ?
    // ! Test looping performance on slower devices  !
    // ? Lighthouse only seems to check initial load ?
    // ? Input response seems fine on cell phone     ?
    // const user = userReceived; // don't need to reassign
    // for (let [key, value] of Object.entries(user)) {
    //   if (user[key] === null || user[key] === '') {
    //     user[key] = 'N/A';
    //   }
    // }
    // ? Or just reassign assign the ones we use ?
    user.company = user.company ? user.company : 'N/A';
    user.blog = user.blog ? user.blog : 'N/A';
    user.location = user.location ? user.location : 'N/A';
    user.created_at = user.created_at ? user.created_at : 'N/A';
    // ? Looks uglier, but should run faster ?

    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class ="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class ="col-md-9">
          <span class="badge badge-primary mb-1">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary mb-1">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success mb-1">Followers: ${user.followers}</span>
          <span class="badge badge-info mb-1">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    `;
  }

  // repos comes as array
  showRepos(repos) {
    let output = '';
    repos.forEach((repo) => {
      repo.language = repo.language ? repo.language : 'N/A';
      output += `
      <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6 mb-2">
            <a href="repo.html_url" target="_blank">${repo.name}</a>
          </div>
          <div class="col-md-6">
            <span class="badge badge-primary mb-1">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary mb-1">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success mb-1">Forks: ${repo.forks_count}</span>
            <span class="badge badge-info mb-1">Language: ${repo.language}</span>
          </div>
        </div>
      </div>
      `;
    });
    document.getElementById('repos').innerHTML = output;
  }

  showAlert(message, className) {
    // Clear previous alerts first
    this.clearAlert();
    // Create new div, assign classes, add text
    const newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    // Insert alert
    container.insertBefore(newDiv, search);
    setTimeout(() => {
      this.clearAlert();
    }, 2500);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }
}
