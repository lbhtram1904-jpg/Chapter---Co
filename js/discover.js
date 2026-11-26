
// CHAPTER & CO. DISCOVER PAGE

const searchInput = document.getElementById("bookSearch");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");


// CREATE BOOK CARDS


function displayBooks(books, container) {

    container.innerHTML = "";

    if (!books || books.length === 0) {
        container.textContent = "No books found. Try another search ♡";
        return;
    }

    books.forEach(function(book) {

        const info = book.volumeInfo || {};

        const card = document.createElement("div");
        card.classList.add("discover-book-card");

        // BOOK COVER
        const cover = document.createElement("img");

        cover.src = info.imageLinks?.thumbnail || "";
        cover.alt = info.title || "Book cover";

        // BOOK TITLE
        const title = document.createElement("h3");
        title.textContent = info.title || "Untitled";

        // AUTHOR
        const author = document.createElement("p");
        author.textContent =
            info.authors?.join(", ") || "Unknown author";

        // RATING
        const rating = document.createElement("p");

        if (info.averageRating) {
            rating.textContent =
                "★ " + info.averageRating +
                " / 5 (" + (info.ratingsCount || 0) + " ratings)";
        } else {
            rating.textContent = "No rating available yet";
        }

        rating.classList.add("book-rating");

        // PUBLICATION DATE
        const published = document.createElement("p");

        published.textContent = info.publishedDate
            ? "Published: " + info.publishedDate
            : "Publication date unavailable";

        // DESCRIPTION
        const description = document.createElement("p");

        description.textContent = info.description
            ? info.description
            : "No description available.";

        description.classList.add("book-description");
        description.hidden = true;

        // MORE DETAILS BUTTON
        const detailsButton = document.createElement("button");

        detailsButton.textContent = "Read Description";

        detailsButton.addEventListener("click", function() {

            description.hidden = !description.hidden;

            detailsButton.textContent = description.hidden
                ? "Read Description"
                : "Hide Description";

        });

        // ADD TO LIBRARY BUTTON
        const addButton = document.createElement("button");

        addButton.textContent = "Add to My Library ♡";

        addButton.addEventListener("click", function() {

            const savedBooks = JSON.parse(
                localStorage.getItem("chapterBooks")
            ) || [];

            savedBooks.push({
                title: info.title || "Untitled",
                author: info.authors?.join(", ") || "Unknown author",
                genre: info.categories?.[0] || "Other",
                status: "Want to Read",
                cover: info.imageLinks?.thumbnail || ""
            });

            localStorage.setItem(
                "chapterBooks",
                JSON.stringify(savedBooks)
            );

            addButton.textContent = "Added! ♡";
            addButton.disabled = true;

        });

        // VIEW ON GOOGLE BOOKS
        const link = document.createElement("a");

        if (info.infoLink) {
            link.href = info.infoLink;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View on Google Books ↗";
            link.classList.add("book-link");
        }

        // ADD EVERYTHING TO THE CARD
        if (info.imageLinks?.thumbnail) {
            card.appendChild(cover);
        }

        card.append(
            title,
            author,
            rating,
            published,
            detailsButton,
            description,
            addButton
        );

        if (info.infoLink) {
            card.appendChild(link);
        }

        container.appendChild(card);

    });

}


// SEARCH BOOKS

async function handleSearch() {

    const query = searchInput.value.trim();

    if (!query) {
        alert("Please enter a book or author name!");
        return;
    }

    searchResults.textContent = "Finding your next read... ♡";

    try {

        const books = await searchBooks(query);

        displayBooks(books, searchResults);

    } catch (error) {

        console.error(error);

        searchResults.textContent =
            "Something went wrong. Please try again!";

    }

}

searchButton.addEventListener("click", handleSearch);


// SEARCH WHEN ENTER IS PRESSED

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        handleSearch();
    }

});


// BROWSE GENRES

document.querySelectorAll(".genre-card").forEach(function(button) {

    button.addEventListener("click", async function() {

        const genre = button.dataset.genre;

        searchInput.value = genre;

        searchResults.scrollIntoView({
            behavior: "smooth"
        });

        searchResults.textContent = "Finding books... ♡";

        try {

            const books = await searchBooks(
                "subject:" + genre
            );

            displayBooks(books, searchResults);

        } catch (error) {

            console.error(error);

            searchResults.textContent =
                "Couldn't load books. Try again!";

        }

    });

});


// POPULAR AUTHORS

document.querySelectorAll(".author-card").forEach(function(button) {

    button.addEventListener("click", async function() {

        const author = button.dataset.author;

        searchInput.value = author;

        searchResults.scrollIntoView({
            behavior: "smooth"
        });

        searchResults.textContent = "Finding books... ♡";

        try {

            const books = await searchBooks(
                "inauthor:" + author
            );

            displayBooks(books, searchResults);

        } catch (error) {

            console.error(error);

            searchResults.textContent =
                "Couldn't load books. Try again!";

        }

    });

});

// =================================
// LOAD DISCOVER PAGE SECTIONS
// =================================

async function loadDiscoverSections() {

    try {

        // TRENDING BOOKS
        const trending = await searchBooks(
            "bestselling young adult fiction"
        );

        displayBooks(
            trending,
            document.getElementById("trendingBooks")
        );


        // HIDDEN GEMS
        const hiddenGems = await searchBooks(
            "young adult fantasy fiction"
        );

        displayBooks(
            hiddenGems,
            document.getElementById("hiddenGems")
        );


        // BOOK OF THE DAY
        const bookOfTheDay = await searchBooks(
            "young adult fiction"
        );

        displayBooks(
            bookOfTheDay.slice(0, 1),
            document.getElementById("bookOfTheDay")
        );


        // PERSONAL RECOMMENDATIONS
        const recommendations = await searchBooks(
            "young adult fantasy romance"
        );

        displayBooks(
            recommendations,
            document.getElementById("recommendations")
        );


        // RECENTLY RELEASED
        const recentBooks = await searchBooks(
            "young adult fiction"
        );

        displayBooks(
            recentBooks,
            document.getElementById("recentBooks")
        );

    } catch (error) {

        console.error(
            "Could not load Discover sections:",
            error
        );

    }

}


// LOAD THE SECTIONS WHEN THE PAGE OPENS

loadDiscoverSections();
