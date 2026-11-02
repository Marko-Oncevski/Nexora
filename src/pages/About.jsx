
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function About() {
    usePageTitle("Nexora - About");

    return (
        <main className="about-page">
            <section className="about-intro">
                <p className="about-eyebrow">ABOUT NEXORA</p>

                <h1>
                    A simpler way to
                    <span> discover products.</span>
                </h1>

                <p className="about-lead">
                    Nexora is a demo online store built around one idea:
                    finding and exploring products should feel simple,
                    clear, and enjoyable.
                </p>

                <p className="about-description">
                    Instead of overwhelming you with complicated steps,
                    Nexora brings product browsing, search, detailed
                    product information, and a shopping cart together
                    in one convenient experience.
                </p>
            </section>

            <section className="about-purpose">
                <div className="about-purpose-brand">
                    <span>N</span>
                    <p>SHOP SMARTER.</p>
                    <p>LIVE BETTER.</p>
                </div>

                <div className="about-purpose-text">
                    <p className="about-eyebrow">OUR IDEA</p>
                    <h2>Designed around the way you shop.</h2>

                    <p>
                        Every part of Nexora has a purpose. You can browse
                        the catalog, search for a product, open its details,
                        and add it to your cart without losing track of
                        where you are.
                    </p>

                    <p>
                        The goal is a shopping experience that feels
                        organized, straightforward, and easy to navigate.
                    </p>
                </div>
            </section>

            <section className="about-features">
                <div className="about-section-heading">
                    <p className="about-eyebrow">WHAT YOU CAN DO</p>
                    <h2>Everything starts with discovery.</h2>
                    <p>
                        The main features that make up the Nexora experience.
                    </p>
                </div>

                <div className="about-feature-list">
                    <article className="about-feature">
                        <span className="about-feature-number">01</span>
                        <div>
                            <h3>Browse the catalog</h3>
                            <p>
                                Explore available products and use search
                                to find something that interests you.
                            </p>
                        </div>
                    </article>

                    <article className="about-feature">
                        <span className="about-feature-number">02</span>
                        <div>
                            <h3>Explore product details</h3>
                            <p>
                                View product images, descriptions, prices,
                                ratings, and stock information on a
                                dedicated page.
                            </p>
                        </div>
                    </article>

                    <article className="about-feature">
                        <span className="about-feature-number">03</span>
                        <div>
                            <h3>Manage your cart</h3>
                            <p>
                                Add products, adjust quantities, remove
                                items, and review your running total.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="about-project-note">
                <div>
                    <p className="about-eyebrow">THE PROJECT</p>
                    <h2>Built step by step.</h2>
                    <p>
                        Nexora is a capstone project created to bring
                        together modern frontend development concepts,
                        including reusable React components, API data,
                        and client-side navigation.
                    </p>
                </div>

                <Link to="/products" className="about-button">
                    Explore the store <span aria-hidden="true">→</span>
                </Link>
            </section>
        </main>
    );
}

export default About;