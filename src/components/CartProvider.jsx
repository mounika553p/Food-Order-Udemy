import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(()=>{
        const storedCartItems = localStorage.getItem("CartItems");
        return storedCartItems ?  JSON.parse(storedCartItems):[]
    });


    useEffect(()=>{
        localStorage.removeItem('CartItems');
        localStorage.setItem('CartItems',JSON.stringify(cartItems));
    },[cartItems])

    function addToCart(id, name, price) {
        const itemExists = cartItems.find(cartItem => cartItem.id === id)
        if (itemExists) {
            setCartItems(
                (prevCartItems) => (
                    prevCartItems.map(item => (
                        item.id === id ? { ...item, count: item.count + 1 } : item
                    ))))

        } else {
            setCartItems((prevCartItems) => (
                [...prevCartItems, {
                    id: id,
                    name: name,
                    price: price,
                    count: 1
                }]
            ))
        }
        
    }

    function removeFromCart(id) {
        const isMoreThanOne = cartItems.find(cartItem => cartItem.count>=1 && cartItem.id===id)
        console.log(isMoreThanOne.count, id, isMoreThanOne)
        if (isMoreThanOne.count>1) {
            setCartItems(
                (prevCartItems) => (
                    prevCartItems.map(item => (
                        item.id === id ? { ...item, count: item.count - 1 } : item
                    ))))

        }else {
            setCartItems((prevCartItems) => (
                prevCartItems.filter(item => item.id!== id)
            ))
        }
    }

    function clearCart(){
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};