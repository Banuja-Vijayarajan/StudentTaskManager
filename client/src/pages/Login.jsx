import { Link } from "react-router-dom";
import "../styles/Login.css";

import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

function Login() {
  return (
    <div className="login-container">

      <Card className="login-card">

        <h1 className="logo">TaskFlow</h1>

        <p className="subtitle">
          Organize your tasks. Achieve your goals.
        </p>

        <Input
          type="email"
          placeholder="Email"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button text="Login" />

        <p className="register-text">
          Don't have an account?
          {" "}
          <Link to="/register">Register</Link>
        </p>

      </Card>

    </div>
  );
}

export default Login;