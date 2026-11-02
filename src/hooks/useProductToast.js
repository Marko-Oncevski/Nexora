import { useCallback, useEffect, useState } from "react";

export function useProductToast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) {
            return undefined;
        }

        const timeoutId = window.setTimeout(
            () => setToast(null),
            toast.variant === "login" ? 4000 : 3000
        );

        return () => window.clearTimeout(timeoutId);
    }, [toast]);

    const showToast = useCallback((variant, message) => {
        setToast({ variant, message });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return { toast, showToast, hideToast };
}
