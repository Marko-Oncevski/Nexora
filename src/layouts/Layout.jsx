import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

function Layout({setIsCartOpen,isCartOpen}){
    const drawerRef = useRef(null);
    const closeButtonRef = useRef(null);
    const openerRef = useRef(null);

    useEffect(() => {
        if (!isCartOpen) return undefined;

        const activeElement = document.activeElement;
        openerRef.current = activeElement instanceof HTMLElement ? activeElement : null;

        closeButtonRef.current?.focus();

        return () => {
            const opener = openerRef.current;

            if (opener?.isConnected) {
                opener.focus();
            }

            openerRef.current = null;
        };
    }, [isCartOpen]);

    useEffect(() => {
        if (!isCartOpen) return undefined;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.stopPropagation();
                setIsCartOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isCartOpen, setIsCartOpen]);

    useEffect(() => {
        if (!isCartOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isCartOpen]);

    function handleDrawerKeyDown(event) {
        if (event.key !== "Tab") return;

        const drawer = drawerRef.current;

        if (!drawer) return;

        const focusables = drawer.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    return (

        <div className="app">
            <Header setIsCartOpen={setIsCartOpen}/>
            <Outlet/>
            {isCartOpen && (
            <>
                <div
                    className='cart-overlay'
                    onClick={(()=> setIsCartOpen(false))}
                    aria-hidden="true"
                >

                </div>
                <aside
                    className="cart-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cart-drawer-title"
                    ref={drawerRef}
                    onKeyDown={handleDrawerKeyDown}
                >
                    <button
                        type="button"
                        onClick={(()=> setIsCartOpen(false))}
                        className='cart-close-button'
                        aria-label="Close cart"
                        ref={closeButtonRef}
                    >
                        <X size={22} strokeWidth={2} />
                    </button>
                    <Cart
                    />
                </aside>
            </>
            )}
            <Footer/>
        </div>

    );

}

export default Layout;