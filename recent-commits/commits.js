fetch('https://api.github.com/users/mk-hill/events')
  .then(res => res.json())
  .then((events) => {
    const commits = events
      .filter(event => event.type === 'PushEvent' && event.actor.login === 'mk-hill')
      .map(event => ({
        repo: {
          name: event.repo.name.slice(event.repo.name.indexOf('/') + 1),
          url: `https://github.com/${event.repo.name}`,
        },
        commit: {
          message: event.payload.commits[0].message,
          url: `https://github.com/${event.repo.name}/commit/${event.payload.commits[0].sha}`,
        },
      }));
    document.body.textContent = JSON.stringify(commits);
  });
