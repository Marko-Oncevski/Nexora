import { createContext,useReducer ,useCallback,useRef} from "react";
import { products } from "../api/products";

export const SearchContext = createContext();
const  initialState = {
    results : [],
    loading : false,
    error : null,
    query : ""
}


export function searchReducer(state,action){
    switch(action.type){
        case "SEARCH_START":{
            return {
                ...state,
                loading: true,
                error: null,
                query: action.payload
            }
        }
        case "SEARCH_SUCCESS":{
            return {
                ...state,
                loading: false,
                error: null,
                results : action.payload
            }
        }
        case "SEARCH_ERROR":{
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        }
        default :
            return state
    }
}


export function SearchProvider({children}){
    const [state,dispatch] = useReducer(searchReducer,initialState);
    const latestRequestId = useRef(0);

    const searchProducts = useCallback(
    async (query) => {
        const requestId = ++latestRequestId.current;
        dispatch({type: "SEARCH_START",payload: query});
        try{
            const response = await products.search(query);
            if(requestId !== latestRequestId.current) return;
            const results = Array.isArray(response?.products) ? response.products : [];
            dispatch({type: "SEARCH_SUCCESS",payload: results})
        }catch(e){
            if(requestId !== latestRequestId.current) return;
            dispatch({type: "SEARCH_ERROR",payload: e.message})
        }  
    },[dispatch]
    );

    return (
        <SearchContext.Provider value={{state,dispatch,searchProducts}}>
            {children}
        </SearchContext.Provider>
    );
    
}


