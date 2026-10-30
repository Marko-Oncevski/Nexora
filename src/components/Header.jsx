import { Moon, Sun ,ShoppingCart,Menu,X } from "lucide-react";
import { useEffect, useState,useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {NavLink,useNavigate,useSearchParams} from "react-router-dom";
import { useCart } from "../hooks/useCart";



function Header({  setIsCartOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {state} = useCart();



    let cartCount = 0;
    state.items.forEach(item => {
        cartCount += item.quantity
    })
    
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") ?? "";
    const [search, setSearch] = useState(query);
    const {theme,setTheme} = useContext(ThemeContext)

    useEffect(() => {
        setSearch(query);
    }, [query]);

    function handleSearch(e) {
        e.preventDefault();

        const term = search.trim();

        if (!term) {
            navigate("/products");
            return;
        }

        navigate(`/search?q=${encodeURIComponent(term)}`);
    }


    return (
        <>

            <header className="header">



                <div className="brand">
                    <div className="logo-icon">N</div>

                    <div className="brand-text">
                        <h1>Nexora</h1>
                        <p>Shop smarter. Live better.</p>
                    </div>
                </div>

                <form
                    className="header-search-form"
                    onSubmit={handleSearch}
                >
                    <div className="header-search-box">
                        <input
                            className="header-search-input"
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            className="search-icon-button"
                            aria-label="Submit search"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="21"
                                height="21"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>
                        </button>
                    </div>
                </form>





                <nav
                    id="primary-navigation"
                    className={isMenuOpen ? "open" : ""}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Favorites
                    </NavLink>
                </nav>


                <button
                        className="cart-button"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <span className="cart-button-icon">
                            <ShoppingCart size={20} strokeWidth={2} />
                        </span>
                        <span>Cart</span>
                        <span className="cart-count">{cartCount}</span>
                </button>

                 <button
                    type="button"
                    className="menu-toggle-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>


                <div className="header-actions">

                    <button
                        type="button"
                        className="theme-toggle-floating"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        aria-pressed={theme === "dark"}
                    >
                        {theme === "light" ? (
                            <Moon size={22} strokeWidth={2} />
                        ) : (
                            <Sun size={22} strokeWidth={2} />
                        )}
                    </button>


                </div>

            </header>
        </>
    );
}

export default Header;
