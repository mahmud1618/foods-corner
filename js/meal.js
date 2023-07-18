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
          </div>
        </div>
      `;
        mealContainer.appendChild(mealDiv);
    });
};

const searchMeal = () => {
    const searchText1 = document.getElementById('search-field').value;
    loadMeals(searchText1);
    document.getElementById('search-field').value = ''
};

loadMeals('chicken');
