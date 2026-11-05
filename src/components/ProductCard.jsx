import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

const FALLBACK_PRODUCT_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f1f5f9'/%3E%3Cpath d='M90 210l45-55 35 40 25-30 35 45z' fill='%23cbd5e1'/%3E%3Ccircle cx='195' cy='105' r='18' fill='%23cbd5e1'/%3E%3C/svg%3E";

function ProductCard({product}){
    const {dispatch} = useCart();
    const { user } = useAuth();
    const {favorites,toggleFavorite} = useFavorites()
    const foundFavorite = favorites.find(item => item.id === product.id);
    const isFavorite = Boolean(user && foundFavorite);
    const { showToast } = useToast();

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

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.images?.[0] || FALLBACK_PRODUCT_IMAGE}
                    alt={product.title || "Product"}
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
        </div>
    );
}

export default ProductCard
