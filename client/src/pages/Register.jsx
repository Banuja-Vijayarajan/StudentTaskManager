import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Register.css";

import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

import { registerUser } from "../services/auth";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {

        await registerUser(email, password);

        alert("Registration Successful!");

        navigate("/");

    } catch (error) {

        alert(error.message);

    }

}

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
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        /> 

        <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <Button
            text="Create Account"
            onClick={handleRegister}
        />

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