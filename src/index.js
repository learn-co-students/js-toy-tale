const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const image = e.target.image.value;
      createNewToy(name, image).then(newToy => {
        toyCollectionDiv.innerHTML += createToyDiv(newToy)
      });
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
const getAndysToys = () => {
  fetch(`http://localhost:3000/toys`)
    .then(response => response.json())
    .then((toys) => {
      toys.forEach((toy) => {
        const toyDiv = createToyDiv(toy)
        toyCollectionDiv.innerHTML += toyDiv
      })
    })
}

const createNewToy = (name, imageURL) => {
  const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: imageURL,
        likes: 0
      })
    }
    return fetch('http://localhost:3000/toys', settings)
    .then(response => response.json())
}


getAndysToys()

// document.addEventListener('DOMContentLoaded', getAndysToys)

const createToyDiv = (toyData) => {
  return (
    `<div class="card">
        <h2>${toyData.name}</h2>
        <img src="${toyData.image}" class="toy-avatar" />
        <p data-like-count="${toyData.likes}">${toyData.likes} Likes </p>
        <button data-id="${toyData.id}" class="like-btn">Like <3</button>
      </div>`
    )
}

toyCollectionDiv.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
    console.log('i have no clue what to log')
    const foundCardDiv = e.target.parentElement;
    const p = foundCardDiv.querySelector('p');
    const cardId = e.target.dataset.id;
    const updatedLikeCount = parseInt(p.dataset.likeCount)+1;
    updateLikes(cardId, updatedLikeCount).then((updatedToy) => {
      p.innerText = `${updatedToy.likes} Likes `
      p.dataset.likeCount = updatedToy.likes
    })
  }
})

const updateLikes = (id, number) => {
  const settings = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: number
      })
    }
    return fetch(`http://localhost:3000/toys/${id}`, settings)
    .then(response => response.json())
    // hold off for now
}
