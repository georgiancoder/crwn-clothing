import {Outlet} from "react-router-dom";
import {Fragment} from "react";

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";


import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";

const Navigation = () => {
    const  currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
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
