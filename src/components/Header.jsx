import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../assets/svg/MainLogo";
import MdiAdd from "../assets/svg/MdiAdd";
import MdiLogout from "../assets/svg/MdiLogout";
import GridiconsPosts from "../assets/svg/GridiconsPosts";
import MdiAccount from "../assets/svg/MdiAccount";

const Header = ({ user, setUser, setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };
  return (
    <header className="pico container">
      <nav>
        <ul>
          <li>
            <Link to="/" className="mainLogo">
              <MainLogo />
              RecipeConnect
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <details className="dropdown">
                  <summary>Hi {user.name.split(" ")[0]}!</summary>
                  <ul>
                    <li>
                      <Link to="/profile">
                        <MdiAccount /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/recipes/new">
                        <MdiAdd /> Create New
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-recipes">
                        <GridiconsPosts /> My Recipes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        style={{ color: "crimson" }}
                        onClick={handleLogout}
                      >
                        <MdiLogout /> Logout
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
