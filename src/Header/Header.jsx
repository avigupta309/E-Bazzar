import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Header({ setSubmittedSearch, selectedCart }) {
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("items"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("items", JSON.stringify(cartItems));
      const validCartItems = cartItems.filter(
        (val) => val && val.price !== undefined
      );
      const totalAmount = validCartItems.reduce(
        (acc, val) => acc + val.price,
        0
      );
      setAmount(parseFloat(totalAmount.toFixed(2)));
    }
  }, [cartItems]);

  useEffect(() => {
    if (selectedCart !== "") {
      setCartItems([...cartItems, selectedCart]);
    }
    //eslint-disable-next-line
  }, [selectedCart]);

  function searchFun(data) {
    data.preventDefault();
    setSubmittedSearch(searchValue);
  }
  return (
    <>
      <header className=" sticky top-0 z-10 w-screen">
        <nav className="mb-5 w-full">
          <div className="navbar bg-yellow-500 p-6 shadow-sm  flex justify-between">
            <div className="flex  items-center ">
              <Link to={"/"}>
                <h1
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn btn-ghost text-2xl text-red-500 lg:ml-[10rem] ml-[5rem] mr-5"
                >
                  Bazzar
                </h1>
              </Link>

              <form onSubmit={searchFun}>
                <label className="input">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    className="w-[10rem]"
                    type="search"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    required
                    placeholder="Search"
                  />
                </label>
              </form>
            </div>
            <marquee>
              {" "}
              <h1 className="mr-13 text-blue-900 text-xl">
                Bazaar ki galiyon mein, sapne bikte hain. Har cheez ki hai apni
                ek kahani, kuch nayi, kuch purani
              </h1>
            </marquee>
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator mr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-20 mr-20  bg-yellow-500 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        className="bg-red-600"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm indicator-item font-bold mr-24">
                      {cartItems.length}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content  z-1 mt-3 w-52 shadow bg-base-100"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">
                      {cartItems.length} Items
                    </span>
                    <span className="text-info">Subtotal: $ {amount}</span>
                    <div className="card-actions">
                      <Link to={"/cart"}>
                        <button className="btn btn-primary btn-block">
                          view items
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src="/avi.jpg" alt="Avi" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>{" "}
        </nav>
      </header>

      {/* <TimePass cartItems={cartItems}/> */}
    </>
  );
}
