import { Link } from "react-router-dom";
import "../styles/Register.css";

import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

function Register() {
  return (
    <div className="register-container">

      <Card className="register-card">

        <h1 className="logo">TaskFlow</h1>

        <p className="subtitle">
          Create your account.
        </p>

        <Input
          type="text"
          placeholder="Full Name"
        />

        <Input
          type="email"
          placeholder="Email"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button text="Create Account" />

        <p className="login-text">
          Already have an account?
          {" "}
          <Link to="/">Login</Link>
        </p>

      </Card>

    </div>
  );
}

export default Register;