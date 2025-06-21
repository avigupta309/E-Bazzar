import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Product from "./Product";
import { ContextApi } from "../context/ContextApi";

function App() {
  const {setCartList}=useContext(ContextApi)
  const [submittedSearch, setSubmittedSearch] = useState("");
  useEffect(()=>{
    const storedCartItems=JSON.parse(localStorage.getItem("items"))
    if(storedCartItems &&storedCartItems.length>0){
      setCartList(storedCartItems)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Header
        setSubmittedSearch={setSubmittedSearch}
      />
      <Product
        submittedSearch={submittedSearch}       
      />
    </>
  );
}

export default App;
