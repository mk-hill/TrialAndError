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

// Clear input fields
UI.prototype.clearInput = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Instantiate book from form values
Book.createFromInput = function () {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  return new Book(title, author, isbn);
};

// Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
  const ui = new UI();
  ui.addBookToList(Book.createFromInput());
  ui.clearInput();
  e.preventDefault();
});
