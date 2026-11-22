
const API_KEY = "AIzaSyDRQaEYeo-FsIa9o7kmfit-tjAoH2Od9Ic";

const GOOGLE_BOOKS_URL =
    "https://www.googleapis.com/books/v1/volumes";

async function searchBooks(query) {

    const url = `${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    return data.items || [];
}

// hc_pat_m3SZfANu1ngrFGfoYC8pQJKo73HkHcYgcQxqfUejnj5j