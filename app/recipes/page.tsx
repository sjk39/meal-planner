"use client";
import Link from "next/link";
import Layout from "../components/layout";
import recipes from "../../server/recipes.json";
import { useState } from "react";

// type Recipe = {
//   id: number;
//   name: string;
//   ingredients: string[];
// }

// type RecipesPageProps = {
//   recipes: Recipe[];
// }

const recipesDefault = recipes
  ? recipes
  : [
      {
        id: 1,
        name: "Chocolate Cake",
        ingredients: ["milk", "eggs", "flour", "chocolate"],
        mealType: "dinner",
      },
      { id: 2, name: "Pasta Carbonara", ingredients: [], mealType: "dinner" },
      // ... other recipes
    ];

const RecipesPage: React.FC<any> = ({ recipes = recipesDefault }) => {
  const [visibleRecipeId, setVisibleRecipeId] = useState<number | null>(null);

  const toggleIngredients = (id: number) => {
    if (visibleRecipeId === id) {
      setVisibleRecipeId(null); // Hide if the same recipe is clicked again
    } else {
      setVisibleRecipeId(id); // Show new recipe's ingredients
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Recipes List</h1>
        <ul className="list-none">
          {recipes.map((recipe: any) => (
            <li key={recipe.id} className="mb-2">
              <div
                onClick={() => toggleIngredients(recipe.id)}
                className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                {visibleRecipeId === recipe.id && (
                  <ul className="pl-4">
                    {recipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default RecipesPage;
