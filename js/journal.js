
// =================================
// CHAPTER & CO. — JOURNAL FUNCTIONALITY
// =================================

const journalForm = document.getElementById("journalForm");
const journalEntries = document.getElementById("journalEntries");

let entries = JSON.parse(localStorage.getItem("chapterJournal")) || [];


// SAVE ENTRIES

function saveEntries() {
    localStorage.setItem("chapterJournal", JSON.stringify(entries));
}


// DISPLAY ENTRIES

function displayEntries() {
    journalEntries.innerHTML = "";

    if (entries.length === 0) {
        journalEntries.innerHTML = `
            <div class="empty-journal">
                <span>📖</span>
                <h3>Your story starts here</h3>
                <p>Your journal entries will appear here once you save them.</p>
            </div>
        `;
    }

    entries.forEach(entry => {
        const card = document.createElement("article");
        card.className = "journal-entry-card";

        const title = document.createElement("h3");
        title.textContent = entry.title;

        const book = document.createElement("p");
        book.className = "entry-book";
        book.textContent = entry.book
            ? `📖 ${entry.book}`
            : "A personal reading note";

        const date = document.createElement("p");
        date.className = "entry-date";
        date.textContent = entry.date;

        const rating = document.createElement("p");
        rating.className = "entry-rating";
        rating.textContent = entry.rating
            ? "★".repeat(Number(entry.rating)) +
            "☆".repeat(5 - Number(entry.rating))
            : "No rating";

        const content = document.createElement("p");
        content.className = "entry-content";
        content.textContent = entry.content;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-entry-btn";
        deleteButton.textContent = "Delete Entry";

        deleteButton.addEventListener("click", () => {
            deleteEntry(entry.id);
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-entry-btn";
        editButton.textContent = "Edit Entry";

        editButton.addEventListener("click", () => {
            editEntry(entry.id);
        });

        if (entry.cover) {
            const coverImage = document.createElement("img");
            coverImage.src = entry.cover;
            coverImage.alt = `Cover of ${entry.book || entry.title}`;
            coverImage.className = "journal-cover";
            coverImage.loading = "lazy";

            coverImage.addEventListener("error", () => {
                coverImage.remove();
            });

            card.appendChild(coverImage);
        }

        card.append(title, book, date, rating, content, editButton, deleteButton);
        journalEntries.appendChild(card);
    });

    updateStats();
}


// ADD A NEW ENTRY

journalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("entryTitle").value.trim();
    const book = document.getElementById("entryBook").value.trim();
    const cover = document.getElementById("entryCover").value.trim();
    const rating = document.getElementById("entryRating").value;
    const content = document.getElementById("entryContent").value.trim();

    if (!title || !content) return;

    const newEntry = {
        id: Date.now(),
        title: title,
        book: book,
        cover: cover,
        rating: rating,
        content: content,
        date: new Date().toLocaleDateString()
    };

    entries.unshift(newEntry);

    saveEntries();
    displayEntries();

    journalForm.reset();
});


// DELETE AN ENTRY
// EDIT AN ENTRY

function editEntry(id) {
    const entry = entries.find(entry => entry.id === id);

    if (!entry) return;

    const newTitle = prompt("Edit entry title:", entry.title);
    if (newTitle === null) return;

    const newBook = prompt("Edit book title:", entry.book);
    if (newBook === null) return;
    const newCover = prompt("Edit book cover image URL:", entry.cover || "");
    if (newCover === null) return;

    const newRating = prompt(
        "Enter a rating from 1 to 5, or leave blank:",
        entry.rating
    );

    if (newRating === null) return;

    if (newRating !== "" &&
        (!Number.isInteger(Number(newRating)) ||
            Number(newRating) < 1 ||
            Number(newRating) > 5)) {
        alert("Please enter a rating from 1 to 5.");
        return;
    }

    const newContent = prompt("Edit your thoughts:", entry.content);
    if (newContent === null) return;

    if (!newTitle.trim() || !newContent.trim()) {
        alert("Title and thoughts cannot be empty.");
        return;
    }

    entry.title = newTitle.trim();
    entry.book = newBook.trim();
    entry.cover = newCover.trim();
    entry.rating = newRating;
    entry.content = newContent.trim();

    saveEntries();
    displayEntries();
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);

    saveEntries();
    displayEntries();
}


// UPDATE STATISTICS

function updateStats() {
    document.getElementById("totalEntries").textContent = entries.length;

    const reviewedBooks = new Set(
        entries
            .filter(entry => entry.book.trim() !== "")
            .map(entry => entry.book.trim().toLowerCase())
    );

    document.getElementById("booksReviewed").textContent =
        reviewedBooks.size;
}


// LOAD SAVED ENTRIES

displayEntries();
