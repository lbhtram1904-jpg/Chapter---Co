const booksRead = 24;
const currentlyReading = 3;
const journalEntries = 5;

document.querySelector(".pink h2").textContent = booksRead;

document.querySelector(".lavender h2").textContent = currentlyReading;

document.querySelector(".cream h2").textContent = journalEntries;
// UPDATE READING PROGRESS

const updateButton = document.getElementById("updateProgressBtn");

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

    document.querySelector(".book-info p:last-child").textContent =
        Math.round(percentage) + "% completed";

});