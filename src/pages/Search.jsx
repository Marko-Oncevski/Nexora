import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { usePageTitle } from "../hooks/usePageTitle";


export function Search() {
    usePageTitle("Nexora - Search");

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() ?? "";
    const {state,searchProducts} = useSearch();
    const {loading,error,results} = state;

    useEffect(()=>{
        if(query){
            searchProducts(query)
        }
    },[query,searchProducts])

    return (
        <section className="products-section">
            <div className="section-title">
                <p className="products-eyebrow">
                    SEARCH
                </p>

                <h2>Search Results</h2>
                {query && (
                    <p className="products-description">
                        Results for "{query}"
                    </p>
                )}
            </div>

            {!query ? null :loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : results.length > 0 ? (
                <div className="products-grid">
                    {results.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            
                        />
                    ))}
                </div>
            ) : (
                <p>No products found for "{query}".</p>
            )}
        </section>
    );
}