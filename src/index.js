// DISPLAY QUOTES
document.addEventListener("DOMContentLoaded", getQuotes())

function getQuotes() {
    API_URL = "http://localhost:3000/quotes?_embed=likes"
    fetch(API_URL).then(resp => resp.json()).then(data => renderQuotes(data))
};

function renderQuotes(data) {    
    // LOOP
    for (quoteObject of data) {
        createQuote(quoteObject)
    }    
}

function createQuote(quoteObject) {
    const quoteList = document.getElementById("quote-list")  
    const quoteBlock = document.createElement("blockquote")
    quoteBlock.class = "blockquote"
    quoteList.appendChild(quoteBlock)
    
    // Create card element
    // Create card's information holders
    // Assign classes to info holders
    // Give text to info
    // Add functionality (if needed)

    // Card
    const quoteCard = document.createElement("li")
    quoteCard.class = "quote-card"
    quoteCard.id = quoteObject.id

    // Quotation
    let quote = document.createElement("p")
    quote.class = "mb-0"
    quote.innerText = quoteObject.quote
    quoteCard.appendChild(quote)

    //Author
    let author = document.createElement("footer")
    author.class = "blockquote-footer"
    author.innerText = quoteObject.author
    quoteCard.appendChild(author)

    //Break
    let breakTag = document.createElement("br")
    quoteCard.appendChild(breakTag)

    //Likes
    let likes = quoteObject.likes
    let likesCount = likes ? likes.length : 0

    //Like Button
    let likeBtn = document.createElement("button")
    let findCounter = likeBtn.childNodes

    likeBtn.class = "btn-success"
    likeBtn.innerHTML = `Likes ${likesCount}`
    findCounter.innerHTML = `${likesCount}`
    

    likeBtn.addEventListener("click", function(e) {
        likeQuote(e)
    })
    quoteCard.appendChild(likeBtn)

    //Delete
    let deleteBtn = document.createElement("button")
    deleteBtn.class = "btn-danger"
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener("click", (e) => deleteQuote(e))
    quoteCard.appendChild(deleteBtn)
    
    quoteBlock.appendChild(quoteCard)
}

// ADD NEW QUOTE
const submitQuote = document.getElementById('new-quote-form')

submitQuote.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const quote = e.target.quote.value
    const author = e.target.author.value
    
    submitQuote.reset();
    
    const newQuote = {quote, author}

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newQuote)
    })
    .then(resp => resp.json())
    .then(data => createQuote(data))
})

// DELETE A QUOTE
function deleteQuote(e) {
    let quoteCard = e.target.parentElement
    let id = quoteCard.id
    // debugger
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({id})
    })
        // .then(console.log)
        // .then(response => response.json())
        // .then(console.log)
        .then(() => quoteCard.parentElement.remove())
}

// LIKE A QUOTE
function likeQuote(e) {
    const quoteId = parseInt(e.target.parentElement.id, 10)

    newLike = {quoteId}

    LIKE_URL = "http://localhost:3000/likes"

    fetch(LIKE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newLike)
    })
    .then(response => response.json())
    .then(data => getCurrentLikes(data))
}

function getCurrentLikes(like) {
    let id = like.quoteId
    let url = `http://localhost:3000/quotes/${id}?_embed=likes`
    fetch(url)
        .then(function refreshPage(){
            window.location.reload();
        })
}


// refreshPage(){
    //     window.location.reload();
    // }
    // fetch(API_URL).then(resp => resp.json()).then(data => showQuotes(data))


    // fetch(API_URL, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //     },
    //     body: JSON.stringify(newQuote)
    // })
    // .then(resp => resp.json())
    // .then(data => showQuotes([data]))
