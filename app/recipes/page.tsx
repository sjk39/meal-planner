import Link from "next/link";
import Layout from "../../components/layout";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
}

interface RecipesPageProps {
  recipes: Recipe[];
}

const recipesDefault = [
  {
    id: 1,
    name: "Chocolate Cake",
    ingredients: ["milk", "eggs", "flour", "chocolate"],
  },
  { id: 2, name: "Pasta Carbonara", ingredients: [] },
  // ... other recipes
];

const RecipesPage: React.FC<RecipesPageProps> = ({
  recipes = recipesDefault,
}) => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Recipes List</h1>
        <ul className="list-none">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="mb-2">
              <Link href={`/recipes/${recipe.id}`} passHref>
                <div className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                  <h2 className="text-xl font-semibold">{recipe.name}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default RecipesPage;
