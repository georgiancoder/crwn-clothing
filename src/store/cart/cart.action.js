import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES} from "./cart.types";

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

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.TOGGLE_CART, boolean);

export const removeItemFromCart = (cartItems, item) => {
    const newCartItems = removeCartItem(cartItems, item);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, item) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
