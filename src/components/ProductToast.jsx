import { createPortal } from "react-dom";
import { CheckCircle2, Heart, LockKeyhole, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function ProductToast({ toast, onClose, onLogin }) {
    const { user } = useAuth();

    if (!toast || (toast.variant === "login" && user)) {
        return null;
    }

    if (toast.variant === "added" || toast.variant === "favorite") {
        const isFavorite = toast.variant === "favorite";

        return createPortal(
            <div className="cart-added-toast" role="status">
                {isFavorite ? (
                    <Heart size={20} aria-hidden="true" />
                ) : (
                    <CheckCircle2 size={20} aria-hidden="true" />
                )}
                <div className="cart-added-toast-content">
                    <strong>{isFavorite ? "Added to favorites." : "Added to cart"}</strong>
                    <span>{toast.message}</span>
                </div>
                <button
                    type="button"
                    className="cart-added-toast-close"
                    onClick={onClose}
                    aria-label={
                        isFavorite
                            ? "Close added to favorites notification"
                            : "Close added to cart notification"
                    }
                >
                    <X size={18} aria-hidden="true" />
                </button>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="login-required-toast" role="status">
            <LockKeyhole size={20} aria-hidden="true" />
            <div className="login-required-toast-content">
                <strong>Login required</strong>
                <span>{toast.message}</span>
            </div>
            <button
                type="button"
                className="login-required-toast-login"
                onClick={onLogin}
            >
                Log in
            </button>
            <button
                type="button"
                className="login-required-toast-close"
                onClick={onClose}
                aria-label="Close login required notification"
            >
                <X size={18} aria-hidden="true" />
            </button>
        </div>,
        document.body
    );
}

export default ProductToast;
