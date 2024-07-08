import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CartButton.module.css";
import CartIcon from "./CartIcon";

const CartButton = props => {
  const {items, totalPrice} = useSelector(st=>st)
  const [isBtnClicked, setIsBtnClicked] = useState(false);


  useEffect(() => {
    if (items.length === 0) return;
    setIsBtnClicked(true);
   const timer =  setTimeout(() => {
      setIsBtnClicked(false);
   }, 300);
    return ()=>clearTimeout(timer)
  }, [items]);

  const totalItemsCount = items.reduce((acc, el) => acc + el.count, 0);

  const btnClasses = `${styles["cart-button"]} ${
    isBtnClicked ? styles.scaling : ""
  }`;

  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <CartIcon />
      <span className={styles["items-count"]}>{totalItemsCount}</span>
    </button>
  );
};

export default CartButton;
