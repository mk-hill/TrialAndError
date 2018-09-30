class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(userReceived) {
    // ? Change null's into something human readable ?
    // ! Test looping performance on slower devices  !
    const user = userReceived;
    for (let [key, value] of Object.entries(user)) {
      if (user[key] === null || user[key] === '') {
        user[key] = 'N/A';
      }
    }
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
}
