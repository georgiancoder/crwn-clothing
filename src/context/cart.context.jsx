import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const item = cartItems.find((item) => item.id === productToAdd.id);
    if (item){
        return cartItems.map(cartItem => (cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem))
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const item = cartItems.find((item) => item.id === productToRemove.id);

    if (item && item.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem => (cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem))
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    totalCount: 0,
    totalPrice: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalCount(cartItems.reduce((acc, curr) => acc + curr.quantity, 0))
    }, [cartItems]);

    useEffect(() => {
        setTotalPrice(cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0))
    }, [cartItems]);

    const removeItemFromCart = (item) => {
        setCartItems(removeCartItem(cartItems, item));
    }

    const clearItemFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        totalCount,
        removeItemFromCart,
        clearItemFromCart,
        totalPrice
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

