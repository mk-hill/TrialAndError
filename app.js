// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Adding tasks to list
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    e.preventDefault();
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class for materialize
    li.className = 'collection-item';
    // Create text node and append to li
    // INJECTION?
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Clear input
    taskInput.value = '';
    e.preventDefault();
  }
}

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
}

loadEventListeners();