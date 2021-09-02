// get element by id
const getElement = (id) => {
    return document.getElementById(id);
}
// get book list from api after submit
const getBooksFromApi = event => {
    event.preventDefault();
    const searchText = getElement('searchInput').value;
    console.log(searchText);
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBooks(data))
}
// display books
const displayBooks = books => {
    if(books.numFound === 0){
        getElement('helpInput').innerText = 'No Result'
        getElement('helpInput').classList.add('text-danger')
    }else{
        getElement('helpInput').innerText = `Found ${books.numFound} results`
        getElement('helpInput').classList.add('text-success')
    }
    books.docs.forEach(book=>{
        const div = document.createElement('div');
        div.classList.add('col-4');
        div.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="Book Cover">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <h5 class="card-subtitle">Author: ${book.author_name}</h5>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                    <p class="card-text">Publish Date: ${book.publish_date}</p>
                    <p class="card-text">Publish Year: ${book.publish_year}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    </div>
                </div>
                </div>
            </div>
        `;
        getElement('bookDisplay').appendChild(div);
    })
}
