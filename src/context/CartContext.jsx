import { createContext,useEffect,useReducer } from "react";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

const CART_STORAGE_KEY = "nexora-demo-cart";

function isValidCartItem(item){
    return (
        item !== null &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        item.id !== undefined &&
        typeof item.title === "string" &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    )
}

function readStoredCart(){
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);

        if(!stored){
            return []
        }

        const parsed = JSON.parse(stored);

        if(!Array.isArray(parsed)){
            return []
        }

        return parsed.filter(isValidCartItem);
    } catch {
        return []
    }
}

function writeStoredCart(items){
    try {
        localStorage.setItem(CART_STORAGE_KEY,JSON.stringify(items))
    } catch {
        // Storage may be unavailable or full; keep the in-memory cart working.
    }
}

function createInitialState(user){
    if(!user){
        return {
            items: [],
            ownerId: null
        }
    }

    return {
        items: readStoredCart(),
        ownerId: user.name
    }
}

function cartReducer(state,action){
    switch (action.type){
        case "ADD_ITEM":{
            const foundCart = state.items.find(product=> product.id === action.payload.id)
            if(foundCart){
                return {
                    ...state,
                    items: state.items.map(product=> {
                        if(product.id === action.payload.id){
                            return {
                                ...product,
                                quantity: product.quantity + 1
                            }
                        }
                        return product;
                    })
                    
                }
                
            }

            return {
                ...state,
                items: [...state.items,{...action.payload,quantity: 1}]
            }
        }
        case "REMOVE_ITEM":{
            const foundItem = state.items.find(product => product.id === action.payload.id)
            if(foundItem.quantity === 1){
                return {
                    ...state,
                    items: state.items.filter(product => product.id !== action.payload.id)
                }
            } else {
                return {
                    ...state,
                    items: state.items.map(product => {
                        if(product.id === action.payload.id){
                            return {
                                ...product,
                                quantity: product.quantity - 1
                            }
                        }
                        return product
                    })
                }

            }
            
        }
        case "CLEAR_CART":{
            return {
                ...state,
                items: []
            }
        }
        case "HYDRATE_CART":{
            return {
                ...state,
                items: action.payload.items,
                ownerId: action.payload.ownerId
            }
        }
        case "RESET_CART":{
            return {
                ...state,
                items: [],
                ownerId: null
            }
        }
        default:
            return state
    }
}


export function CartProvider({children}){
    const {user} = useAuth();
    const [state,dispatch] = useReducer(cartReducer,user,createInitialState);

    useEffect(()=>{
        if(user && state.ownerId !== user.name){
            dispatch({
                type: "HYDRATE_CART",
                payload: {
                    items: readStoredCart(),
                    ownerId: user.name
                }
            });
            return;
        }

        if(!user && state.ownerId){
            dispatch({type: "RESET_CART"});
        }
    },[user,state.ownerId]);

    useEffect(()=>{
        if(!user || state.ownerId !== user.name){
            return;
        }

        writeStoredCart(state.items);
    },[user,state.ownerId,state.items]);

    return (
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}
