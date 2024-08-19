import Button from "../button/button.component";


import {useContext} from "react";
import {CartContext} from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                        cartItems.map((product) => (
                            <CartItem key={product.id} cartItem={product}/>
                        )) : (
                            <EmptyMessage>
                                Your cart is empty
                            </EmptyMessage>
                        )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;
