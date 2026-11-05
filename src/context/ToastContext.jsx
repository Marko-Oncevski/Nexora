import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductToast from "../components/ProductToast";
import { useAuth } from "../hooks/useAuth";

export const ToastContext = createContext();

const TOAST_DURATION = {
    added: 3000,
    favorite: 3000,
    login: 4000
};

export function ToastProvider({ children }){
    const [toast, setToast] = useState(null);
    const toastIdRef = useRef(0);
    const { login } = useAuth();
    const { pathname } = useLocation();

    useEffect(()=>{
        if(!toast) return undefined;

        const duration = TOAST_DURATION[toast.variant] ?? 3000;

        const timeoutId = window.setTimeout(
            () => setToast(null),
            duration
        );

        return () => window.clearTimeout(timeoutId);
    },[toast]);

    function showToast(variant, message){
        toastIdRef.current += 1;
        setToast({ id: toastIdRef.current, variant, message, pathname });
    }

    function hideToast(){
        setToast(null);
    }

    function handleLogin(){
        login();
        hideToast();
    }

    const visibleToast =
        toast && toast.pathname === pathname ? toast : null;

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <ProductToast
                key={toast?.id}
                toast={visibleToast}
                onClose={hideToast}
                onLogin={handleLogin}
            />
        </ToastContext.Provider>
    );
}
