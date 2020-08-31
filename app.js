let author = document.querySelector("#author");
let title = document.querySelector("#title");
let isbn = document.querySelector("#isbn");
let number = document.querySelector("#num");
let form = document.querySelector("#form");
let tab = document.querySelector(".rowss");
let book = [];

class Book {
  constructor(title, author, isbn, number) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.number = number;
  }
}

class Ui {
  constructor() {}

  displayList(item) {
    //create new table nd add

    let tr = document.createElement("tr");
    tr.innerHTML = ` <th scope="row">${item.number}</th>
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td>${item.isbn}</td>
                    <td><button class="btn btn-danger">delete</button></td>`;

    tab.appendChild(tr);
  }

  deleteBook(element) {
    tab.removeChild(element);
  }

  addLs(item) {
    if (localStorage.getItem("book") === null) {
      localStorage.setItem("book", JSON.stringify(book));
    } else {
      book = JSON.parse(localStorage.getItem("book"));
    }
    console.log(book);
    book.push(item);
    localStorage.setItem("book", JSON.stringify(book));
  }

  deleteLs(element) {
    if (localStorage.getItem("book") === null) {
      localStorage.setItem("book", JSON.stringify(book));
    } else {
      book = JSON.parse(localStorage.getItem("book"));
    }
    book.forEach(function (item, index) {
      if (item.number === element.firstElementChild.textContent) {
        book.splice(index, 1);
        localStorage.setItem("book", JSON.stringify(book));
      }
    });
  }
}

form.addEventListener("submit", addList);

function addList(e) {
  e.preventDefault();
  //grab all values

  const authorInput = author.value;
  const titleInput = title.value;
  const isbnInput = isbn.value;
  const numberInput = number.value;

  const item = new Book(titleInput, authorInput, isbnInput, numberInput);
  //console.log(book);

  const ui = new Ui();
  ui.displayList(item);
  ui.addLs(item);
  author.value = "";
  title.value = "";
  isbn.value = "";
  number.value = "";
}

tab.addEventListener("click", deleteBook);

function deleteBook(e) {
  if (e.target.classList.contains("btn-danger")) {
    let element = e.target.parentElement.parentElement;
    const ui = new Ui();
    ui.deleteBook(element);
    ui.deleteLs(element);
  }
}
