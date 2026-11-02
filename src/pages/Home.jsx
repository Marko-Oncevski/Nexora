import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
function Home() {
    usePageTitle("Nexora");

    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="home-copy">
                    <p className="home-eyebrow">
                        <span className="home-eyebrow-dot"></span>
                        WELCOME TO NEXORA
                    </p>

                    <h1 className="home-title">
                        Shop smarter.
                        <span>Live better.</span>
                    </h1>

                    <p className="home-description">
                        Discover products you'll love, explore new favorites,
                        and find everything you need in one place.
                        Your next great find is just a click away.
                    </p>

                    <div className="home-actions">
                        <Link
                            to="/products"
                            className="home-button home-button-primary"
                        >
                            Explore Products <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            to="/about"
                            className="home-button home-button-secondary"
                        >
                            About Nexora
                        </Link>
                    </div>

                    <p className="home-note">
                        Find it. Love it. Add it to your cart.
                    </p>
                </div>

                <div className="home-visual" aria-hidden="true">
                    <div className="home-glow"></div>

                    <div className="home-visual-label">
                        <span className="home-label-icon">N</span>
                        <span>NEXORA PICKS</span>
                    </div>

                    <div className="home-showcase">
                        <div className="home-showcase-icon">✦</div>

                        <p className="home-showcase-small">
                            YOUR NEXT FAVORITE
                        </p>

                        <h2>
                            Discover
                            <br />
                            something
                            <br />
                            <span>new.</span>
                        </h2>

                        <div className="home-showcase-bottom">
                            <span>Explore the collection</span>
                            <span>↗</span>
                        </div>
                    </div>

                    <div className="home-floating-card home-floating-top">
                        <span className="home-floating-icon">✧</span>
                        <div>
                            <strong>Fresh finds</strong>
                            <p>Explore something new</p>
                        </div>
                    </div>

                    <div className="home-floating-card home-floating-bottom">
                        <span className="home-floating-icon">
                            <ShoppingCart size={20} strokeWidth={2} />
                        </span>
                        <div>
                            <strong>Your next pick</strong>
                            <p>Just a click away</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-benefits">
                <div className="home-section-heading">
                    <p>THE NEXORA EXPERIENCE</p>
                    <h2>A simpler way to shop.</h2>
                </div>

                <div className="home-benefit-grid">
                    <article className="home-benefit-card">
                        <div className="home-benefit-icon">✦</div>
                        <h3>Discover more</h3>
                        <p>
                            Browse a variety of products and discover
                            something that fits your needs.
                        </p>
                    </article>

                    <article className="home-benefit-card">
                        <div className="home-benefit-icon">⌕</div>
                        <h3>Find your favorite</h3>
                        <p>
                            Search through products and open their details
                            to learn more before adding them to your cart.
                        </p>
                    </article>

                    <article className="home-benefit-card">
                        <div className="home-benefit-icon">
                            <ShoppingCart size={20} strokeWidth={2} />
                        </div>
                        <h3>Shop your way</h3>
                        <p>
                            Add products to your cart and manage your
                            selections in one convenient place.
                        </p>
                    </article>
                </div>
            </section>

            <section className="home-bottom-cta">
                <div>
                    <p>READY TO EXPLORE?</p>
                    <h2>Your next favorite is waiting.</h2>
                </div>

                <Link to="/products" className="home-button home-button-primary">
                    Browse Products 
                    <span aria-hidden="true">→</span>
                </Link>
            </section>
        </main>
    );
}

export default Home;