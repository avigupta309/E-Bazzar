import axios from "axios";
import "react-notifications/lib/notifications.css";
import { useContext, useEffect, useState } from "react";
import { ContextApi } from "../context/ContextApi";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
export default function Product({ submittedSearch }) {
  const { setCartList, cartList } = useContext(ContextApi);

  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list").then((response) => {
      response.json().then((data) => {
        setCategory(data);
      });
    });
  }, []);

  const [items, setItems] = useState([]);

  function cartFun(data) {
    const itemExists = cartList.some((val) => val.title === data.title);
    if (itemExists) {
   toast.error(`${data.title} has already added in your cart`)
    }else {
     setCartList((prev) => [...prev, data]);
     const newCart=[...cartList,data]
     toast.success(`${data.title} Sucessfully added in cart`)
     localStorage.setItem('items',JSON.stringify(newCart))
    }
  }


  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => response.data)
      .then((final) => {
        setItems(final.products);
      });
  }, []);

  useEffect(() => {
    if (submittedSearch !== "") {
      axios
        .get(`https://dummyjson.com/products/search?q=${submittedSearch}`)
        .then((response) => response.data)
        .then((final) => {
          setItems(final.products);
        });
    }
  }, [submittedSearch]);

  function selectCategory(category) {
    fetch(`https://dummyjson.com/products/category/${category}`).then(
      (response) => {
        response.json().then((data) => {
          setItems(data.products);
        });
      }
    );
  }

  let productItems = items.map((val, index) => {
    return (
      <div key={index} className="card z-5 bg-gray-100  shadow-md p-3">
        <figure>
          <img src={val?.thumbnail} alt="Shoes" className="h-64 object-cover" />
        </figure>
        <div className="card-body p-2 ">
          <h2 className="card-title text-sm text-black font-semibold">
            {val.title}
          </h2>
          <p className="text-xs text-black">{val.description}</p>
          <div className="card-actions justify-end ">
            <p className="font-bold text-black">$ {val.price}</p>
            <button
              onClick={() => {
                cartFun(val);
              }}
              className="btn btn-sm btn-primary"
            >
              Added to Cart
            </button>
          </div>
        </div>
      </div>
    );
  });
  let CategoryList = category.map((val, index) => {
    return (
      <li
        onClick={() => {
          selectCategory(val);
        }}
        className="list-none cursor-pointer m-1"
        key={index}
      >
        {index + 1} . {val.toUpperCase()}
      </li>
    );
  });
  return (
    <>
      <div className="container flex justify-center">
        <div className="dropdown ">
          <div
            onClick={() => {
              setMenu(!menu);
            }}
            tabIndex={0}
            role="button"
            className="btn m-1 fixed left-0 top-5 z-10"
          >
            {menu ? "Hide Menu" : "Show Menu"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu  bg-gray-400 rounded-box w-52 p-2 shadow-sm"
          >
            {CategoryList}
          </ul>
        </div>

        <div className="container">
          <img className="Advertisement " src="bg-image.jpg" />
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-5 gap-x-5 justify-center items-center sm:w-screen">
            {productItems}
          </div>
        </div>
      </div>
    </>
  );
}
