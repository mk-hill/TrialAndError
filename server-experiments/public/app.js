const usersEl = document.querySelector('#users');

const liEl = document.createElement('li');
liEl.textContent = 'test';
usersEl.appendChild(liEl);

// console.log(users);
// console.log(usersEl);

// users.forEach(user => {
//   console.log(user);
//   usersEl.innerHtml += `<li>${user.name}</li>`;
// });
