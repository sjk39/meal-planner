"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import recipes from "../../server/recipes.json";

const RecipesPage = () => {
  const [visibleRecipeId, setVisibleRecipeId] = useState<number | null>(null);

  const toggleIngredients = (id: number) => {
    if (visibleRecipeId === id) {
      setVisibleRecipeId(null);
    } else {
      setVisibleRecipeId(id);
    }
  };

  const renderRecipesByMealType = (mealType: string) => {
    return recipes
      .filter(recipe => recipe.mealType === mealType)
      .map(recipe => (
        <li key={recipe.id} className="mb-2">
          <div
            onClick={() => toggleIngredients(recipe.id)}
            className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            {visibleRecipeId === recipe.id && (
              <ul className="pl-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Recipes List</h1>

        <h2 className="text-xl font-bold my-3">Breakfast</h2>
        <ul className="list-none">{renderRecipesByMealType("breakfast")}</ul>

        <h2 className="text-xl font-bold my-3">Lunch</h2>
        <ul className="list-none">{renderRecipesByMealType("lunch")}</ul>

        <h2 className="text-xl font-bold my-3">Dinner</h2>
        <ul className="list-none">{renderRecipesByMealType("dinner")}</ul>
      </div>
    </Layout>
  );
};

export default RecipesPage;
