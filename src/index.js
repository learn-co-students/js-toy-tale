const TOYS_URL = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function getAllToys() {
  // make a GET request to http://localhost:3000/toys
  return fetch(TOYS_URL)
  // => a Promise (request object)

  // takes the response from the server
  // & converts the JSON to Javascript
  .then(function(response) {
    return response.json()
  })
  // => Promise (Javascript ([{},{},{}]))
}

function createToy(toy) {
    return fetch(TOYS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(function(response) {
    return response.json();
  })
}

function updateLikes(toyId, likeCount) {
  return fetch(`${TOYS_URL}/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ likes: likeCount })
  })
}



const toyContainer = document.querySelector('#toy-collection');

getAllToys().then(function(myToys) {
  myToys.forEach(function(toy) {
    toyContainer.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-like-count=${toy.likes} data-toy-id=${toy.id} class="like-btn">Like <3</button>
    </div>`

  })
   // add them to the dom
   // make html from the data
})

const addToyForm = document.querySelector('#toy-form');

addToyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  const toyObject = {
    name: toyName,
    image: toyImage,
    likes: 0
  }
  createToy(toyObject).then(function(toyData) {
    toyContainer.innerHTML += `<div class="card">
      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p>${toyData.likes} Likes </p>
      <button data-like-count=${toyData.likes} data-toy-id=${toyData.id} class="like-btn">Like <3</button>
    </div>`

  })
})

// - when that button is clicked, use fetch to (POST) that new toy

toyContainer.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const likeButton = event.target;
    const currentLikes = Number(likeButton.dataset.likeCount)
    const updatdedLikes = currentLikes + 1;
likeButton.dataset.likeCount = updatdedLikes;
    likeButton.parentElement.querySelector('p').innerText = `${updatdedLikes} Likes`;


    updateLikes(likeButton.dataset.toyId, updatdedLikes)
  }
})
