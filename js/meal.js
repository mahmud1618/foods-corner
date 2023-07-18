const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
};

const displayMeals = meals => {
  const mealContainer = document.getElementById('meals-container');
  mealContainer.innerHTML = ''; // Clear previous search results
  meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col');
    mealDiv.innerHTML = `
        <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="loadMealDetail('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailsModal">Details</button>
          </div>
        </div>
      `;
    mealContainer.appendChild(mealDiv);
  });
};

const searchMeal = () => {
  const searchText = document.getElementById('search-field').value;
  loadMeals(searchText);
  document.getElementById('search-field').value = '';
};

const loadMealDetail = idMeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
};

const displayMealDetails = meal => {
  const mealTitle = document.getElementById('mealDetailsModalLabel');
  const mealBody = document.getElementById('mealDetailsBody');

  mealTitle.innerText = meal.strMeal;
  mealBody.innerHTML = `
    <img class ="img-fluid" src="${meal.strMealThumb}" alt="Meal Image">
    <h3>Category: ${meal.strCategory}</h3>
    <h4>Area: ${meal.strArea}</h4>
    <h5>Instructions: ${meal.strInstructions}</h5>
  `;
};

loadMeals('chicken');
