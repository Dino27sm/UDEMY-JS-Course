import { async } from 'regenerator-runtime';
// Create Recipe
export const state = {
  recipe: {},
};

// Load Recipe
export const loadRecipe = async function (id) {
  const resp = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=a25e8781-846d-4299-aec1-c45ac5640dba`
  );

  const data = await resp.json();

  if (!resp.ok) throw new Error(`${data.message}---(${resp.status})`);

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
  // console.log(state.recipe);
};
