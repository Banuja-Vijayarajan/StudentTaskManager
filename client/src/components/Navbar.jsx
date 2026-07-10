import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";

function Navbar() {

    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to logout.");
        }
    }

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                background: "#5b4bdb",
                color: "white",
            }}
        >
            <h2>TaskFlow</h2>

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;