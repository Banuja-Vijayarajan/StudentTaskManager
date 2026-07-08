const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Home Route
app.get("/", (req, res) => {
    res.send("TaskFlow Backend Running 🚀");
});

// Login Route
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    res.json({
        success: true,
        message: "Login Successful",
        user: email
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});