"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import recipes from "../../server/recipes.json";

const MealPlanPage = () => {
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const generateMealPlan = () => {
    let newMealPlan: any = [];
    let ingredientsCount: any = {};

    for (let day = 0; day < numberOfDays; day++) {
      let dayPlan: any = { breakfast: null, lunch: null, dinner: null };

      ["breakfast", "lunch", "dinner"].forEach((mealType) => {
        const mealsOfType = recipes.filter(
          (recipe) => recipe.mealType === mealType
        );

        if (mealsOfType.length > 0) {
          const randomMeal =
            mealsOfType[Math.floor(Math.random() * mealsOfType.length)];
          dayPlan[mealType] = randomMeal.name;

          // Update ingredients count
          randomMeal.ingredients.forEach((ingredient) => {
            if (ingredientsCount[ingredient]) {
              ingredientsCount[ingredient]++;
            } else {
              ingredientsCount[ingredient] = 1;
            }
          });
        }
      });

      newMealPlan.push(dayPlan);
    }

    // Convert ingredients count to shopping list format
    let newShoppingList: any = Object.keys(ingredientsCount).map((ingredient) => {
      return `${ingredient} (${ingredientsCount[ingredient]})`;
    });

    setMealPlan(newMealPlan);
    setShoppingList(newShoppingList);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Meal Plan Generator</h1>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter number of days"
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            className="mr-2 p-2 border rounded"
            style={{ backgroundColor: "white", color: "black" }} // Ensures text is visible
          />
          <button
            onClick={generateMealPlan}
            className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Generate meals and shopping list
          </button>
        </div>
        {/* Display meal plan */}
        <div className="meal-plan">
          <h2 className="text-xl font-bold mb-3">Meal Plan</h2>
          {mealPlan.map((dayPlan, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">Day {index + 1}</h3>
              <ul>
                {Object.entries(dayPlan).map(([mealType, mealName]: any) => (
                  <li key={mealType}>
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:{" "}
                    {mealName || "No meal"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Display shopping list */}
        <div className="shopping-list mt-6">
          <h2 className="text-xl font-bold mb-3">Shopping List</h2>
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MealPlanPage;
