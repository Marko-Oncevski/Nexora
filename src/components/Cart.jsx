import CartItem from "./CartItem";
import { useCart } from "../hooks/useCart";
import { ShoppingCart,ShoppingBag  } from "lucide-react";
function Cart(){
    const {state,dispatch} = useCart();
    const cart = state.items
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let totalItem = 0;

    {cart.forEach(item=>{
        totalItem+= item.quantity
    })}

    return (
        <div className="cart-container">

            <div className="cart-header">
                <div>
                    <h2 id="cart-drawer-title">Shopping Cart</h2>
                    <p>{totalItem} {totalItem === 1 ? "item" : "items"}</p>
                </div>

                <span className="cart-icon">
                    <ShoppingCart size={20} strokeWidth={2} />
                </span>
            </div>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-icon">
                        <ShoppingBag size={42} strokeWidth={1.6} />
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started.</p>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => {
                            return (
                                <CartItem
                                    key={item.id}
                                    cartItem={item}
                                />
                            )
                        })}
                    </div>

                    <div className="cart-summary">
                        <div className="total-row">
                            <span>Total</span>
                            <strong>${total.toFixed(2)}</strong>
                        </div>

                        <button className="clear-button" onClick={()=> dispatch({type: "CLEAR_CART"})}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
