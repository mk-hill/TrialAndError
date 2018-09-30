// * API returns 404 once 10 requests/min limit is reached without client id&secret
// ? Implement user warning ?

class GitHub {
  // constructor() {
  //   this.client_id = '<insert id here>';
  //   this.client_secret = '<insert secret here>';
  // }
  // Add to url in methods: ?client_id=${this.client_id}&client_secret=${this.client_secret}

  // Get user and repos
  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}`);
    const profile = await profileResponse.json();
    return {
      // //profile: profileData
      // Renaming for simplicity
      profile,
    };
  }
}
