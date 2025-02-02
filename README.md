## Recipe Finder

Recipe Finder is a web application that allows users to search for recipes by their names. The application provides detailed recipe information, including ingredients and instructions, and allows users to save their favorite recipes for easy access. This project is built using HTML, CSS, and JavaScript, and integrates with the MealDB API to fetch recipe data.

## Features

- **Search Recipes**: Search for recipes by entering their names.
- **View Recipe Details**: View detailed information about recipes, including ingredients and instructions.
- **Favorites**: Save your favorite recipes for quick access.
- **Responsive Design**: The application is designed to be responsive and user-friendly on various devices.
- **Instruction Videos**: Cooking video guides for easy meal preparation.

## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling of the web application.
- **JavaScript**: Logic and interaction of the web application.
- **MealDB API**: Fetching recipe data.

## Usage

1. Open `index.html` in your web browser.
2. Use the search bar to enter the name of a recipe and click "Search".
3. Browse the search results and click on "View Recipe" to see detailed information.
4. Click on "Add to Favorites" to save your favorite recipes.
5. View your saved recipes in the "Favorites" section.

## Usage Instructions

### Search for Recipes:

1. Enter a recipe name in the search box and click "Search".
2. Recipes containing the ingredient will be displayed.

### View Recipe Details:

1. Click "View Details" on any recipe to see detailed instructions and ingredients.

### Add to Favorites:

1. Click "Add to Favorites" to save the recipe.
2. Favorites will be displayed in the "Favorite Recipes" section and saved in local storage.

### Manage Favorites:

1. Click on a favorite recipe to search for it again.
2. Click the red "X" next to a favorite recipe to remove it from the list.

## API Usage

The project uses the MealDB API. Here’s an example of an API call:

```javascript
const fetchRecipes = async (searchInput) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response = await data.json();
    // handle the response
};
```