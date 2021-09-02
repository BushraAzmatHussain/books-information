const searchBook = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    console.log(searchText);

    searchFeild.value = '';
    const url =` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then (data => foundBooksNumber(data.docs, data.numFound));

}



// display found value
const foundBooksNumber = (docs,booksNumber) => {

    const booksContainer = document.getElementById('search-result');  
    if(booksNumber === 0){
        const dataFound = document.getElementById('books-found');
        dataFound.innerHTML = `
        <p class="text-center fw-bold">Not found any result</p>
        `;
        booksContainer.textContent = '';
    }
    else
    {
        const dataFound = document.getElementById('books-found');
        dataFound.innerHTML = `
        <h3 class="text-center m-3 p-5">Total found ${booksNumber} results</h3>
        `;
        booksContainer.textContent = '';
        docs.forEach(doc =>{
            console.log(doc);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img class="m-2 p-3" src=" https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${doc.title}</h5>
                    <p class="card-text fw-bold">Author : ${doc.author_name}</p>
                    <p class="card-text fw-bold">First published : ${doc.first_publish_year ? doc.first_publish_year : "Not found"}</p>
                    <p class="card-text fw-bold">Published by : ${doc.publisher ? doc.publisher : "Not found"}</p>
                </div>
            </div>
        `;
        
        booksContainer.appendChild(div);
    });
}
}
