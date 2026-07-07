import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">TaskFlow</h1>
        <p className="subtitle">
          Organize your tasks. Achieve your goals.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Enter your password"
        />

        <button>Login</button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;