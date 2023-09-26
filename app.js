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

}

function showLibraryData() {

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
    if (titleInput.value !== '' && authorInput.value !== '' && pagesInput.value !== '')
        if (checkbox.checked)
            addToLibrary(titleInput.value, authorInput.value, pagesInput.value, true)
        else
            addToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
    form.reset();
}

function handleClicks() {
    document.addEventListener('click', (event) => {

    })
}

function handleModal() {

}