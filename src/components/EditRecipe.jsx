import { useParams } from "react-router-dom";
import Editor from "./Editor";
import { useEffect, useState } from "react";

const EditRecipe = ({ token }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [token, recipeId]);

  if (!parseInt(recipeId)) return <NotFound />;
  if (error) return <div className="pico">{error}</div>;

  return (
    <>
      {recipe ? (
        <Editor
          token={token}
          editRecipeId={recipeId}
          recipeTitle={recipe.title}
          recipeContent={recipe.content}
        />
      ) : (
        <section className="pico">
          <div aria-busy="true"></div>
        </section>
      )}
    </>
  );
};

export default EditRecipe;
