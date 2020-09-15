import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
        <Link to='/shop' className='option'> SHOP</Link>
        <Link to='/shop' className='option'>CONTACT</Link>
        {
            currentUser?(
                <div className='option' onClick={()=>auth.signOut()}>
                SIGN OUT
                </div>): (
                    <Link to='/signin' className='option'>SIGN IN</Link>
                )
        }
        <CartIcon/>
        </div>
        {hidden?null:
        <CartDropdown/>
        }
    </div>
);
 
const mapStateToProps= createStructuredSelector({
   currentUser: selectCurrentUser,
   hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
