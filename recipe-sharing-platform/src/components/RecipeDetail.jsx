import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the data from the public folder
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return response.json();
      })
      .then((data) => {
        // Find the recipe with the matching ID
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  // If recipe is not yet loaded
  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="container mx-auto p-4 shadow">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-h-80 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{recipe.summary}</p>
  
      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-600">
            {ingredient}
          </li>
        ))}
      </ul>
  
      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-600 leading-relaxed">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;