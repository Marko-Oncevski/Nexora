import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

const THEME_STORAGE_KEY = "nexora-theme";
const DEFAULT_THEME = "light";

function isValidTheme(value){
    return value === "light" || value === "dark";
}

function readStoredTheme(){
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return isValidTheme(stored) ? stored : DEFAULT_THEME;
    } catch {
        return DEFAULT_THEME;
    }
}

function applyTheme(theme){
    if(typeof document === "undefined" || !document.body){
        return;
    }

    document.body.dataset.theme = theme;
}

const initialTheme = readStoredTheme();
applyTheme(initialTheme);

export function ThemeProvider({children}){
    const [theme,setTheme] = useState(initialTheme);

    useEffect(()=>{
        applyTheme(theme);

        try {
            localStorage.setItem(THEME_STORAGE_KEY,theme);
        } catch {
            // Storage may be unavailable or full; the UI keeps working.
        }
    },[theme]);

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
