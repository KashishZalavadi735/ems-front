import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

function RequireAuth({ children }: Props) {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
        return <Navigate to="/Login" replace />
    }

  return children
}

export default RequireAuth;