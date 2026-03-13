//Prototype for Book
function Paper(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

//Constructor for new book
function Book(title, author, pages, readStatus) {
  Paper.call(this, title, author, pages);
  this.readStatus = readStatus;
}

//Set Paper object as prototype for Book Object
Object.setPrototypeOf(Book, Paper);

//Function for changing read status of a book
Book.prototype.changeStatus = function() {
  do{
    this.readStatus = prompt("What is the new status of this book?");
  }while((this.readStatus.toLowerCase().toString() !== "read") && (this.readStatus.toLowerCase().toString() !== "not read") && (this.readStatus.toLowerCase().toString() !== "currently reading"));
  return this.readStatus.toLowerCase();
}

//Pre-loaded books for the array
const book1 = new Book('Eragon', 'Christopher Paolini', 544, 'read');
const book2 = new Book('Eldest', 'Christopher Paolini', 694, 'read');
const book3 = new Book('Brisingr', 'Christopher Paolini', 831, 'read');
const book4 = new Book('Inheritance', 'Christopher Paolini', 860, 'not read');

//Loading books into array
const library = [];
library.push(book1, book2, book3, book4);

//Displays initial books in Library array
function displayBooks(){
  for(let x = 0; x < library.length; x++){
    let book = document.createElement("article");
    let desc = document.createElement("p");
    let stat = document.createElement("p");
    let remove = document.createElement("button");
    let change = document.createElement("button");
      
    desc.className = "bookDesc";
    stat.className = "readStat";
    remove.className = "removal";
    change.className = "changeStatus";
      
    desc.textContent = library[x].title.toString() + ", written by " + library[x].author.toString() + ", " + library[x].pages.toString() + " pages";
    stat.textContent = library[x].readStatus.toString();
    book.id = crypto.randomUUID();
    library[x].id = book.id;
    book.className = "story";
    remove.textContent = "Remove Book";
    change.textContent = "Change Status";
    
    change.addEventListener("click", function (){
     for(let a = 0; a < library.length; a++){
       if(change.parentElement.id === library[a].id){
        stat.textContent = library[a].changeStatus();
       }
     }
    });
      
    book.append(desc);
    book.append(stat);
    book.append(remove);
    book.append(change);
    shelf.append(book);
  }
}

//Adds books to library array
function addBookToLibrary(e) {
  
  let bookTitle = e.target.title.value;
  let bookAuthor = e.target.author.value;
  let bookPages = e.target.pages.value;
  let bookStatus = e.target.readStatus.value;
  
  let addBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  
  library.push(addBook);
  
  let book = document.createElement("article");
  let desc = document.createElement("p");
  let stat = document.createElement("p");
  let remove = document.createElement("button");
  let change = document.createElement("button");
  let y = library.length - 1;
      
  desc.className = "bookDesc";
  stat.className = "readStat";
  remove.className = "removal";
  change.className = "changeStatus";
      
  desc.textContent = library[y].title.toString() + ", written by " + library[y].author.toString() + ", " + library[y].pages.toString() + " pages";
  stat.textContent = library[y].readStatus.toString();
  book.id = crypto.randomUUID();
  library[y].id = book.id;
  book.className = "story";
  remove.textContent = "Remove Book";
  change.textContent = "Change Status";
  
  change.addEventListener("click", function (){
     for(let a = 0; a < library.length; a++){
       if(change.parentElement.id === library[a].id){
         console.log(stat.textContent = library[a].changeStatus());
       }
     }
    });
      
  book.append(desc);
  book.append(stat);
  book.append(remove);
  book.append(change);
  shelf.append(book);

  remove.addEventListener("click", event => {
    event.preventDefault();
    event.target.parentElement.remove();
    console.log(library);
    for(let a = 0; a < library.length; a++){
      if(library[a].id === event.target.parentElement.id){
        library.splice(a, 1);
      }
    }
  });
}

const form = document.getElementById("addingBooks");
const shelf = document.getElementById("shelf");
const stories = document.getElementsByClassName("removal");
const changeButton = document.getElementsByClassName("changeStatus");
const toTheLog = document.getElementById("backlog");
form.style.visibility = "hidden";
displayBooks();

form.addEventListener("submit", function (e){
  e.preventDefault();
  console.log(e.target.title.value);
  console.log(e.target.author.value);
  console.log(e.target.pages.value);
  console.log(e.target.readStatus.value);
  addBookToLibrary(e);
  form.reset();
  form.style.visibility = "hidden";
});

for(let i = 0; i < stories.length; i++){
  stories[i].addEventListener("click", event => {
    event.preventDefault();
    event.target.parentElement.remove();
    console.log(library);
    for(let a = 0; a < library.length; a++){
      if(library[a].id === event.target.parentElement.id){
        library.splice(a, 1);
      }
    }
  });
}

toTheLog.addEventListener("click", e => {
  form.style.visibility = "visible";
})