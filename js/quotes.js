
/* =================================
   CHAPTER & CO. — QUOTES FUNCTIONALITY
================================= */

const quoteForm = document.getElementById("quoteForm");
const quotesGrid = document.getElementById("quotesGrid");

let quotes = JSON.parse(localStorage.getItem("chapterQuotes")) || [];
let currentFilter = "all";


// SAVE QUOTES TO LOCAL STORAGE

function saveQuotes() {
    localStorage.setItem("chapterQuotes", JSON.stringify(quotes));
}


// DISPLAY QUOTES

function displayQuotes() {
    quotesGrid.innerHTML = "";

    if (quotes.length === 0) {
        quotesGrid.innerHTML = `
            <div class="empty-quotes">
                <span>♡</span>
                <h3>No quotes saved yet</h3>
                <p>Save your first favourite quote to start your collection.</p>
            </div>
        `;
    }

    const filteredQuotes = currentFilter === "favourites"
        ? quotes.filter(quote => quote.favourite)
        : quotes;

    filteredQuotes.forEach(quote => {
        const card = document.createElement("article");
        card.className = "quote-card";

        const quotationMark = document.createElement("span");
        quotationMark.className = "quotation-mark";
        quotationMark.textContent = "❝";

        const quoteText = document.createElement("p");
        quoteText.className = "quote-card-text";
        quoteText.textContent = quote.text;

        const bookTitle = document.createElement("h3");
        bookTitle.className = "quote-card-book";
        bookTitle.textContent = quote.book;

        const author = document.createElement("p");
        author.className = "quote-card-author";
        author.textContent = quote.author
            ? `by ${quote.author}`
            : "";

        const note = document.createElement("p");
        note.className = "quote-card-note";
        note.textContent = quote.note
            ? `♡ ${quote.note}`
            : "";

        const date = document.createElement("p");
        date.className = "quote-card-date";
        date.textContent = quote.date;

        // Favourite button
        const favouriteButton = document.createElement("button");
        favouriteButton.className = "favourite-quote-btn";
        favouriteButton.textContent = quote.favourite
            ? "♥ Favourited"
            : "♡ Add to Favourites";

        favouriteButton.addEventListener("click", () => {
            toggleFavourite(quote.id);
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-quote-btn";
        deleteButton.textContent = "Delete Quote";
        // Edit button
        const editButton = document.createElement("button");
        editButton.className = "edit-quote-btn";
        editButton.textContent = "Edit Quote";

        editButton.addEventListener("click", () => {
            editQuote(quote.id);
        });

        deleteButton.addEventListener("click", () => {
            deleteQuote(quote.id);
        });

        card.append(
            quotationMark,
            quoteText,
            bookTitle,
            author,
            note,
            date,
            favouriteButton,
            editButton,
            deleteButton
        );

        quotesGrid.appendChild(card);
    });

    updateQuoteStats();
}


// ADD A NEW QUOTE

quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = document.getElementById("quoteText").value.trim();
    const book = document.getElementById("quoteBook").value.trim();
    const author = document.getElementById("quoteAuthor").value.trim();
    const note = document.getElementById("quoteNote").value.trim();

    if (!text || !book) return;

    const newQuote = {
        id: Date.now(),
        text: text,
        book: book,
        author: author,
        note: note,
        date: new Date().toLocaleDateString(),
        favourite: false
    };

    quotes.unshift(newQuote);

    saveQuotes();
    displayQuotes();

    quoteForm.reset();
});


// UPDATE STATISTICS

function updateQuoteStats() {
    document.getElementById("totalQuotes").textContent =
        quotes.length;

    document.getElementById("favouriteQuotes").textContent =
        quotes.filter(quote => quote.favourite).length;
}


// LOAD SAVED QUOTES

displayQuotes();
// TOGGLE FAVOURITE

function toggleFavourite(id) {
    const quote = quotes.find(quote => quote.id === id);

    if (!quote) return;

    quote.favourite = !quote.favourite;

    saveQuotes();
    displayQuotes();
}


// DELETE QUOTE

function deleteQuote(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this quote?"
    );

    if (!confirmed) return;

    quotes = quotes.filter(quote => quote.id !== id);

    saveQuotes();
    displayQuotes();
}
// QUOTE FILTERS

const filterButtons = document.querySelectorAll(".quote-filter");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayQuotes();
    });
});
// EDIT QUOTE

function editQuote(id) {
    const quote = quotes.find(quote => quote.id === id);

    if (!quote) return;

    const newText = prompt("Edit your quote:", quote.text);
    if (newText === null) return;

    const newBook = prompt("Edit book title:", quote.book);
    if (newBook === null) return;

    const newAuthor = prompt("Edit author:", quote.author);
    if (newAuthor === null) return;

    const newNote = prompt("Edit personal note:", quote.note);
    if (newNote === null) return;

    if (!newText.trim() || !newBook.trim()) {
        alert("The quote and book title cannot be empty.");
        return;
    }

    quote.text = newText.trim();
    quote.book = newBook.trim();
    quote.author = newAuthor.trim();
    quote.note = newNote.trim();

    saveQuotes();
    displayQuotes();
}