import {Outlet} from "react-router-dom";
import {Fragment} from "react";

import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";


import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const  currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOut = () => {
        dispatch(signOutStart())
    }
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
                            <NavLink as='span' onClick={signOut}>Sign Out</NavLink>
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
