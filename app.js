const myLibrary = [];

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    myLibrary.push(book);
    showLibrary();
}

function showLibrary() {
    showLibraryData();
}

function showLibraryData() {
    const readBooks = document.getElementById('books-read')
    const unreadBooks = document.getElementById('books-unread');
    const totalBooks = document.getElementById('total-books');
    let readCounter = 0;
    let unreadCounter = 0;
    if (readBooks) {
        readBooks.textContent = 0;
    }
    if (unreadBooks) {
        unreadBooks.textContent = 0;
    }
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].status === true) {
            readCounter++;
            readBooks.textContent = readCounter;
        }
        else if (myLibrary[i].status === false) {
            unreadCounter++;
            unreadBooks.textContent = unreadCounter;
        }
    }
    if (totalBooks)
        totalBooks.textContent = myLibrary.length;

}

//validate form
function validate(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const titleInput = document.querySelector('#book-title');
    const titleError = document.querySelector('.validation-title');
    const authorError = document.querySelector('.validation-author');
    const authorInput = document.querySelector('#book-author');
    const pagesInput = document.querySelector('#page-num');
    const pagesError = document.querySelector('.validation-pages');
    const checkbox = document.querySelector('#check');

    if (titleInput.value === '')
        titleError.style.display = 'block';
    else
        titleError.style.display = 'none';
    if (authorInput.value === '')
        authorError.style.display = 'block';
    else
        authorError.style.display = 'none';
    if (pagesInput.value === '' || pagesInput.value.match(/[^1-9]/) || pagesInput.value <= 0)
        pagesError.style.display = 'block';
    else
        pagesError.style.display = 'none'
    if (titleInput.value !== '' && authorInput.value !== '' && pagesInput.value !== '') {
        if (checkbox.checked)
            addToLibrary(titleInput.value, authorInput.value, pagesInput.value, true)
        else
            addToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
        form.reset();
    }

}

function handleClicks() {
    document.addEventListener('click', (event) => {
        const { target } = event;
        const tr = target.parentNode.parentNode.rowIndex - 1;
        if (target.id === 'add-book')
            validate(event);
        else if (target.id === 'delete-all')
            handleModal();
        else if (target.classList.contains('fa-trash'))
            myLibrary.splice(tr, 1);
        else if (target.classList.contains('fa-check')) {
            target.classList.remove('fa-check');
            target.classList.add('fa-times');
            myLibrary[tr].status = false;
        }
        else if (target.classList.contains('fa-times')) {
            target.classList.remove('fa-times');
            target.classList.add('fa-check');
            myLibrary[tr].status = true;
        }
        showLibrary();
    });
}

function handleModal() {

}

showLibrary();
handleClicks();