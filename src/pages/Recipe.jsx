import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { formatTimestamp } from "../utils";
import "../styles/Recipe.css";
import Comments from "../components/Comments";
import NotFound from "../components/NotFound";

const Recipe = ({ token, user }) => {
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
    <div className="pico">
      {recipe ? (
        <>
          <section className="recipeContainer container">
            <h1>{recipe.title}</h1>
            <div className="recipeMeta">
              <span>{recipe.author.name}</span> &#8226;{" "}
              <span>{formatTimestamp(recipe.created_at)}</span>
            </div>
            <hr />
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {recipe.content}
            </Markdown>
          </section>
          <hr />
          <section className="commentSection  container">
            <Comments recipe={recipe} recipeId={recipeId} token={token} user={user} />
          </section>
        </>
      ) : (
        <div aria-busy="true"></div>
      )}
    </div>
  );
};

export default Recipe;
