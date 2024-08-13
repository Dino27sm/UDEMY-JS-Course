import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
//-------------------------------------------------
// Create Recipe
export const state = {
  recipe: {},
};

// Load Recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `${API_URL}/${id}?key=a25e8781-846d-4299-aec1-c45ac5640dba`
    );

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err}`);
  }
};
