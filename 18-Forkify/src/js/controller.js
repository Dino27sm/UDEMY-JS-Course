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
// Inform "parcel" where icons come from ------------------
import icons from 'url:../img/icons.svg';
//---------------------------------------------------------
//
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// This API has been created by Jonas Schmedtmann !!!
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//
const renderSpinner = function (parentElm) {
  const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
  parentElm.innerHTML = '';
  parentElm.insertAdjacentHTML('afterbegin', markup);
};
//
const showRecipe = async function () {
  try {
    renderSpinner(recipeContainer);
    // 1. Loading recipe ----------------------------------
    //
    // const resp = await fetch(
    //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=bab9ff97-e55d-4b3b-b84d-8cfa4a60a6df'
    // );
    const resp = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e82b4?key=bab9ff97-e55d-4b3b-b84d-8cfa4a60a6df'
    );

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(`${data.message}---(${resp.status})`);
    }

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2. Rendering recipe -------------------------------------
    const markup = `<figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}g#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ingr => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingr.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingr.unit}</span>
          ${ingr.description}
              </div>
            </li>`;
            })
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    //----------------- Inserting "markup" into the DOM ------------------
    recipeContainer.innerHTML = ''; // First Delete the previous data in the box
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    //--------------------------------------------------------------------
  } catch (err) {
    console.log(err.message);
  }
};

showRecipe();
