import { Book } from "bookModule";

const backpage: HTMLElement = document.getElementById("popup")!;
const openpage: HTMLElement = document.getElementById("wrapper")!;
const books: NodeListOf<HTMLElement> = document.querySelectorAll(".book")!;
const backbtn: HTMLElement = document.getElementById("back-pop")!;
const bookInfo: HTMLElement = document.getElementById("book-info")!;
const audienceElement: HTMLElement = document.getElementById("audience")!;
const publishedElement: HTMLElement = document.getElementById("published")!;
const pagesElement: HTMLElement = document.getElementById("Pages")!;
const publisherElement: HTMLElement = document.getElementById("Publisher")!;
const bookHeadPopCollection: HTMLElement = document.getElementById("book-head-pop")!;
const bookTextPopCollection: HTMLElement = document.getElementById("book-text-pop")!;
const bookcolor: HTMLElement = document.getElementById("book_popup")!;
let booksData: Book[] = [];

function openPopup(): void {
  backpage.style.display = "grid";
  openpage.style.display = "none";
}

function closePopup(): void {
  backpage.style.display = "none";
  openpage.style.display = "grid";
}


fetch(
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data: Book[]) => {
    console.log(data);
    booksData = data;
    booksData.forEach((book, index) => {
      updateBookInformation(book, index, true);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function updateBookInformation(
  book: Book,
  index: number,
  section: boolean
): void {
  const bookSection = document.getElementById(`book_${index + 1}`);
  let bookText: HTMLParagraphElement;
  let bookHead: HTMLHeadingElement;
  if (bookSection) {
    if (section) {
      bookText = bookSection.querySelector(`.book-text`);
      bookHead = bookSection.querySelector(`.book-head`);
    } else {
      bookText = document.querySelector(`.details-text`);
      bookHead = document.querySelector(`.details-head`);
    }
    bookSection.style.backgroundColor = book.color;
    if (bookText && bookHead) {
      bookText.textContent = book.author;
      bookHead.textContent = book.title;
    }
  }
}

function updateBookDetails(book: Book): void {
  if (
    bookHeadPopCollection && bookTextPopCollection && bookInfo && audienceElement && publishedElement && pagesElement && publisherElement
  ) {
    console.log(book);

    bookcolor.style.backgroundColor = book.color;
    bookHeadPopCollection.textContent = book.title;
    bookTextPopCollection.textContent = book.author;
    bookInfo.textContent = book.plot;
    audienceElement.textContent = `Audience: ${book.audience}`;
    publishedElement.textContent = `First published: ${book.year}`;
    pagesElement.textContent = `Pages: ${book.pages}`;
    publisherElement.textContent = `Publisher: ${book.publisher}`;
  }
}

books.forEach((bookElement: HTMLElement, index: number) => {
  bookElement.addEventListener("click", function () {
    const clickedBook: Book = booksData[index];
    console.log(clickedBook);
    openPopup();
    updateBookInformation(clickedBook, index, false);
    updateBookDetails(clickedBook);
  });
});
