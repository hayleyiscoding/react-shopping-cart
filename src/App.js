import ItemContainer from "./components/ItemContainer";
import Sizes from "./components/Sizes";
import { useEffect, useState } from "react";
import products from "./products";
import Cart from "./components/Cart";

export default function App() {
  const [items, setItems] = useState(products);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false);

  function showCart() {
    return setCartIsShown(!cartIsShown);
  }

  function addToCart(item) {
    setCartIsShown(true);
    let inCart = addedToCart.some((singleItem) => singleItem.id === item.id);
    if (inCart) {
      const final = addedToCart.map((i) => {
        if (i.id === item.id) {
          return { ...item, quantity: i.quantity + 1 };
        }
        return i;
      });
      setAddedToCart(final);
    } else {
      setAddedToCart([...addedToCart, item]);
    }
  }

  function countItems() {
    return addedToCart.reduce((acc, cv) => {
      return acc + cv.quantity;
    }, 0);
  }

  function removeItem(id) {
    setAddedToCart((addedToCart) =>
      addedToCart.filter((item) => item.id !== id)
    );
  }

  function getCartTotal() {
    return addedToCart.reduce((acc, cv) => {
      return acc + cv.quantity * cv.price;
    }, 0);
  }

  function getCartTotalInstallments() {
    return getCartTotal() / 9;
  }

  function includesSize(size) {
    if (!sizeArray.includes(size)) {
      setSizeArray((prevArray) => [...prevArray, size]);
      setLoading(true);
    } else {
      setSizeArray((prevArray) => prevArray.filter((s) => s !== size));
      setLoading(true);
    }
  }

  useEffect(() => {
    setLoading(true);
    const stopTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(stopTimeout);
  }, [sizeArray]);

  return (
    <main className='container'>
      <section className='main--cart_icon'>
        <button className='main--cart_img' onClick={showCart}>
          <img src='/images/cart-icon.png' alt='Cart icon' />
          <div className='cart-number flex center'>{countItems()}</div>
        </button>
      </section>
      <section className='sizes'>
        <Sizes
          includesSize={includesSize}
          active={active}
          setActive={setActive}
          sizeArray={sizeArray}
        />
      </section>
      <section className='item_container'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <ItemContainer
            items={items}
            addToCart={addToCart}
            addedToCart={addedToCart}
            sizeArray={sizeArray}
          />
        )}
      </section>
      <section>
        {cartIsShown && (
          <Cart
            showCart={showCart}
            addedToCart={addedToCart}
            addToCart={addToCart}
            countItems={countItems}
            removeItem={removeItem}
            getCartTotal={getCartTotal}
            getCartTotalInstallments={getCartTotalInstallments}
          />
        )}
      </section>
    </main>
  );
}
