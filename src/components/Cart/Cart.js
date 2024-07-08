import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";

const Cart = props => {

  const {items, totalPrice} = useSelector(st=>st)
  const [orderFormShown, setOrderFormShown] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showOrderFormHandler = () => {
    setOrderFormShown(true);
  };

  const orderConfirmHandler = userData => {
    const postData = {
      ...userData,
      orderedItems: items,
    };

    setIsSubmitting(true);
    fetch(
      "https://products-dc2c8-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify(postData),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);

  };

  const cartContent = (
    <div className={styles.cart}>
      <ul className={styles["item-list"]}>
        {items.map((i, ind) => (
          <CartItem
            key={i.id + ind}
            id={i.id}
            name={i.name}
            price={i.price}
            count={i.count}
          />
        ))}
      </ul>
      <div className={styles["total-price"]}>
        <span>Total price</span>
        <span>{totalPrice}</span>
      </div>

      {orderFormShown && (
        <OrderForm onClose={props.onHideCart} onConfirm={orderConfirmHandler} />
      )}

      {!orderFormShown && (
        <div className={styles.actions}>
          <Button onClick={props.onHideCart}>Close</Button>

          {items.length > 0 && (
            <Button onClick={showOrderFormHandler}>Order</Button>
          )}
        </div>
      )}
    </div>
  );

  const isSubmittingContent = <h2>Ordering...</h2>;

  const didSubmitContent = (
    <div>
      <h2>Your order successfully received!</h2>
      <Button onClick={props.onHideCart}>Close</Button>
    </div>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {isSubmitting && isSubmittingContent}
      {didSubmit && !isSubmitting && didSubmitContent}
      {!isSubmitting && !didSubmit && cartContent}
    </Modal>
  );
};

export default Cart;
