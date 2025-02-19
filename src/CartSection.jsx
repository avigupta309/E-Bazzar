import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function CartSection({ cartData = [], setDeleting }) {
  const [cartBox, setCartBox] = useState([]);
  // const[deleting,setDeleting]=useState();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("storeCartItems"));
    if (storedCart) {
      setCartBox(storedCart);
    }
  }, []);
  useEffect(() => {
    if (cartData.length > 0) {
      setCartBox(cartData);
      localStorage.setItem("storeCartItems", JSON.stringify(cartBox));
    }
  }, [cartData, cartBox]);

  function deletingFun(val) {
    //setDeleting(val.id)
    const afterDeletingCart = cartBox.filter((data) => data.id !== val.id);
    setCartBox(afterDeletingCart);
    localStorage.setItem("storeCartItems", JSON.stringify(afterDeletingCart));
    setDeleting(afterDeletingCart);
  }
  const [amount, setAmount] = useState(0);
  const[discountAmount,setDiscountAmount]=useState(0)
  useEffect(() => {
    if (cartBox.length > 0) {
      const totalAmount = cartBox.reduce((acc, val) => acc + val.price, 0);
      setAmount(parseFloat(totalAmount.toFixed(2)));
    } else {
      setAmount(0); // Reset when cart is empty
    }
   
  }, [cartBox]);

  useEffect(()=>{
    if(amount>=1000){
      const discountRate=amount/10
      const actualAmount=amount-(parseFloat(discountRate.toFixed(2)))
      setDiscountAmount(actualAmount)

    }
  },[amount])
  return (
    <>
    <ToastContainer/>
      <div className="navbar bg-yellow-400 shadow-sm">
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-red-500 text-3xl">
            Bazzar
          </Link>
        </div>
        <div className="navbar-end">
          <h1 className="text-2xl text-emerald-500">Welcome In cart Section</h1>
          <img className="h-11" src="https://www.animatedimages.org/data/media/839/animated-nepal-flag-image-0007.gif" alt="Jai Nepal" />
          <div className="dropdown absolute right-4 top-2 mb-72">
            <div tabIndex={0} role="button" className="btn ml-48">
              List
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {cartBox.length > 0 ? (
                cartBox.map((val) => {
                  return (
                    <li key={val.id} className="hover:bg-base-300 pl-2">
                      {val.title}
                    </li>
                  );
                })
              ) : (
                <p>First Select Any Items</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-5 gap-x-5 justify-center items-center  w-screen">
        {cartBox.length > 0 ? (
          cartBox.map((val, index) => {
            return (
              <div
                key={index}
                className="card z-5 bg-gray-100 w-72 shadow-md p-3"
              >
                <figure>
                  <img
                    src={val?.thumbnail}
                    alt="Shoes"
                    className="h-64 w-full object-cover"
                  />
                </figure>
                <div className="card-body p-2 ">
                  <h2 className="card-title text-sm">{val.title}</h2>
                  <p className="text-xs text-black">{val.description}</p>
                  <div className="card-actions justify-end">
                    <p className="font-bold text-black">$ {val.price}</p>
                    <button
                      onClick={() => {
                        deletingFun(val);
                        toast.warning("Sucessfully Deleted")
                      }}
                      className="btn bg-red-500 btn-sm btn-primary"
                    >
                      Delete
                    </button>
                    <button
                    onClick={()=>{toast.success("Sorry Dont Be Serious Its Dummy Website")}}
                    className="btn btn-sm btn-primary">Buy</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-4xl text-red-500">No Data Found</h1>
        )}
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
        {/* The button to open modal */}
        <a href="#my_modal_8" className="btn">
          Information
        </a>

        {/* Put this part before </body> tag */}
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Offer Only For You !!!</h3>
            <p className="py-4">Buy More Than $1000 and Get 10% Discount</p>
            <p className="py-4 bg-amber-300 text-xl">Total Amount = $ {amount}</p>
            {amount >1000 ? 
           <p className="py-4 bg-green-500 text-xl">With Discount You Have To Pay  = $ {discountAmount}</p>
            :
            <h1>Buy More than $1000 Then You Able To received Discount</h1>
            }
           
            <div className="modal-action">
              <a href="#" className="btn">
                Close
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
