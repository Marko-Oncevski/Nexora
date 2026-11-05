import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

function ProductList({selectedCategory}){
    const productPerPage = 21;
    const [page,setPage]= useState(1);
    const skip = (page - 1 ) * productPerPage;

    const url = selectedCategory ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${productPerPage}&skip=${skip}` : 
                                    `https://dummyjson.com/products?limit=${productPerPage}&skip=${skip}`
    const {loading,error,data} = useFetch(url);

    const products = Array.isArray(data?.products) ? data.products : [];
    const totalPages = Number.isFinite(data?.total) && data.total > 0
        ? Math.ceil(data.total / productPerPage)
        : 1;

    return (
        <>
            
            {error && <p>{error}</p>}

            <div className="products-grid">
                {loading &&
                    Array.from({ length: 6 }, (_, index) => (
                        <ProductSkeleton key={index} />
                ))}

                {!loading && !error && products.length === 0 && (
                    <p>No products found.</p>
                )}
                {!loading && !error && products.map(product => {
                    return (
                        <ProductCard
                            product={product}
                            key={product.id}
                        />
                    )
                })}

            </div>
            
            {!loading && !error && products.length > 0 && (
                <div className="pagination">
                    <p>Page {page} of {totalPages}</p>

                    <div className="pagination-buttons">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            

        </>
    );
}

export default ProductList;