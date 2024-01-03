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
const bookHeadPopColllection = document.getElementById("book-head-popp");
const bookTextPopColllection = document.getElementById("book-text-popp");
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
    booksData = data; // Assign the fetched data to booksData
})
    .catch((error) => {
    console.error("Error fetching data:", error);
});
function updateBookInformation(booksData) {
    // Iterate through each book and update the content in HTML
    booksData.forEach((book, index) => {
        const bookSection = document.getElementById(`book_${index + 1}`);
        if (bookHeadPopCollection && bookTextPopCollection && bookInfo && audienceElement && publishedElement && pagesElement && publisherElement) {
            console.log("dogshit");
            console.log(book);
            bookHeadPopCollection.textContent = book.title;
            bookTextPopCollection.textContent = book.author;
            bookInfo.textContent = book.plot;
            audienceElement.textContent = `Audience: ${book.audience}`;
            publishedElement.textContent = `First published: ${book.year}`;
            pagesElement.textContent = `Pages: ${book.pages}`;
            publisherElement.textContent = `Publisher: ${book.publisher}`;
        }
        if (bookSection) {
            const bookText = bookSection.querySelector(".book-text");
            const bookHead = bookSection.querySelector(".book-head");
            if (bookText && bookHead) {
                bookText.textContent = `Author: ${book.author}`;
                bookHead.textContent = `Title: ${book.title}`;
            }
        }
    });
}
books.forEach((bookElement, index) => {
    bookElement.addEventListener("click", function () {
        const clickedBook = booksData[index];
        console.log(clickedBook);
        openPopup();
        updateBookInformation([clickedBook]); // Pass an array with a single book
    });
});
