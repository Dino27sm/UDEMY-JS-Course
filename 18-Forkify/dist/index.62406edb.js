const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// This API has been created by Jonas Schmedtmann !!!
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
//
const showRecipe = async function() {
    try {
        // const resp = await fetch(
        //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=bab9ff97-e55d-4b3b-b84d-8cfa4a60a6df'
        // );
        const resp = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e82b4?key=bab9ff97-e55d-4b3b-b84d-8cfa4a60a6df");
        const data = await resp.json();
        if (!resp.ok) throw new Error(`${data.message}---(${resp.status})`);
        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (err) {
        console.log(err.message);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
