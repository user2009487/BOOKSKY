// selecting popup box, popup overlay, add button
var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")

// selecting buttons & inputs
var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var cancelpopup = document.getElementById("cancel-popup")

var booktitleinput = document.getElementById("book-title-input")
var bookauthorinput = document.getElementById("book-author-input")
var bookdescriptioninput = document.getElementById("book-description-input")

var editingBook = null   // 🔥 edit mode track panna

// open popup (ADD mode)
addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
    editingBook = null
})

// cancel popup
cancelpopup.addEventListener("click", function (event) {
    event.preventDefault()
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
})

// ADD or UPDATE BOOK
addbook.addEventListener("click", function (event) {
    event.preventDefault()

    // EDIT MODE
    if (editingBook) {
        editingBook.querySelector("h2").innerText = booktitleinput.value
        editingBook.querySelector("h5").innerText = bookauthorinput.value
        editingBook.querySelector("p").innerText = bookdescriptioninput.value
        editingBook = null
    }
    // ADD MODE
    else {
        var div = document.createElement("div")
        div.setAttribute("class", "book-container")
        div.innerHTML = `
            <h2>${booktitleinput.value}</h2>
            <h5>${bookauthorinput.value}</h5>
            <p>${bookdescriptioninput.value}</p>
            <button onclick="editbook(this)">Edit</button>
            <button onclick="deletebook(event)">Delete</button>
        `
        container.append(div)
    }

    // clear inputs
    booktitleinput.value = ""
    bookauthorinput.value = ""
    bookdescriptioninput.value = ""

    popupoverlay.style.display = "none"
    popupbox.style.display = "none"

    saveBooksToStorage()
})

// EDIT BOOK
function editbook(button) {
    editingBook = button.parentElement

    booktitleinput.value = editingBook.querySelector("h2").innerText
    bookauthorinput.value = editingBook.querySelector("h5").innerText
    bookdescriptioninput.value = editingBook.querySelector("p").innerText

    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
}

// DELETE BOOK
function deletebook(event) {
    event.target.parentElement.remove()
    saveBooksToStorage()
}

// SAVE TO localStorage
function saveBooksToStorage() {
    localStorage.setItem("books", container.innerHTML)
}

// LOAD FROM localStorage
window.onload = function () {
    var savedBooks = localStorage.getItem("books")
    if (savedBooks) {
        container.innerHTML = savedBooks
    }
}