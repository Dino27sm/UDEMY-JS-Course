//
// This API has been created by Jonas Schmedtmann !!!
// ******  https://forkify-api.herokuapp.com/v2  ******
//
// In original "index.html" enter type="module" in this line:
// "<script type="module" defer src="src/js/controller.js"></script>"
//
// First in command line of a terminal enter packages
// "core-js" and "regenerator-runtime":
// >npm i core-js regenerator-runtime (Enter)
// In this way we make sure that this application can be used with Old Browsers
import 'regenerator-runtime/runtime'; // For polyfilling "async/await"
import 'core-js/stable'; // For polyfilling everything else
//
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

// Next line is for "Parcel" - NOT for JS ----------------------
if (module.hot) {
  module.hot.accept();
}
//--------------------------------------------------------------
//
const controlRecipes = async function () {
  try {
    // "window.location.hash" goes throw enire URL to get "hash" value
    const recipeID = window.location.hash;
    const id = recipeID.slice(1); // Removes the first element - "#"

    if (!id) return; // Activates when there is no "#id" in the URL
    recipeView.renderSpinner();
    //
    // 0. Update the view of marked recipe from search recipes
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    //
    // 1. Loading recipe --------------------------------------
    await model.loadRecipe(id);
    //
    // 2. Rendering recipe ------------------------------------
    recipeView.render(model.state.recipe);
    //"render()" is a method in "View" class
    //--------------------------------------------------------------------
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get search result as a query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load of search results
    await model.loadSearchResults(query);

    // 3. Render search results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results); // Renders all results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render Initial Pagnation Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(`From control Search Results: ${err}`);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render NEW Pagination Buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update Recipe Servings in the "state" object
  model.updateServings(newServings);

  // Update the Recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // Updates only the changes in Servings
};

const controlAddBookmark = function () {
  // 1. Add / Remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new Recipe Data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render created Recipe
    recipeView.render(model.state.recipe);

    // Render Success message
    addRecipeView.renderMessage();

    // Close Form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message);
  }
};
//
const init = function () {
  // localStorage.clear('bookmarks'); // To delete Local Storage data
  model.getPersistBookmarks();
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick_PageBtn(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
