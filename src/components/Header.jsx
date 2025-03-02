import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { CartContext } from './CartProvider';
export default function Header({openCart}) {

    const cartContext = useContext(CartContext)
    // if(cartContext.cartItems.length>0){
    // const cartItemsCount = JSON.parse(localStorage.getItem('CartItems')).length;}

    return (
        <header id="main-header">
            <h2 id='title'>
                <img src={logo} alt='Food Logo' />
                Food Delivery at Door
            </h2>
            {<button className='text-button' onClick={openCart}>
                {cartContext.cartItems.length>0 ? `Cart(${cartContext.cartItems.length})` : 'Cart'}
            </button>}
        </header>
    )

}