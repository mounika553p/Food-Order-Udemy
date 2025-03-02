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

  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  return (
    <>
      <CartProvider>
        <Header openCart={() => setOpenCart(true)}
          showError={() => setShowErrorPage(true)} />
        <Meals />
        <Modal open={openCart}>
          <Cart closeCart={() => setOpenCart(false)} openCheckout={() => {
            setOpenCart(false)
            setOpenCheckout(true)
          }} />
        </Modal>
        <Modal open={openCheckout}>
          <Checkout closeCheckout={setOpenCheckout}
            showErrorPage={() => {
              setOpenCheckout(false)
              setShowErrorPage(true)
            }}
            showSuccessPage={() => {
              setOpenCheckout(false)
              setShowSuccessPage(true)
            }} />
        </Modal>
      </CartProvider>
      <Modal open={showErrorPage}>
        <ErrorPage />
      </Modal>
      <Modal open={showSuccessPage}>
        <OrderSuccess />
      </Modal>
    </>
  );
}

export default App;
