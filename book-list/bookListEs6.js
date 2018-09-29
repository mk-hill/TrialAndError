class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(msg, className) {
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
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      this.showAlert('Book Removed!', 'success');
    }
  }

  clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if (!localStorage.getItem('books')) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI();
    books.forEach(book => ui.addBookToList(book));
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Instantiate ui
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
    Store.addBook(book);
    // Inform user of success
    ui.showAlert('Book added.', 'success');
    ui.clearInput();
  }
  e.preventDefault();
});


// Event Listener for removing book, delegating
document.getElementById('book-list').addEventListener('click', (e) => {
  // Instantiate ui
  const ui = new UI();
  ui.deleteBook(e.target);
  // Get ISBN from event target's parent's previous sibling
  // Send ISBN to local storage removal method to identify correct entry
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});
