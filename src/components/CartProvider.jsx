import React, { createContext, useEffect, useState, useReducer } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, dispatch] = useReducer(cartReducer,[],() => {
                const storedCartItems = localStorage.getItem("CartItems");
                return storedCartItems ? JSON.parse(storedCartItems) : []
            });

    useEffect(() => {
        localStorage.removeItem('CartItems');
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = (id, name, price) => {
        const mealItem = { id: id, name: name, price: price }
        dispatch({ type: 'ADD_ITEM', payload: mealItem })
    };
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    function cartReducer(cartItems, action) {
        if (action.type === 'ADD_ITEM') {
            const itemExists = cartItems.findIndex(cartItem => cartItem.id === action.payload.id)
            if (itemExists > -1) {
                const updatedItems = [...cartItems];
                return updatedItems.map(item => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item));

            } else {
                return [...cartItems, {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: 1
                }]

            }
        } else if (action.type === 'REMOVE_ITEM') {
            const isMoreThanOne = cartItems.findIndex(cartItem => cartItem.quantity>1 && cartItem.id===action.payload)
                if (isMoreThanOne>-1) {
                    const updatedItems = [...cartItems];
                    return updatedItems.map(item => (item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item));
                }else {
                    const updatedItems = [...cartItems]
                    return updatedItems.filter(item => item.id!== action.payload)
                }

        } else if (action.type === 'CLEAR_CART') {
            return [];
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


    // const [cartItems, setCartItems] = useState(() => {
    //     const storedCartItems = localStorage.getItem("CartItems");
    //     return storedCartItems ? JSON.parse(storedCartItems) : []
    // });

        // function addToCart(id, name, price) {
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
    //                 id: id,
    //                 name: name,
    //                 price: price,
    //                 count: 1
    //             }]
    //         ))
    //     }

    // }

    // function removeFromCart(id) {
    //     const isMoreThanOne = cartItems.find(cartItem => cartItem.count>=1 && cartItem.id===id)
    //     console.log(isMoreThanOne.count, id, isMoreThanOne)
    //     if (isMoreThanOne.count>1) {
    //         setCartItems(
    //             (prevCartItems) => (
    //                 prevCartItems.map(item => (
    //                     item.id === id ? { ...item, count: item.count - 1 } : item
    //                 ))))

    //     }else {
    //         setCartItems((prevCartItems) => (
    //             prevCartItems.filter(item => item.id!== id)
    //         ))
    //     }
    // }

    // function clearCart(){
    //     setCartItems([]);
    // }