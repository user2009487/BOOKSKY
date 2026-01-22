// selecting popup box, popup overlay, add button
var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")

addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
})

// selecting cancel button
var cancelpopup = document.getElementById("cancel-popup")
cancelpopup.addEventListener("click", function (event) {
    event.preventDefault()
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
})

// selecting container and inputs
var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitleinput = document.getElementById("book-title-input")
var bookauthorinput = document.getElementById("book-author-input")
var bookdescriptioninput = document.getElementById("book-description-input")

// ADD BOOK
addbook.addEventListener("click", function (event) {
    event.preventDefault()

    var div = document.createElement("div")
    div.setAttribute("class", "book-container")
    div.innerHTML = `
        <h2>${booktitleinput.value}</h2>
        <h5>${bookauthorinput.value}</h5>
        <p>${bookdescriptioninput.value}</p>
        <button onclick="deletebook(event)">Delete</button>
    `

    container.append(div)

    // clear inputs
    booktitleinput.value = ""
    bookauthorinput.value = ""
    bookdescriptioninput.value = ""

    popupoverlay.style.display = "none"
    popupbox.style.display = "none"

    saveBooksToStorage()
})

// DELETE BOOK
function deletebook(event) {
    event.target.parentElement.remove()
    saveBooksToStorage()
}

// SAVE TO localStorage
function saveBooksToStorage() {
    localStorage.setItem("books", container.innerHTML)
}

// LOAD FROM localStorage ON PAGE LOAD
window.onload = function () {
    var savedBooks = localStorage.getItem("books")
    if (savedBooks) {
        container.innerHTML = savedBooks
    }
}