import { useEffect, useState } from 'react'
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import { Route,Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import { Search } from './pages/Search';
import Favorites from './pages/Favorites'


function App() {
  

  const [isCartOpen,setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!isCartOpen) return;

    const previousTitle = document.title;
    document.title = "Nexora - Cart";

    return () => {
      document.title = previousTitle;
    };
  }, [isCartOpen]);




  return (
    <Routes>
      <Route element={<Layout 
       
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}

      />}>
        <Route index  element={<Home/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='products/:id' element={<ProductDetails/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='search' element={<Search /> } />
        <Route path= 'favorites' element={<Favorites/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
      
    
    </Routes>
  );

}

export default App