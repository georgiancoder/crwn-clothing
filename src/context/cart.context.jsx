import {createContext, useReducer} from "react";

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    TOGGLE_CART: "TOGGLE_CART",
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalCount: 0,
    totalPrice: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...payload};
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {...state, isCartOpen: payload};
        default:
            throw new Error(`Unknown action type ${type}`);
    }
}

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
    const [{cartItems, isCartOpen, totalCount, totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
        const newCartTotal = newCartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, totalCount: newCartCount, totalPrice: newCartTotal}});
    }

    const removeItemFromCart = (item) => {
        const newCartItems = removeCartItem(cartItems, item);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (item) => {
        const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        updateCartItemsReducer(newCartItems);
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.TOGGLE_CART, payload: bool})
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

