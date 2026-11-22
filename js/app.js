
// HOMEPAGE STATISTICS

const booksReadElement = document.querySelector(".pink h2");
const currentlyReadingElement = document.querySelector(".lavender h2");
const journalEntriesElement = document.querySelector(".cream h2");

if (booksReadElement) {
    booksReadElement.textContent = 24;
}

if (currentlyReadingElement) {
    currentlyReadingElement.textContent = 3;
}

if (journalEntriesElement) {
    journalEntriesElement.textContent = 5;
}


// UPDATE READING PROGRESS

const updateButton = document.getElementById("updateProgressBtn");

if (updateButton) {

    updateButton.addEventListener("click", function () {

        const currentPage = Number(
            document.getElementById("currentPageInput").value
        );

        const totalPages = 500;

        if (currentPage < 0 || currentPage > totalPages) {
            alert("Please enter a page between 0 and 500!");
            return;
        }

        const percentage = (currentPage / totalPages) * 100;

        document.getElementById("progressText").textContent =
            `Page ${currentPage} of ${totalPages}`;

        document.querySelector(".progress-fill").style.width =
            percentage + "%";

        document.querySelector(".book-info p:last-of-type").textContent =
            Math.round(percentage) + "% completed";

    });

}


// ADD BOOK TO LIBRARY

const addBookForm = document.getElementById("addBookForm");
const bookCollection = document.getElementById("bookCollection");

if (addBookForm && bookCollection) {

    let books = JSON.parse(
        localStorage.getItem("chapterBooks")
    ) || [];

    function displayBooks() {

        bookCollection.innerHTML = "";

        books.forEach(function (book) {

            const card = document.createElement("div");
            card.classList.add("saved-book-card");
            if (book.cover) {
                const cover = document.createElement("img");
                cover.src = book.cover;
                cover.alt = book.title + " book cover";
                cover.classList.add("book-cover");
                card.appendChild(cover);
            }
            const title = document.createElement("h3");
            title.textContent = book.title;

            const author = document.createElement("p");
            author.textContent = "by " + book.author;

            const genre = document.createElement("p");
            genre.textContent = book.genre;

            const status = document.createElement("p");
            status.textContent = book.status;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Remove ✕";
            deleteButton.classList.add("delete-book");

            deleteButton.addEventListener("click", function () {
                books = books.filter(function (b) {
                    return b !== book;
                });

                localStorage.setItem("chapterBooks", JSON.stringify(books));
                displayBooks();
            });

            card.append(title, author, genre, status, deleteButton);

            bookCollection.appendChild(card);

        });

    }

    addBookForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const newBook = {
            title: document.getElementById("bookTitle").value.trim(),
            author: document.getElementById("bookAuthor").value.trim(),
            cover: document.getElementById("bookCover").value.trim(),
            genre: document.getElementById("bookGenre").value,
            status: document.getElementById("bookStatus").value
        };

        books.push(newBook);

        localStorage.setItem(
            "chapterBooks",
            JSON.stringify(books)
        );

        displayBooks();

        addBookForm.reset();

    });

    displayBooks();

}
