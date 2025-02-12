import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Product from "./Product";

function App() {
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCart, setselectedCart] = useState("");

  // const[CartSelected,setCartSelected]=useState([]);

  return (
    <>
      <Header
        setSubmittedSearch={setSubmittedSearch}
        selectedCart={selectedCart}
      />
      <Product
        submittedSearch={submittedSearch}
        setselectedCart={setselectedCart}
      />
    </>
  );
}

export default App;
