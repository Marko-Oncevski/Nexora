import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { useProductToast } from "../hooks/useProductToast";
import ProductToast from "./ProductToast";

function ProductCard({product}){
    const {dispatch} = useCart();
    const { user, login } = useAuth();
    const {favorites,toggleFavorite} = useFavorites()
    const foundFavorite = favorites.find(item => item.id === product.id);
    const isFavorite = Boolean(user && foundFavorite);
    const { toast, showToast, hideToast } = useProductToast();

    function handleAddToCart() {
        if (!user) {
            showToast("login", "Please log in to add products to your cart.");
            return;
        }

        dispatch({type: "ADD_ITEM", payload: product});
        showToast("added", `${product.title} was added successfully.`);
    }

    function handleFavoriteClick() {
        if (!user) {
            showToast("login", "Please log in to add products to your favorites.");
            return;
        }

        toggleFavorite(product);

        if (!foundFavorite) {
            showToast("favorite", `"${product.title}" is now in your favorites.`);
        }
    }

    function handleToastLogin() {
        login();
        hideToast();
    }

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                />

                <button
                    type="button"
                    className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
                    onClick={handleFavoriteClick}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
            </div>
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-price">${product.price}</p>
            </div>

            <button className="add-button" onClick={handleAddToCart}>
                Add to Cart
            </button>

            <Link to={`/products/${product.id}`} className="details-button">View Details</Link>

            <ProductToast
                toast={toast}
                onClose={hideToast}
                onLogin={handleToastLogin}
            />
        </div>
    );
}

export default ProductCard
