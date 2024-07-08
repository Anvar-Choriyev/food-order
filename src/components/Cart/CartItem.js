import { useDispatch } from "react-redux";
import cartActions from "../../store/index";
import styles from "./CartItem.module.css";
const CartItem = props => {

  const dispatch = useDispatch()

  const removeHandler = () => {
    dispatch(cartActions.onRemoveItem(props.id))
  }

  const addHandler = () => {
    dispatch(cartActions.onAddItem(
      {
          id: props.id,
          name: props.name,
          price: props.price,
          count: 1
        }
    ))
  }

  return (
    <li className={styles.item}>
      
      <div>
        <span className={styles.name}>{props.name}</span>
       
        <p className={styles.price}>{props.price}</p>
      </div>
      <div>
        <div className={styles.btns}>
          <button onClick={removeHandler}>-</button>
          <span className={styles.count}>x{props.count}</span>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
