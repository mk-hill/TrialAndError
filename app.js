// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Adding tasks to list
function addTask(e) {
  // Prevent empty items
  if (taskInput.value === '') {
    M.toast({
      html: 'No empty tasks!',
      displayLength: 1500,
    });
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class for materialize
    li.className = 'collection-item grey lighten-5';
    // Create text node and append to li
    // INJECTION?
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const removeLink = document.createElement('a');
    removeLink.className = 'delete-item secondary-content';
    // Add icon html
    removeLink.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(removeLink);
    // Append li to ul
    taskList.appendChild(li);
    // Clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

// Removing tasks from list
function removeTask(e) {
  // Target returns <i>, <a> is parent
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask)
}

loadEventListeners();