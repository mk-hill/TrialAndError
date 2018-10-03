const data = [
  {
    name: 'William Johnson',
    age: 39,
    gender: 'male',
    lookingFor: 'female',
    location: 'Miami, FL',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    name: 'Amelia Pond',
    age: 26,
    gender: 'female',
    lookingFor: 'male',
    location: 'London, UK',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    name: 'John Doe',
    age: 34,
    gender: 'male',
    lookingFor: 'male',
    location: 'Boston, MA',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Jen Smith',
    age: 37,
    gender: 'female',
    lookingFor: 'female',
    location: 'Chicago, IL',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
  },
];

const profileIterator = (profiles) => {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    },
  };
};

const profiles = profileIterator(data);

const nextProfile = () => {
  const currentProfile = profiles.next().value;
  if (currentProfile) {
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
      </ul>
    `;

    document.getElementById('imgDisplay').innerHTML = `<img src="${currentProfile.image}">`;
  } else {
    // No more profiles
    window.location.reload();
  }
};

// Call first profile immediately
nextProfile();


document.getElementById('next').addEventListener('click', nextProfile);
