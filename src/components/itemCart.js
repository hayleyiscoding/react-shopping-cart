import { AiOutlineClose } from "react-icons/ai";

export default function ItemCart({
  item,
  addToCart,
  removeItem,
  addedToCart,
  setAddedToCart,
}) {
  const { sku, title, price, id } = item;

  function decreaseQuantity(id) {
    let selectedItem = addedToCart.find((item) => item.id === id);
    const final = addedToCart.map((i) => {
      if (i.id === item.id && item.quantity > 1) {
        return { ...item, quantity: i.quantity - 1 };
      }
      return i;
    });
    setAddedToCart(final);
  }

  return (
    <section className='flex item_cart justify-between'>
      <div className='flex center flex-15'>
        <img src={`/images/products/${sku}-1-cart.webp`} alt={title} />
      </div>
      <div className='item_cart--details flex-65'>
        <h3>{title}</h3>
        <h4>L | Wine</h4>
        <h5>Quantity: {item.quantity}</h5>
      </div>
      <div className='item_cart--price flex-15 text-right'>
        <button type='button' className='item_cart--close'>
          <AiOutlineClose onClick={() => removeItem(id)} />
        </button>
        <h3>$&nbsp;{price.toFixed(2)}</h3>
        <div>
          <button
            type='button'
            className={`button_decrease ${item.quantity > 1 ? "black" : ""}`}
            onClick={() => decreaseQuantity(id)}
          >
            -
          </button>
          <button
            type='button'
            className='button_increase'
            onClick={() => {
              addToCart({ ...item, quantity: 1 });
            }}
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
