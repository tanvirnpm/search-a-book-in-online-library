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
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                </div>
            </div>
        `;
        getElement('bookDisplay').appendChild(div);
    })
}
