const outputEl = document.getElementById('output');

function getText() {
  fetch('test.txt').then(response => response.text()).then((data) => {
    outputEl.innerHTML = data;
  }).catch((error) => { outputEl.innerHTML = `Error: ${error}`; });
}

function getJson() {
  fetch('posts.json').then(response => response.json()).then((data) => {
    let output = '';
    data.forEach((post) => { output += `<li>${post.title}: ${post.body}</li>`; });
    outputEl.innerHTML = output;
  }).catch((error) => { outputEl.innerHTML = `Error: ${error}`; });
}

function getExternal() {
  fetch('https://api.github.com/users').then(response => response.json()).then((data) => {
    let output = '';
    data.forEach((user) => { output += `<li>${user.login}: ${user.html_url}</li>`; });
    outputEl.innerHTML = output;
  }).catch((error) => { outputEl.innerHTML = `Error: ${error}`; });
}

document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJson);
document.getElementById('button3').addEventListener('click', getExternal);
