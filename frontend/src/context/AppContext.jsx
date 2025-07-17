import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from './../assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {


    const currency = "$"
    const navigate = useNavigate();
    const [user, setUser] = useState(true)
    const [isSaller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    useEffect(()=> {
        fetchProducts();
    }, []);

    const value = { navigate, user, setUser, isSaller, setIsSeller, showUserLogin, setShowUserLogin, products, setProducts, currency };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}