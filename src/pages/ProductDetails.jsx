import { useParams,useNavigate,Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useProductToast } from "../hooks/useProductToast";
import ProductToast from "../components/ProductToast";

function ProductDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {loading,error,data} = useFetch(`https://dummyjson.com/products/${id}`);
    const {dispatch} = useCart();
    const {user,login} = useAuth();
    const {toast,showToast,hideToast} = useProductToast();

    function handleAddToCart() {
        if (!user) {
            showToast("login", "Please log in to add products to your cart.");
            return;
        }

        dispatch({type: "ADD_ITEM", payload: data});
        showToast("added", `${data.title} was added successfully.`);
    }

    function handleToastLogin() {
        login();
        hideToast();
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    
    return (
        <div className="product-details">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>

                <span className="breadcrumb-separator">/</span>

                <Link to="/products">Products</Link>

                <span className="breadcrumb-separator">/</span>

                <span className="breadcrumb-current" aria-current="page">
                    {data.title}
                </span>
            </nav>
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back to Products
            </button>

            <div className="details-card">
                <div className="details-image">
                    <img src={data.images[0]} alt={data.title}/>
                </div>

                <div className="details-info">
                    <p className="details-category">
                        {data.category}
                    </p>

                    <h2>
                        {data.title}
                    </h2>

                    <p className="details-price">
                        ${data.price.toFixed(2)}
                    </p>

                    <p className="details-description">
                        {data.description}
                    </p>

                    <div className="details-extra">
                        <span>⭐ Rating: {data.rating}</span>
                        <span>📦 Stock: {data.stock}</span>
                    </div>

                    <div className="details-actions">
                        <button
                            type="button"
                            className="add-button"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <ProductToast
                toast={toast}
                onClose={hideToast}
                onLogin={handleToastLogin}
            />
        </div>
    );
}

export default ProductDetails;
