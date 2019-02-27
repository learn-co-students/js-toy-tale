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

// get data from our API
const getToys = () => {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
}

const createToy = (data) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}

const updateLikes = (toyId, likeCount) => {
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ likes: likeCount })
  })
    .then(response => response.json())
}

// create the HTML we want to show
const createToyCard = (data) => {
  return `<div class="card">
    <h2>${data.name}</h2>
    <img src=${data.image} class="toy-avatar" />
    <p>${data.likes} Likes </p>
    <button class="like-btn" data-toy-id=${data.id} data-like-count=${data.likes}>Like <3</button>
  </div>`;
}


// find the element we want to attach to
const toyContainer = document.querySelector('#toy-collection');


// put it all together!
getToys().then((toys) => {
  toys.forEach((toy) => {
    const toyCard = createToyCard(toy);
    toyContainer.innerHTML += toyCard;
  })
})

toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const toyData = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  createToy(toyData).then((toy) => {
    const toyCard = createToyCard(toy);
    toyContainer.innerHTML += toyCard;
  })
})

toyContainer.addEventListener('click', (event) => {
  switch(event.target.tagName) {
    case 'BUTTON':
      const likeCount = parseInt(event.target.dataset.likeCount);
      const newCount = likeCount + 1;

      event.target.dataset.likeCount = newCount;
      event.target.parentElement.querySelector('p').innerText = `${newCount} Likes`;

      updateLikes(event.target.dataset.toyId, newCount);
      break;
  }
})
