// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const rememberSwitch = document.querySelector('#remember-checkbox');
let rememberState = true;

// Create task html element with appropriate classes and content
function createTaskElement(content) {
  // Create li element
  const li = document.createElement('li');
  // Add class for materialize
  li.className = 'collection-item grey lighten-5';
  // Create text node and append to li
  // ? Injection from input / local storage ?
  li.appendChild(document.createTextNode(content));
  // Create new link element
  const removeButton = document.createElement('a');
  removeButton.className = 'delete-item secondary-content';
  // Add remove icon html
  removeButton.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(removeButton);
  // Append li to ul
  taskList.appendChild(li);
}

// Check local storage, return empty array or array from LS accordingly
// Parsing string from local storage
function getStoredTasks() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}


// Store added task in local storage
function storeLocalTask(task) {
  const tasks = getStoredTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task from local storage
function removeLocalTask(taskElement) {
  const tasks = getStoredTasks();
  tasks.forEach((task, index) => {
    if (taskElement.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(e) {
  // Prevent empty items
  if (taskInput.value === '') {
    M.toast({
      html: 'No empty tasks!',
    });
  } else {
    createTaskElement(taskInput.value);
    // Store task in local storage unless user toggled LS off
    if (rememberState) {
      storeLocalTask(taskInput.value);
    }
    // Clear input
    taskInput.value = '';
  }
  e.preventDefault();
}


// Removing single task from list
function removeTask(e) {
  // Target returns <i>, <a> is parent. <li> is <a>'s parent
  const li = e.target.parentElement.parentElement;
  if (li.querySelector('a').classList.contains('delete-item')) {
    li.remove();
  }
  removeLocalTask(li);
}


function clearLocalTasks() { localStorage.clear(); }

// Clear all tasks
function clearTasks() {
  // taskList.innerHTML = '';
  // ? Could looping really be faster ?
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearLocalTasks();
}


function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // Returns node list, forEach usable
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


// Get tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Local storage stores as string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => createTaskElement(task));
}

// Clear local storage when user unchecks remember me
function rememberToggle() {
  if (!rememberSwitch.checked) {
    clearLocalTasks();
    rememberState = false;
  } else {
    rememberState = true;
  }
}


// Initialize Materialize side nav
function loadSideNav() {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
}

// Load all event listeners
function loadEventListeners() {
  // Load local storage once DOM is ready
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  // Clear local storage when user unchecks remember me
  rememberSwitch.addEventListener('change', rememberToggle);
  // Materialize side nav
  document.addEventListener('DOMContentLoaded', loadSideNav);
}

loadEventListeners();
