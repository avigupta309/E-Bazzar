import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const ContextApi = createContext({
  cartList: [],
  setCartList: () => {},
  amount: 0,
  setAmount: () => {},
});

export const ContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);
  return (
    <ContextApi.Provider value={{ cartList, setCartList, amount, setAmount }}>
      {children}
    </ContextApi.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
