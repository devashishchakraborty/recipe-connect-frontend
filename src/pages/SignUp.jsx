import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const createNewUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setNewUser({ name: "", email: "", password: "" });
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setEmailError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pico signUpSection container">
      <h1>Create Account</h1>
      <form onSubmit={createNewUser}>
        <input
          type="text"
          name="name"
          placeholder="Fullname"
          aria-label="Fullname"
          autoComplete="email"
          value={newUser.name}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, email: e.target.value }))
          }
          aria-describedby="invalid-helper"
          required
        />
        <small id="invalid-helper">{emailError}</small>

        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <input
          type="password"
          name="retypePassword"
          placeholder="Retype Password"
          aria-label="Retype Password"
          autoComplete="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // Only use aria-invalid if confirmPassword has some value
          {...(confirmPassword.length > 0
            ? { "aria-invalid": confirmPassword !== newUser.password }
            : {})}
          required
        />
        <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {!isSubmitting && "Sign Up"}
        </button>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </section>
  );
};

export default SignUp;
