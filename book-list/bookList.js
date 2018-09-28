// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create new row
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (msg, className) {
  // Create div, add alert class + className, add msg
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  // Get container and sibling, insertBefore
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  // Disappear
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
};

// Clear input fields
UI.prototype.clearInput = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};


// Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
  const ui = new UI();

  // Instantiate book from form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Validate
  if (!title || !author || !isbn) {
    // Alert user to error
    ui.showAlert('Please fill in all fields.', 'error');
  } else {
    const book = new Book(title, author, isbn);
    ui.addBookToList(book);
    // Inform user of success
    ui.showAlert('Book added.', 'success');
    ui.clearInput();
  }
  e.preventDefault();
});
