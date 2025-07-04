import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const CartPage = () => {
  const { Cart, dispatchCart } = useCart();
  document.title = "Cart";
  const handleDecrease = (ID) => {
    dispatchCart({
      type: "DECREASE",
      payload: {
        id: ID,
      },
    });
  };
  const handleIncrease = (ID, STOCK) => {
    dispatchCart({
      type: "INCREASE",
      payload: {
        id: ID,
        stock: STOCK,
      },
    });
  };
  const handleRemove = (ID) => {
    dispatchCart({
      type: "REMOVE",
      payload: {
        id: ID,
      },
    });
  };
  const total = Cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
  return (
    <main className="w-full">
      {Cart.length == 0 ? (
        <div className="w-full h-[350px] flex items-center justify-center flex-col gap-5">
          <h1 className="text-5xl">Your cart is empty</h1>
          <Link
            to={"/"}
            className="px-8 py-3 tracking-wider text-white bg-black"
          >
            Continue Shopping
          </Link>
          <p className="text-2xl">Have an account?</p>
          <p className="text-[12px] text-black/40">
            <Link className="underline">Login</Link> to checkout faster
          </p>
        </div>
      ) : (
        <div className="w-full p-2 my-5">
          <div className="w-full h-[40px] flex justify-between items-center">
            <h1 className="text-3xl">Your Cart</h1>
            <Link to={"/"} className="text-sm underline text-black/60">
              Continue Shopping
            </Link>
          </div>
          <div className="flex flex-col gap-3 py-5 my-2 border-y-2 border-black/20">
            {Cart.map(
              (
                { id, name, category, price, qty, stock, img, gender },
                index
              ) => (
                <div key={index} className="w-full lg:h-[150px]">
                  <div className="flex items-center w-full gap-4">
                    <img src={img} alt="" className="size-[150px]" />
                    <div className="[width:calc(100%-150px)] flex md:flex-row flex-col md:items-center gap-4 pr-2">
                      <div className="flex gap-1 tracking-wider flex-col md:w-[60%]">
                        <p className="md:text-[10px] text-[9px] text-black/30">
                          {category.toUpperCase()} - {gender.toUpperCase()}
                        </p>
                        <p className="md:text-sm text-[11px] pr-2 text-black/80">
                          {name}
                        </p>
                        <p className="md:text-sm text-[11px] text-black/50">
                          ${price.toFixed(2)} USD
                        </p>
                      </div>
                      <div className="flex flex-row items-center md:w-[20%]">
                        <div
                          className={`cursor-pointer text-black/60 px-2 text-xl selection:bg-transparent`}
                          onClick={() => handleDecrease(id)}
                        >
                          -
                        </div>
                        <div className="px-2 text-md text-black/60">{qty}</div>
                        <div
                          className={`${
                            qty == stock
                              ? "cursor-not-allowed text-black/20"
                              : "cursor-pointer text-black/60"
                          } px-2 text-xl selection:bg-transparent`}
                          onClick={() => handleIncrease(id, stock)}
                        >
                          +
                        </div>
                      </div>
                      <p className="md:text-sm text-[13px] md:w-[10%]">
                        Total: ${(qty * price).toFixed(2)}
                      </p>
                      <span className="w-[5%]">
                        <i
                          className="text-4xl cursor-pointer bi bi-x"
                          onClick={() => handleRemove(id)}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <p className="text-xl text-black/80">
            Estimated total: ${total.toFixed(2)}
          </p>
          <p className="mb-5 text-sm text-black/30">
            Taxes, discounts and shipping calculated at checkout.
          </p>
          <Link
            to={"/Checkout"}
            className="px-10 py-3 mt-5 text-white bg-black cursor-pointer"
          >
            Checkout
          </Link>
        </div>
      )}
    </main>
  );
};

export default CartPage;
