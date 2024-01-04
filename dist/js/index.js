const backpage = document.getElementById("popup");
const openpage = document.getElementById("wrapper");
const books = document.querySelectorAll(".book");
const backbtn = document.getElementById("back-pop");
const bookInfo = document.getElementById("book-info");
const audienceElement = document.getElementById("audience");
const publishedElement = document.getElementById("published");
const pagesElement = document.getElementById("Pages");
const publisherElement = document.getElementById("Publisher");
const bookHeadPopCollection = document.getElementById("book-head-pop");
const bookTextPopCollection = document.getElementById("book-text-pop");
const bookcolor = document.getElementById("book_popup");
let booksData = [];
function openPopup() {
    backpage.style.display = "grid";
    openpage.style.display = "none";
}
function closePopup() {
    backpage.style.display = "none";
    openpage.style.display = "grid";
}
fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books")
    .then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
    .then((data) => {
    console.log(data);
    booksData = data;
    booksData.forEach((book, index) => {
        updateBookInformation(book, index, true);
    });
})
    .catch((error) => {
    console.error("Error fetching data:", error);
});
function updateBookInformation(book, index, section) {
    const bookSection = document.getElementById(`book_${index + 1}`);
    let bookText;
    let bookHead;
    if (bookSection) {
        if (section) {
            bookText = bookSection.querySelector(`.book-text`);
            bookHead = bookSection.querySelector(`.book-head`);
        }
        else {
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
function updateBookDetails(book) {
    if (bookHeadPopCollection && bookTextPopCollection && bookInfo && audienceElement && publishedElement && pagesElement && publisherElement) {
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
books.forEach((bookElement, index) => {
    bookElement.addEventListener("click", function () {
        const clickedBook = booksData[index];
        console.log(clickedBook);
        openPopup();
        updateBookInformation(clickedBook, index, false);
        updateBookDetails(clickedBook);
    });
});

