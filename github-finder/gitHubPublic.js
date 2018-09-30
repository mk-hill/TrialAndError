// // API returns 404 once 10 requests/min limit is reached without client id&secret
// // ? Implement user warning ?
// ? Cannot reproduce error from 10 search/min limit without auth ?
// ? Seems to work fine - recheck GitHub API docs if it becomes an issue ?
// Add id and secret, replace declarations in getUser() with:
// const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
// const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

class GitHub {
  constructor() {
    // this.client_id = '<insert id here>';
    // this.client_secret = '<insert secret here>';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  // Get user and repos
  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}`);
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`);
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    return {
      // //profile: profileData
      // Renaming for simplicity
      profile,
      repos,
    };
  }
}
