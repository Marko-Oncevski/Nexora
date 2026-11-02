import { useState } from "react";
import ProductList from "../components/ProductList";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
function Products() {
    usePageTitle("Nexora - Products");

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState("");
    const categoryLabels = {
        "": "All Products",
        smartphones: "Smartphones",
        laptops: "Laptops",
        furniture: "Furniture",
        beauty: "Beauty",
        groceries: "Groceries",
    };
    return (
        <section className="products-section">
            <div className="dashboard-layout">

                {/* Sidebar */}
                <aside className="products-sidebar">
                    <button
                        type="button"
                        className="categories-toggle"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        aria-expanded={isCategoriesOpen}
                        aria-controls="sidebar-category-list"
                    >
                        <span>{categoryLabels[selectedCategory]}</span>

                        {isCategoriesOpen ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </button>
                    <h3>Categories</h3>

                    <ul 
                        id="sidebar-category-list"
                        className={`sidebar-category-list ${isCategoriesOpen ? "open" : ""}`}>
                        <li className={`sidebar-category ${selectedCategory === "" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("")
                                    setIsCategoriesOpen(false)
                                }}
                                
                            >
                                All Products
                            </button>
                        </li>

                        <li className={`sidebar-category ${selectedCategory === "smartphones" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("smartphones")
                                    setIsCategoriesOpen(false)
                                }}
                            >
                                Smartphones
                            </button>
                        </li>

                        <li className={`sidebar-category ${selectedCategory === "laptops" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("laptops")
                                    setIsCategoriesOpen(false)
                                }}
                            >
                                Laptops
                            </button>
                        </li>

                        <li className={`sidebar-category ${selectedCategory === "furniture" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("furniture")
                                    setIsCategoriesOpen(false)
                                }}
                            >
                                Furniture
                            </button>
                        </li>

                        <li className={`sidebar-category ${selectedCategory === "beauty" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("beauty")
                                    setIsCategoriesOpen(false)
                                }}
                            >
                                Beauty
                            </button>
                        </li>

                        <li className={`sidebar-category ${selectedCategory === "groceries" ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("groceries")
                                    setIsCategoriesOpen(false)
                                }}
                            >
                                Groceries
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main content */}
                <main className="products-main">
                    <div className="section-title">
                        <p className="products-eyebrow">
                            THE COLLECTION
                        </p>

                        <h2>Find your next favorite.</h2>

                        <p className="products-description">
                            Explore our collection of products,
                            discover something new, and find what
                            works for you.
                        </p>
                    </div>

                    <ProductList selectedCategory={selectedCategory}/>
                </main>

            </div>
        </section>
    );
}

export default Products;