import * as model from './model.js';
import recipeView from './views/recipeView.js';
//
// First in command line of a terminal enter packages
// "core-js" and "regenerator-runtime":
// >npm i core-js regenerator-runtime (Enter)
// In this way we make sure that this application can be used with Old Browsers
import 'regenerator-runtime/runtime'; // For polyfilling "async/await"
import 'core-js/stable'; // For polyfilling everything else
//
// In original "index.html" enter type="module" in this line:
// "<script type="module" defer src="src/js/controller.js"></script>"
//
const recipeContainer = document.querySelector('.recipe');

// This API has been created by Jonas Schmedtmann !!!
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//
const controlRecipes = async function () {
  try {
    // "window.location.hash" goes throw enire URL to get "hash" value
    const recipeID = window.location.hash;
    const id = recipeID.slice(1); // Removes the first element - "#"

    if (!id) return; // Activates when there is no "#id" in the URL
    recipeView.renderSpinner();
    //
    // 1. Loading recipe --------------------------------------
    await model.loadRecipe(id);
    //
    // 2. Rendering recipe ------------------------------------
    recipeView.render(model.state.recipe);
    //"render()" is a method in "RecipeView" class

    //--------------------------------------------------------------------
  } catch (err) {
    recipeView.renderError(err);
    // console.log(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
