import {Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";


import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <div className='navigation'>
                <NavigationContainer>
                    <LogoContainer to="/">
                        <CrwnLogo className="logo"/>
                    </LogoContainer>
                    <NavLinks>
                        <NavLink to='shop'>
                            Shop
                        </NavLink>
                        {currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                        ) : (
                            <NavLink to='/auth'>Sign In</NavLink>
                        )}
                        <CartIcon/>
                    </NavLinks>
                    {isCartOpen && <CartDropdown/>}
                </NavigationContainer>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;
