import { createContext ,useState,useEffect} from "react";
export const FavoritesContext = createContext();

function isValidFavorite(item){
    return (
        item !== null &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        item.id !== undefined
    )
}

export function FavoritesProvider({children}){
    const [favorites,setFavorites] = useState(()=>{
        try {
            const savedItems = localStorage.getItem("nexora-favorites")

            if(!savedItems) return []

            const parsed = JSON.parse(savedItems)

            return Array.isArray(parsed) ? parsed.filter(isValidFavorite) : []
        } catch {
            return []
        }
    })

    useEffect(()=> {
        try {
            localStorage.setItem("nexora-favorites",JSON.stringify(favorites))
        } catch {
            // Storage may be unavailable or full; keep the in-memory favorites working.
        }
    },[favorites])

    function toggleFavorite(product){
        setFavorites(prevFavorites => {
            const foundFavorite = prevFavorites.find(item => item.id === product.id)

            if(foundFavorite){
                return prevFavorites.filter(item => item.id !== product.id)
            }

            return [...prevFavorites, product]
        })
    }

    return (
        <FavoritesContext.Provider value={{toggleFavorite,favorites}}>
            {children}
        </FavoritesContext.Provider>
    );
}