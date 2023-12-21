"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import recipes from "../../server/recipes.json";

const MealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState<any>([
    { breakfast: null, lunch: null, dinner: null },
  ]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const addMealToPlan = (
    dayIndex: number,
    mealType: "breakfast" | "lunch" | "dinner",
    mealName: string
  ) => {
    const newMealPlan = [...mealPlan];
    newMealPlan[dayIndex][mealType] = mealName === "" ? null : mealName;
    setMealPlan(newMealPlan);
    updateShoppingList(newMealPlan);
  };

  const updateShoppingList = (updatedMealPlan: any) => {
    let ingredientsCount: { [key: string]: number } = {};

    updatedMealPlan.forEach((day: any) => {
      ["breakfast", "lunch", "dinner"].forEach((mealType: any) => {
        const mealName = day[mealType];
        if (mealName) {
          const meal = recipes.find((recipe) => recipe.name === mealName);
          meal?.ingredients.forEach((ingredient) => {
            ingredientsCount[ingredient] =
              (ingredientsCount[ingredient] || 0) + 1;
          });
        }
      });
    });

    const newShoppingList = Object.keys(ingredientsCount).map((ingredient) => {
      return `${ingredient} (${ingredientsCount[ingredient]})`;
    });

    setShoppingList(newShoppingList);
  };

  const addDay = () => {
    setMealPlan([...mealPlan, { breakfast: null, lunch: null, dinner: null }]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Custom Meal Plan Builder</h1>
        {mealPlan.map((day: any, dayIndex: any) => (
          <div key={dayIndex} className="day-plan mb-4">
            <h2 className="text-lg font-bold">Day {dayIndex + 1}</h2>
            {["breakfast", "lunch", "dinner"].map((mealType: any) => (
              <div key={mealType} className="meal-selection">
                <select
                  value={day[mealType] || ""}
                  onChange={(e) =>
                    addMealToPlan(dayIndex, mealType, e.target.value)
                  }
                  className="mr-2 p-2 border rounded text-black"
                >
                  <option value="">{`Select ${mealType}`}</option>
                  {recipes
                    .filter((recipe) => recipe.mealType === mealType)
                    .map((recipe) => (
                      <option key={recipe.name} value={recipe.name}>
                        {recipe.name}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={addDay}
          className="mt-2 p-2 border rounded bg-green-500 text-white hover:bg-green-600"
        >
          Add Another Day
        </button>

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
