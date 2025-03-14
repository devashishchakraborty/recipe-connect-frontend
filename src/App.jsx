import { Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import { useEffect, useState } from "react";
import "@picocss/pico/css/pico.conditional.min.css";
import "@mdxeditor/editor/style.css";
import "./App.css";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const protectRoute = (component) => {
    return user ? component : <Navigate to="/login" />;
  };
  const redirectLoggedInUser = (component) => {
    return user ? <Navigate to="/recipes" /> : component;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);
  return (
    <>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <main>
        <Routes>
          <Route path="/" element={redirectLoggedInUser(<Home />)} />
          <Route
            path="/login"
            element={redirectLoggedInUser(
              <Login setUser={setUser} setToken={setToken} />
            )}
          />
          <Route path="/sign-up" element={redirectLoggedInUser(<SignUp />)} />

          <Route path="/recipes">
            <Route
              index
              element={protectRoute(
                <Recipes token={token} user={user} all={true} />
              )}
            />
            <Route
              path="new"
              element={protectRoute(<CreateRecipe token={token} />)}
            />
            <Route
              path=":recipeId"
              element={protectRoute(<Recipe token={token} user={user} />)}
            />
            <Route
              path=":recipeId/edit"
              element={protectRoute(<EditRecipe token={token} />)}
            />
          </Route>
          <Route
            path="/my-recipes"
            element={protectRoute(<Recipes user={user} token={token} />)}
          />
          <Route
            path="/profile"
            element={protectRoute(<Profile user={user} token={token} />)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
