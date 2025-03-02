import { useContext } from "react"
import { CartContext } from "./CartProvider"

export default function Cart({ closeCart, openCheckout }) {

    const cartContext = useContext(CartContext);
    // const cartContext = JSON.parse(localStorage.getItem(cartItems));

    const total = cartContext.cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0)

    return (
        <div className="cart">
            <h2>Your Cart</h2>

            {cartContext.cartItems.length === 0 && <h3> No Items in cart</h3>}
            {cartContext.cartItems.length > 0 && <ul>
                {cartContext.cartItems.map(cartItem => (
                    <li key={cartItem.id} className="cart-item">
                        <span>{cartItem.name} - {cartItem.quantity} X {cartItem.price}</span>
                        <span className="cart-item-actions">
                            <button onClick={() => cartContext.removeFromCart(cartItem.id)}>
                                -
                            </button>
                            {cartItem.quantity}
                            <button onClick={() => cartContext.addToCart(cartItem.id, cartItem.name, cartItem.price)}>
                                +
                            </button>
                        </span>
                    </li>
                ))}
            </ul>}
            <span className="total">Total: {total}</span>
            <span className="modal-actions">
                <button className="close-button" onClick={closeCart}>Close</button>
                <button className="button" onClick={openCheckout}>Go to Checkout</button>
            </span>

        </div>
    )
}
