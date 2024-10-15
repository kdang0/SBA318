const button = document.getElementById("submit");
const option = document.getElementById("restaurants");
const infContainer = document.getElementById("restInfo");
const genContainer = document.getElementById("generalInfo");
button.addEventListener("click", async function (e) {
  e.preventDefault();
  const id = option.value;
  console.log(option.value);
  window.location.href = `http://localhost:4500/restaurant/${id}`;
});

function addGlobalEventListener(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

function createReviewPanel(data, id) {
  genContainer.innerHTML = "";
  const reviewsContainer = document.createElement("div");
  reviewsContainer.setAttribute("id", "reviewsContainer");
  genContainer.appendChild(reviewsContainer);
  for (review of data) {
    const reviewPanel = `  
            <div class="reviewContainer">
                <h3>${review.customerName}</h3>
                <div class="dateRate">
                    <p>${review.rating} stars</p>
                    <p>${review.date}</p>
                </div>
                <p>${review.reviewText}</p>
            </div>
            `;
    reviewsContainer.innerHTML += reviewPanel;
  }

  const reviewForm = `
        <div id="form">
         <div>
         <label for="rating">Rating:</label>
         <input type="number" id="rating" name="rating" min="1" max="5" 
         step=0.1>
         </div>
            <textarea
  name="review"
  id="reviewContent"
  rows="5"
  cols="30"
  placeholder="Write your review"></textarea>
            <button id="submitReview" value=${id}>Submit</button>
        </div>
    `;
  genContainer.innerHTML += reviewForm;
};

function createChickenPanel(data){
    genContainer.innerHTML = "";
    const chickenPanel = `
        <h3>${data.name}</h3>
        <p>Origin: ${data.origin}</p>
        <p>${data.description}</p>
        <p>Cooking time: ${data.cookingTime}</p>
        <p>Spiciness Level: ${data.spicinessLevel}</p>
        <p>Popularity: ${data.popularity}</p>
        <p>Suggestion: ${data.servingSuggestions}</p>
    `
    genContainer.innerHTML = chickenPanel;
    const ul = document.createElement('ul');
    for(ingredient of data.mainIngredients){
        console.log(ingredient);
        const li = document.createElement('li');
        li.textContent = ingredient;
        ul.appendChild(li);
    };
    const suggestion = document.createElement('p');
    suggestion.textContent = "Main Ingredients:"
    genContainer.appendChild(suggestion);
    genContainer.appendChild(ul);
}



//GET RESTAURANT REVIEWS
addGlobalEventListener(
  "click",
  "#review",
  async (e) => {
    const id = e.target.value;
    const result = await fetch(`http://localhost:4500/reviews/restaurant/${id}`);
    const data = await result.json();
    console.log(data);
    if (data) {
      createReviewPanel(data, id);
    }
  },
  infContainer
);


//POST RESTAURANT REVIEW
addGlobalEventListener("click", "#submitReview", async (e) => {
  e.preventDefault();

  const rating = document.getElementById("rating");
  const content = document.getElementById("reviewContent");
  const button = document.getElementById("submitReview");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const result = await fetch(`/reviews/restaurant/${button.value}`, {
    method: "POST",
    body: JSON.stringify({ review: content.value, rating: rating.value }),
    headers: myHeaders,
  });
  const data = await result.json();
  console.log(data);
  if (data && !('error' in data)) {
    content.value = "";
    rating.value = "";
    const reviewPanel = `
            <div id="review${data.reviewId}" class="reviewContainer">
                <h3>${data.customerName}</h3>
                <div class="dateRate">
                    <p>${data.rating} stars</p>
                    <p>${data.date}</p>
                </div>
                <p>${data.reviewText}</p>
                <div>
                  <button id="edit" value=${data.reviewId}>Edit</button>
                  <button id="delete" value=${data.reviewId}>Delete</button>
                </div>
            </div>
            `;
    const reviewContainer = document.getElementById("reviewsContainer");
    if(reviewContainer) reviewContainer.innerHTML += reviewPanel;
  }
});

//DELETE RESTAURANT REVIEW
addGlobalEventListener("click", "#delete", async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const result = await fetch(`http://localhost:4500/reviews/${e.target.value}`, {
        method: 'DELETE',
    });
    const data = await result.json();
    console.log(data);
    const reviewContainer = document.getElementById(`review${e.target.value}`);
    if(reviewContainer) reviewContainer.remove();
});

//Send to editing page
addGlobalEventListener('click', '#edit', async(e) => {
    e.preventDefault();
    console.log(e.target.value);
    window.location.href=`http://localhost:4500/reviews/${e.target.value}`;
});

//PATCH RESTAURANT REVIEW
addGlobalEventListener('click', '#save', async(e)=> {
    e.preventDefault();
    const rating = document.getElementById("rating");
    const content = document.getElementById("reviewContent");
    const button = document.getElementById("save");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const result = await fetch(`http://localhost:4500/reviews/${button.value}`, {
        method: "PATCH",
        body: JSON.stringify({ reviewText: content.value, rating: rating.value }),
        headers: myHeaders
    });
    const data = await result.json();
    if(data){
        window.location.href = `http://localhost:4500/restaurant/${data.restaurantId}`;
    }

});



//GET CHICKEN 
addGlobalEventListener('click', '#chicken', async(e) => {
    e.preventDefault();
    const button = document.getElementById("chicken");
    const result =  await fetch(`http://localhost:4500/chicken/restaurant/${button.value}`);
    const data = await result.json();
    if(data){
        createChickenPanel(data);
    }
});
