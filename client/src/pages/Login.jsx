import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

async function handleLogin() {

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {

        await loginUser(email, password);

        alert("Login Successful!");

        navigate("/dashboard");

    } catch (error) {

        alert(error.message);

    }

}

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
                    text="Login"
                    onClick={handleLogin}
                />

                <p className="register-text">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </Card>

        </div>
    );
}

export default Login;