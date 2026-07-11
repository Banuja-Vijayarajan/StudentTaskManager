import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

function ProtectedRoute({ children }) {

    if (!auth.currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;