class GitHub {

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
