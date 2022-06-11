import ItemCart from "./itemCart";
import { AiOutlineClose } from "react-icons/ai";

export default function Cart({
  showCart,
  addedToCart,
  addToCart,
  removeItem,
  countItems,
  getCartTotal,
  getCartTotalInstallments,
}) {
  console.log(countItems(), "main");

  return (
    <section className='cart'>
      <div className='cart-close'>
        <button className='cart-close-icon' onClick={showCart}>
          <AiOutlineClose />
        </button>
      </div>
      <div>
        <div className='flex center cart-header'>
          <div className='main--cart_icon'>
            <button className='main--cart_img'>
              <img src='/images/cart-icon.png' alt='Cart icon' />
              <div className='cart-number flex center'>{countItems()}</div>
            </button>
          </div>
          <h2>Cart</h2>
        </div>
        {addedToCart.length > 0 ? (
          <div className='cart_items'>
            {addedToCart.map((item) => {
              return (
                <ItemCart
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
                  removeItem={removeItem}
                />
              );
            })}
          </div>
        ) : (
          <div className='cart_items empty_cart'>
            <h5>Add some products in the cart </h5>
            <br />
            <h5>:)</h5>
          </div>
        )}
        <div className='cart_subtotal flex justify-between'>
          <h4>SUBTOTAL</h4>
          <div className='cart_total'>
            <h4>$ {getCartTotal().toFixed(2)}</h4>
            <h5>OR UP TO 9 x $ {getCartTotalInstallments().toFixed(2)}</h5>
          </div>
        </div>
        <div className='button_checkout'>
          <button
            type='button'
            className='btn'
            onClick={() =>
              alert(`Your cart total is $${getCartTotal().toFixed(2)}`)
            }
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </section>
  );
}
