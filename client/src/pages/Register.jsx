import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="logo">TaskFlow</h1>
        <p className="subtitle">
          Create your account and start managing tasks.
        </p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Create Account</button>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;