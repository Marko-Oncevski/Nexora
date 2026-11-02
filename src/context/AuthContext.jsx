import { createContext, useState } from "react";

export const AuthContext = createContext();

const DEMO_USER = { name: "User" };
const AUTH_STORAGE_KEY = "nexora-demo-auth";

function readStoredUser() {
    try {
        return localStorage.getItem(AUTH_STORAGE_KEY) === "true"
            ? DEMO_USER
            : null;
    } catch {
        return null;
    }
}

function persistAuth(isLoggedIn) {
    try {
        if (isLoggedIn) {
            localStorage.setItem(AUTH_STORAGE_KEY, "true");
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    } catch {
        // Storage may be unavailable; the session keeps working in memory.
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);

    function login() {
        setUser(DEMO_USER);
        persistAuth(true);
    }

    function logout() {
        setUser(null);
        persistAuth(false);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
