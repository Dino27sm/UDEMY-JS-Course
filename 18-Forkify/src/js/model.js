import { async } from 'regenerator-runtime';
import { getJSON, sendJSON } from './helpers.js';
import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { RES_PER_PAGE } from './config.js';
//-------------------------------------------------
// Create Recipe
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// Load Recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1; // Ressets the Page Number for each new search results
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  // Store recipes in Local Storage - first convert data to string
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getPersistBookmarks = function () {
  // Get stored recipes in Local Storage
  const localStoredBookmarks = localStorage.getItem('bookmarks');
  if (localStoredBookmarks) {
    state.bookmarks = JSON.parse(localStoredBookmarks);
  }
};

export const addBookmark = function (recipe) {
  // Add a bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true; // Here we set new property "bookmarked"
  }
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmarked recipe
  const indexDel = state.bookmarks.findIndex(elm => elm.id === id);
  state.bookmarks.splice(indexDel, 1);

  // Mark current recipe as NOT bookmarked
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredient format! Please, use the correct format! 😊'
          );
        }
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
