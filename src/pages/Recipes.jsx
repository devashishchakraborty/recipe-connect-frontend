import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clipText } from "../utils";
import Markdown from "react-markdown";
import MdiPublish from "../assets/svg/MdiPublish";
import MdiDelete from "../assets/svg/MdiDelete";
import MdiEdit from "../assets/svg/MdiEdit";
import MdiPublishOff from "../assets/svg/MdiPublishOff";
import "../styles/Recipes.css";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { formatTimestamp } from "../utils";

const Recipes = ({ token, user, all = false }) => {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/recipes/${all ? "" : `user`}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchRecipes();
  }, [all, token, user.id]);

  // Toggle published cell of the recipe
  const togglePublish = async (recipe) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/${recipe.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: `{ "published": ${!recipe.published} }`,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes((prevRecipes) =>
        prevRecipes.map((prev) => {
          return prev.id === recipe.id ? data : prev;
        })
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const recipe = await response.json();
      setRecipes((prevRecipes) =>
        prevRecipes.filter((prev) => prev.id != recipe.id)
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  if (error) return <section className="pico container">{error}</section>;
  return (
    <>
      <section className="pico container">
        <h1>Recipes</h1>
        {
          // If recipes array exists and has length > 0 then display the recipes
          recipes ? (
            recipes.length > 0 ? (
              <div className="recipes">
                {recipes.map((recipe) => (
                  <div className="recipe" key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>
                      <article>
                        <header>
                          <div>
                            <b>{recipe.title}</b>
                          </div>
                          {all ? (
                            <div className="recipeMeta">
                              <span>By {recipe.author.name}</span> &#8226;{" "}
                              <span>{formatTimestamp(recipe.created_at)}</span>
                            </div>
                          ) : (
                            <span
                              className="publishedStatus"
                              style={{
                                backgroundColor: recipe.published
                                  ? "green"
                                  : "#FF9500",
                              }}
                            >
                              &#9679;{" "}
                              {recipe.published ? "Published" : "Unpublished"}
                            </span>
                          )}
                        </header>
                        <Markdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeSanitize, rehypeRaw]}
                        >
                          {clipText(recipe.content)}
                        </Markdown>
                      </article>
                    </Link>
                    {all || (
                      <details className="dropdown recipeActions">
                        <summary>Update</summary>
                        <ul>
                          {recipe.author_id === user.id && (
                            <>
                              <li>
                                <Link to={`/recipes/${recipe.id}/edit`}>
                                  <MdiEdit />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  onClick={() => togglePublish(recipe)}
                                >
                                  {recipe.published ? (
                                    <>
                                      <MdiPublishOff />
                                      Unpublish
                                    </>
                                  ) : (
                                    <>
                                      <MdiPublish />
                                      Publish
                                    </>
                                  )}
                                </Link>
                              </li>
                            </>
                          )}

                          <li>
                            <Link
                              to="#"
                              style={{ color: "crimson" }}
                              onClick={() => deleteRecipe(recipe.id)}
                            >
                              <MdiDelete />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                It's empty in here. Publish a{" "}
                <Link to="/recipes/new">new recipe</Link>!
              </div>
            )
          ) : (
            // Else Show loading animation
            <div aria-busy="true"></div>
          )
        }
      </section>
    </>
  );
};

export default Recipes;
