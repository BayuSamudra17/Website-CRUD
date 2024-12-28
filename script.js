const bookList = document.getElementById('bookList');
const addBookBtn = document.getElementById('addBook');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

function fetchBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            bookList.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} oleh ${book.author}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Hapus';
                deleteBtn.onclick = () => deleteBook(book.id);
                li.appendChild(deleteBtn);
                bookList.appendChild(li);
            });
        });
}

function addBook() {
    const title = titleInput.value;
    const author = authorInput.value;

    if (title && author) {
        const bookData = { title, author };
        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        }).then(() => {
            fetchBooks(); // Refresh the list after adding
            titleInput.value = '';
            authorInput.value = '';
        });
    }
}

function deleteBook(id) {
    fetch(`/api/books/${id}`, { method: 'DELETE' })
        .then(() => {
            fetchBooks(); // Refresh the list after deleting
        });
}

addBookBtn.addEventListener('click', addBook);

// Load books on page load
fetchBooks();
