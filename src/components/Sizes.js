export default function Sizes({ includesSize, setActive, active, sizeArray }) {
  return (
    <div>
      <h3>Sizes:</h3>
      <ul className='sizes--list'>
        {["XS", "S", "M", "ML", "L", "XL", "XXL"].map((size) => {
          return (
            <li>
              <button
                className={sizeArray.includes(size) ? "active" : ""}
                type='button'
                onClick={() => {
                  includesSize(size);
                }}
              >
                {size}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
