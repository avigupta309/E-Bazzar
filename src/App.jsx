import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Product from "./Product";

// eslint-disable-next-line react/prop-types
function App({setCartData,deleting}) {
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCart, setselectedCart] = useState("");

  // const[CartSelected,setCartSelected]=useState([]);

  return (
    <>
      <Header
        setSubmittedSearch={setSubmittedSearch}
        selectedCart={selectedCart}
        setCartData={setCartData}
        deleting={deleting}
      />
      <Product
        submittedSearch={submittedSearch}
        setselectedCart={setselectedCart}
       
      />
    </>
  );
}

export default App;
