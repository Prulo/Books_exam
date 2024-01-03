const backpage: HTMLElement | null = document.getElementById("popup");
const openpage: HTMLElement | null = document.getElementById("wrapper");
const book: HTMLElement | null = document.getElementById("wrapper");
const backbtn: HTMLElement | null = document.getElementById("wrapper");

if (openpage) {
    openpage.addEventListener("click", function () {
        openPopup();
        console.log("dog")
    });
}

function openPopup() {
        backpage.style.display = "grid";
          console.log("lul");
}

function closePopup() {
        backpage.style.display = "grid";
        console.log("lal");
    
}