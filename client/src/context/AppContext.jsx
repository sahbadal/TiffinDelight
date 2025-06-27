import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets.js';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

console.log("BASE URL:", import.meta.env.VITE_BACKEND_URL);

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;


    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isProvider, setIsProvider] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    //fetch provider status
    const fetchProvider = async () => {
        try {
            const { data } = await axios.get('/api/provider/is-auth');
            console.log(data);
            if (data.success) {
                setIsProvider(true);
                setProvider(data.provider);
            } else {
                setIsProvider(false);
                setProvider(null);
            }
        } catch (error) {
            setIsProvider(false);
            if (error.response?.status !== 401) {
                console.error("Provider fetch error:", error);
            }
        }
    }

    // fetch admin status
    const fetchAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-auth');
            if (data.success) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            setIsAdmin(false);
            if (error.response?.status !== 401) {
                console.error("Admin fetch error:", error);
            }
        }
    }

    //fetch user auth status, user data and cartItems
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
            if (error.response?.status !== 401) {
                console.error("User fetch error:", error);
            }
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');

            if (data.success) {
                setProducts(data.products);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.error);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchAdmin();
        fetchProducts();
        fetchProvider();
    }, []);

    //update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if (user) {
            updateCart();
        }

    }, [cartItems]);


    // Function to add items to the cart
    const addToCart = (itemId) => {
        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart');
    }

    // update cart item count
    const updateCartItem = (itemId, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart updated');
    }

    // Function to remove items from the cart
    const removeFromCart = (itemId) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Removed from cart');
        setCartItems(cartData);
    }

    // get cart items count
    const getCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            count += cartItems[item];
        }
        return count;
    }

    // get cart items total price
    const getCartPrice = () => {
        let total = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (itemInfo) {
                total += itemInfo.offerPrice * cartItems[item];
            }
        }
        return Math.floor(total * 100) / 100;
    }

    const values = {
        navigate,
        user,
        setUser,
        isProvider,
        setIsProvider,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartPrice,
        axios,
        fetchProducts,
        setCartItems,
        provider,
        setProvider,
        isAdmin,
        setIsAdmin,
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}










