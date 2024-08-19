
import "./cart-icon.styles";
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const {totalCount} = useContext(CartContext);
    return (
        <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{totalCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
