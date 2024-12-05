import React, { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.ingredients.trim())
      newErrors.ingredients = "Ingredients are required.";
    else if (formData.ingredients.split("\n").length < 2)
      newErrors.ingredients = "Please provide at least two ingredients.";
    if (!formData.steps.trim()) newErrors.steps = "Preparation steps are required.";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ title: "", ingredients: "", steps: "" });
    setErrors({});
    alert("Recipe submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter the recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
            placeholder="Enter each ingredient on a new line"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Preparation Steps */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Preparation Steps
          </label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.steps ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="6"
            placeholder="Describe the preparation steps"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;