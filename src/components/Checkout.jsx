import { useActionState, useContext } from 'react';
import { hasMinLength, isEmail, isNotEmpty, isPhoneNumber, isPostalCode } from '../utils/FormValidation.js'
import { createOrder } from '../http.js';
import { CartContext } from './CartProvider.jsx';

//useActionState is used to retain the form values when validation fails, instead of clearing the value from input fields
export default function Checkout({ closeCheckout, showErrorPage, showSuccessPage }) {

    const [formState, formAction] = useActionState(submitOrder, { errors: [] })
    const cartItems = useContext(CartContext);

    async function submitOrder(prevState, formData) {

        const customerData = Object.fromEntries(formData.entries());

        const email = formData.get("email");
        const postalCode = formData.get("postal-code");
        const street = formData.get("street");
        const city = formData.get("city");
        const name = formData.get("name")

        let errors = [];

        if (!isEmail(email)) {
            errors.push("Please enter a valid email including @");
        }
        if (!isPostalCode(postalCode)) {
            errors.push("Please enter a valid postal code with 5 digits");
        }
        if (!isNotEmpty(street) || !hasMinLength(street)) {
            errors.push("Please enter a valid street with 5-25 characters ")
        }
        if (!isNotEmpty(city) || !hasMinLength(city)) {
            errors.push("Please enter a valid city name")
        }
        if (!isNotEmpty(name) || !hasMinLength(name)) {
            errors.push("Please enter a full name between 5-25 characters ")
        }

        // const body = {
        //     order: {
        //         customer: {
        //             email: email,
        //             name: fullname,
        //             street: street,
        //             'postal-code': postalCode,
        //             city: city
        //         },
        //         items: [cartItems.cartItems],
        //     }
        // }
        const body = {
            order: {
                customer: customerData,
                items: [cartItems.cartItems],
            }
        }

        await callPost(body);

        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    fullname,
                    email,
                    street,
                    postalCode,
                    city
                },
            };
        }

        return { errors: null };
    }

    async function callPost(body){
        try {
            const response = await createOrder(body);
            if (response.ok) {
                cartItems.clearCart();
                showSuccessPage();
            }
            if (!response.ok) {
                showErrorPage();
            }
        } catch (Error) {
            showErrorPage();
        }

    }

    return (
        <div>
            <h2>Checkout</h2>
            <form action={formAction}>
                <span className="control">
                    <label forhtml='name'>Full Name </label>
                    <input name='name' defaultValue={formState.enteredValues?.fullname} required></input>
                </span>
                <span className="control">
                    <label forhtml='email'>Email Address</label>
                    <input type='email' name='email' defaultValue={formState.enteredValues?.email} required></input>
                </span>
                <span className="control">
                    <label forhtml='street'>Street </label>
                    <input name='street' defaultValue={formState.enteredValues?.street} required></input>
                </span>
                <span className="control-row">
                    <span className="control">
                        <label forhtml='postal-code'>Postal code </label>
                        <input name='postal-code' defaultValue={formState.enteredValues?.street} required></input>
                    </span>
                    <span className="control">
                        <label forhtml='city'>City </label>
                        <input name='city' defaultValue={formState.enteredValues?.city} required></input>
                    </span>
                </span>
                {formState.errors && (
                    <ul>
                        {formState.errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <span className="modal-actions">
                    <button onClick={closeCheckout} className="close-button">Close</button>
                    <button type="submit" className="button">Place Order</button>
                </span>
            </form>
        </div>
    )
}