const searchBox = document.querySelector('.searchBox');
const searchBtn = document.getElementById('search-button');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailContent = document.querySelector('.recipeDetailContent');
const recipeClosebtn = document.querySelector('.recipeClosebtn');
const body = document.getElementById('body');

const fetchRecipes = async (searchInput) => {
    recipeContainer.innerHTML = `<h2 style="margin-top: 180px;">Fetching Recipes...</h2>`;
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response = await data.json();

    body.style.background = 'none';
    body.style.backgroundColor = '#EEEEEE';
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        <div>
        <p class="tooltip">Read Instructions</p>
        </div>
        `
        const addFavoriteButton = document.createElement("button");
        addFavoriteButton.textContent = "Add to Favorites";
        recipeDiv.appendChild(addFavoriteButton)
        addFavoriteButton.addEventListener("click", () => {
            addToFavorites(meal);
        });
        const detailButton = document.createElement("button");
        detailButton.textContent = "View Details";
        recipeDiv.appendChild(detailButton)
        detailButton.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchInput = searchBox.value;
    if (searchInput.trim() !== "") {
        searchInput = searchInput.split(' ').join('+');
    }
    if (searchInput !== "") fetchRecipes(searchInput);
})

const fetchIngredents = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${ingredient} - ${measure}</li>`
        } else break;
    }
    return ingredientList;
}

const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents : </h3>
        <ul class="ingredientList">${fetchIngredents(meal)}</ul>
        <div class="instructions">
            <h3>Instructions : </h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `
    recipeDetailContent.parentElement.style.display = "block";
}

recipeClosebtn.addEventListener('click', () => {
    recipeDetailContent.parentElement.style.display = "none";
})

function addToFavorites(meal) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];  
    if (!favorites.includes(meal.strMeal)) {
        favorites.push(meal.strMeal);  
        localStorage.setItem("favorites", JSON.stringify(favorites));

        const favoritesList = document.getElementById("favorites-list");
        const favoriteRecipe = document.createElement("li");
        favoriteRecipe.innerHTML = `${meal.strMeal} <span><i class="fas fa-times favRemove"></i></span>`;
        favoriteRecipe.addEventListener("click", () => {
            searchForFavorite(meal.strMeal);
        });
        favoriteRecipe.querySelector('.favRemove').addEventListener("click", (e) => {
            e.stopPropagation();
            removeFavorite(meal.strMeal);
        });
        favoritesList.appendChild(favoriteRecipe);
    }
}

function searchForFavorite(mealName) {
    searchBox.value = mealName;
    searchBtn.click();
}

window.addEventListener("load", () => {
    const favoritesList = document.getElementById("favorites-list");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((favorite) => {
        const favoriteRecipe = document.createElement("li");
        favoriteRecipe.innerHTML = `${favorite} <span><i class="fas fa-times favRemove"></i></span>`;
        favoriteRecipe.addEventListener("click", () => {
            searchForFavorite(favorite);
        });
        favoriteRecipe.querySelector('.favRemove').addEventListener("click", (e) => {
            e.stopPropagation();
            removeFavorite(favorite);
        });
        favoritesList.appendChild(favoriteRecipe);
    });
});

function removeFavorite(mealName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((favorite) => favorite !== mealName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const favoritesList = document.getElementById("favorites-list");
    const favoriteItems = favoritesList.getElementsByTagName("li");
    for (let i = 0; i < favoriteItems.length; i++) {
        if (favoriteItems[i].textContent.trim() === mealName) {
            favoritesList.removeChild(favoriteItems[i]);
            break;
        }
    }
}
