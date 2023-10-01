let myLibrary = [];

class Book {
    constructor(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function addToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    myLibrary.push(book);
    showLibrary();
}

function showLibrary() {
    showLibraryData();
    const bookTable = document.querySelector('#table-body');
    bookTable.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement('tr');
        bookRow.classList.add('book-list');
        bookTable.appendChild(bookRow);
        //TITLE
        const title = document.createElement('td');
        title.textContent = myLibrary[i].name;
        bookRow.appendChild(title);
        //AUTHOR
        const author = document.createElement('td');
        author.textContent = myLibrary[i].author;
        bookRow.appendChild(author);
        //PAGES
        const pages = document.createElement('td');
        pages.textContent = myLibrary[i].pages;
        bookRow.appendChild(pages);
        //STATUS
        const status = document.createElement('td');
        const statusIcon = document.createElement('i');
        if (myLibrary[i].status === true)
            statusIcon.classList.add('fa-solid', 'fa-check');
        else if (myLibrary[i].status === false)
            statusIcon.classList.add('fa-solid', 'fa-times');
        status.appendChild(statusIcon);
        bookRow.appendChild(status);
        //REMOVE ICON
        const remove = document.createElement('td');
        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fa-solid', 'fa-trash');
        remove.appendChild(removeIcon);
        bookRow.appendChild(remove);

    }
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
    const addBook = document.getElementById('add-book');
    addBook.addEventListener('click', (event) => {
        validate(event);
    })
    document.addEventListener('click', (event) => {
        const { target } = event;
        const tr = target.parentNode.parentNode.rowIndex - 1;
        if (target.id === 'delete-all')
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
    const modal = document.querySelector('#modal');
    modal.style.display = 'block'
    modal.addEventListener('click', (event) => {
        const { target } = event;
        if (target.id === 'cancel' || target.classList.contains('close'))
            modal.style.display = 'none';
        else if (target.id === 'confirm') {
            myLibrary = [];
            modal.style.display = 'none';
        }

    })
}

showLibrary();
handleClicks();