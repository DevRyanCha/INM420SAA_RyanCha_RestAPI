async function searchCocktail() {
  const input = document.getElementById('cocktailInput').value.trim();
  const resultBox = document.getElementById('cocktailResult');

  if (!input) {
    resultBox.innerHTML = "<p>Please enter a cocktail name.</p>";
    return;
  }

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const drink = data.drinks ? data.drinks[0] : null;

    if (drink) {
      let ingredientsList = "<ul>";
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
          ingredientsList += `<li>${measure ? measure : ""} ${ingredient}</li>`;
        }
      }
      ingredientsList += "</ul>";

      resultBox.innerHTML = `
        <h3>${drink.strDrink}</h3>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Glass Type:</strong> ${drink.strGlass}</p>
        <p><strong>Ingredients:</strong> ${ingredientsList}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
      `;
    } else {
      resultBox.innerHTML = "<p>No cocktail found with that name.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultBox.innerHTML = "<p>There was an error fetching the data. Please try again later.</p>";
  }
}