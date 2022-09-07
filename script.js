const books = document.querySelector('.books');
const addBookFormDisplay = document.querySelector('.addBook');
const forum = document.querySelector('.form');
const forumCross = document.querySelector('.form img');
const booksButton = document.querySelector('.booksButton');
const title = document.querySelector('.title input');
const author = document.querySelector('.author input');
const pages = document.querySelector('.pages input');
const read = document.querySelector('#read');
const addBook = document.querySelector('.submit button');
const actform = document.querySelector('.form form');

let library = [{title: 'The Catcher in the Rye', author: 'J. D. Salinger', pages: 277, isRead: true},
            {title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', pages: 1728, isRead: false}];
let objBook;

function Book (title, author, pages, isRead) {
    // constructer
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(e) {
    e.preventDefault();
    let alreadyInLibrary = false;

    library.map(obj => {
        if ((obj.title).toLowerCase === (title.value).toLowerCase && (obj.author).toLowerCase === (author.value).toLowerCase && obj.pages === pages.value) {
            alreadyInLibrary = true;
            alert(`${title.value} already exists in Library`);
        }
    })

    if (alreadyInLibrary) return;

    let bookInfo = new Book(title.value, author.value, pages.value, read.checked);
    library.push(bookInfo);
    display((title.value, author.value, pages.value, read.checked));
}

function display(title, author, pages, read) {
    books.innerHTML = ''; // prevents duplication;
    library.map(eachBookObj => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="inputs">
                <button>Delete</button>
                <label for="read">
                    Read<span><div></div><span>
                </label>
            </div>
        `;
        let index = library.indexOf(eachBookObj);
        div.classList.add(`book${index}`);
        div.classList.add(`active`);
        div.setAttribute(`data-book`, `${index}`);
        books.appendChild(div);
        for (let key in eachBookObj) {
            const booksInfo = document.createElement('div');
            booksInfo.classList.add(`${key}`);
            booksInfo.innerHTML = `
                ${key === 'title' ? `${eachBookObj[key]}` : key === 'author' ? `by ${eachBookObj[key]}` : key === 'pages' ? `${eachBookObj[key]} pages` : ''}                               
            `;
            div.appendChild(booksInfo);
            if (key === 'isRead') {
                if (eachBookObj[key]) {
                    (document.querySelector(`.book${index}`)).classList.add('read');
                } else {
                    (document.querySelector(`.book${index}`)).classList.remove('read');
                }
            }
            
        }

        
    })


    const toggleRead = document.querySelectorAll('.books .inputs label');
    const delButton = document.querySelectorAll('.books .inputs button');

    toggleRead.forEach(label => label.addEventListener('click', (e) => {
        library[(((label.parentElement).parentElement).dataset.book)].isRead ? library[(((label.parentElement).parentElement).dataset.book)].isRead = false : library[(((label.parentElement).parentElement).dataset.book)].isRead = true; //update Object
        display();
    }))

    delButton.forEach(button => button.addEventListener('click', (e) => {
        library.splice((((button.parentElement).parentElement).dataset.book), (((button.parentElement).parentElement).dataset.book) + 1)
        display();
    }))
}

function addBookForm () {
    forum.style = 'display: flex;';
    booksButton.style = 'filter: blur(4px);';
    addBookFormDisplay.classList.remove('enabled');
    addBookFormDisplay.disabled = true;
    (document.querySelectorAll('.books > div')).forEach(div => {
        div.classList.remove('active');
    });

    (document.querySelectorAll('.books .inputs > *')).forEach(inp => {
        inp.disabled = true;
    });

}

function crossForm() {
    actform.reset();
    forum.style = 'display: none;';
    booksButton.style = 'filter: none;';
    addBookFormDisplay.classList.add('enabled');
    addBookFormDisplay.disabled = false;
    (document.querySelectorAll('.books > div')).forEach(div => {
        div.classList.add('active');
    });

    (document.querySelectorAll('.books .inputs > *')).forEach(inp => {
        inp.disabled = false;
    });
}

addBookFormDisplay.addEventListener('click', addBookForm);
forumCross.addEventListener('click', crossForm);
actform.addEventListener('submit', addBookToLibrary);
actform.addEventListener('submit', crossForm);


display();