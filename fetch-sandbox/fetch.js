function getText() {
  fetch('test.txt').then((response) => {
    // response returns entire object, promise in .text
    return response.text();
    // Get data from promise
  }).then((data) => {
    document.getElementById('output').innerHTML = data;
  }).catch((error) => {
    console.log(error);
  });
}

function getJson() {
  fetch('posts.json').then((response) => {
    return response.json();
  }).then((data) => {
    // data is an array of objects
    let output = '';
    data.forEach((post) => {
      output += `<li>${post.title}: ${post.body}</li>`; 
    });
    document.getElementById('output').innerHTML = output;
  }).catch((error) => {
    console.log(error);
  });
}

function getExternal() {
  fetch('https://api.github.com/users').then((response) => {
    return response.json();
  }).then((data) => {
    // data is an array of objects
    let output = '';
    data.forEach((user) => {
      output += `<li>${user.login}: ${user.html_url}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJson);
document.getElementById('button3').addEventListener('click', getExternal);
