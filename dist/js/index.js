const backpage = document.getElementById("popup");
const openpage = document.getElementById("wrapper");
if (openpage) {
    openpage.addEventListener("click", function () {
        openPopup();
        console.log("dog");
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
