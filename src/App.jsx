import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartProvider";
import { useState } from "react";
import Modal from "./components/Modal";
import Checkout from "./components/Checkout";
import ErrorPage from "./components/ErrorPage";
import OrderSuccess from "./components/OrderSuccess";

function App() {

  const[showModal, setShowModal] = useState('')

  return (
    <>
      <CartProvider>
        <Header openCart={() => setShowModal('cart')}
          showError={() => setShowModal('error')} />
        <Meals showError={()=>setShowModal('error')}/>
        <Modal open={showModal==='cart'}>
          <Cart closeCart={() => setShowModal('')} 
          openCheckout={() => {
            // setOpenCart(false)
            setShowModal('checkout')
          }} />
        </Modal>
        <Modal open={showModal==='checkout'}>
          <Checkout closeCheckout={()=>setShowModal('')}
            showErrorPage={() => {
              // setOpenCheckout(false)
              setShowModal('error')
            }}
            showSuccessPage={() => {
              // setOpenCheckout(false)
              setShowModal('success')
            }} />
        </Modal>
      </CartProvider>
      <Modal open={showModal==='error'}>
        <ErrorPage />
      </Modal>
      <Modal open={showModal==='success'}>
        <OrderSuccess />
      </Modal>
    </>
  );
}

export default App;
