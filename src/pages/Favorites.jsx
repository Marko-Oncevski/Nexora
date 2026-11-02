import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import ProductCard from "../components/ProductCard";


function Favorites() {
    usePageTitle("Nexora - Favorites");

    const { favorites } = useFavorites();
    const { user } = useAuth();
    const visibleFavorites = user ? favorites : [];

    return (
        <section className="products-section favorites-section">
            <div className="section-title favorites-heading">
                <p className="products-eyebrow">
                    YOUR COLLECTION
                </p>

                <h1>My Favorites</h1>

                <p className="products-description">
                    {visibleFavorites.length}{" "}
                    {visibleFavorites.length === 1
                        ? "favorite product"
                        : "favorite products"}
                </p>
            </div>

            {visibleFavorites.length === 0 ? (
                <div className="favorites-empty">
                    <span className="favorites-empty-icon">♡</span>

                    <h2>No favorites yet</h2>

                    <p>
                        Explore our collection and tap the heart
                        to save products you love.
                    </p>
                </div>
            ) : (
                <div className="products-grid favorites-grid">
                    {visibleFavorites.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Favorites;
