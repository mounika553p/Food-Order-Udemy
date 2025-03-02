import { useState, useEffect, useContext } from "react"
import { getMeals } from "../http"
import MealItem from "./MealItem"
import {CartContext} from "./CartProvider"

export default function Meals({showError}) {

    const [isFetching, setIsFetching] = useState('')
    const [meals, setMeals] = useState([])

    // const [cartItems, setCartItems] = useState([]);
    const cartContext = useContext(CartContext)

    useEffect(() => {
        async function showMeals() {
            try {
                setIsFetching(true);
                setMeals(await getMeals());
                setIsFetching(false);
            } catch (error) {
                showError();
                console.log(error.message)
            }

        }
        showMeals();
    }, [])

    // function addItemToCart(id) {
    //     const itemExists = cartItems.find(cartItem => cartItem.id === id)
    //     if (itemExists) {
    //         setCartItems(
    //             (prevCartItems) => (
    //                 prevCartItems.map(item => (
    //                     item.id === id ? { ...item, count: item.count + 1 } : item
    //                 ))))

    //     } else {
    //         setCartItems((prevCartItems) => (
    //             [...prevCartItems, {
    //                 id: id, count: 1
    //             }]
    //         ))
    //     }
    //     console.log(cartItems)

    // }

    return (
        <>
            {isFetching && <p className='error'>....Loading available meals</p>}
            {!isFetching && meals.length > 0 &&
                <ul id='meals'>
                    {meals.map((meal) => (
                        <li key={meal.id}>
                            <MealItem meal={meal} addItem={cartContext.addToCart} />
                        </li>
                    ))}
                </ul>
            }

        </>
    )
}
