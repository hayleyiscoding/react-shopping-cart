import Item from "./Item";

export default function ItemContainer({ items, addToCart, sizeArray }) {
  function getItemsBasedOnSize() {
    if (sizeArray.length === 0) return items;
    return items.filter((product) => {
      return sizeArray.some((element) =>
        product.availableSizes.includes(element)
      );
    });
  }

  const filteredProducts = getItemsBasedOnSize();
  return (
    <div>
      <h3 className='item_container--number'>
        {filteredProducts.length} Product(s) found
      </h3>
      <ul className='item_container--list'>
        {filteredProducts.map((item) => {
          return (
            <li key={item.id}>
              <Item item={item} addToCart={addToCart} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
