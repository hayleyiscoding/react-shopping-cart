import { useRef, useState } from "react";

export default function Item({ item, addToCart }) {
  const { title, price, installments, sku } = item;
  const [toggleImage, setToggleImage] = useState(false);

  const priceContainer = useRef(null);

  let addDecimals = price.toFixed(2);
  let priceArray = addDecimals.split(".");
  let firstPrice = priceArray[0];
  let secondPrice = priceArray[1];

  return (
    <article className='item'>
      {item.isFreeShipping && <h6 className='free_shipping'>Free Shipping</h6>}
      {!toggleImage ? (
        <img
          className='item--img'
          src={`/images/products/${sku}-1-product.webp`}
          alt={title}
          onMouseEnter={() => setToggleImage(true)}
        />
      ) : (
        <img
          src={`/images/products/${sku}-2-product.webp`}
          className='item--img'
          alt={title}
          onMouseOut={() => setToggleImage(false)}
        />
      )}
      <h3>{title}</h3>
      <hr />
      <h2 ref={priceContainer}>
        $<strong>{firstPrice}</strong>.{secondPrice}
      </h2>
      <h5>
        Or {installments} X <span>$ {(price / installments).toFixed(2)}</span>
      </h5>
      <button
        type='button'
        className='btn'
        onClick={() => {
          addToCart({ ...item, quantity: 1 });
        }}
      >
        Add to cart
      </button>
    </article>
  );
}
