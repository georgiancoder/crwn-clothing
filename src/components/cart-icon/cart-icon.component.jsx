
import "./cart-icon.styles";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {setIsCartOpen} from "../../store/cart/cart.action";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";

const CartIcon = () => {
    const dispatch = useDispatch();
    const totalCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{totalCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
