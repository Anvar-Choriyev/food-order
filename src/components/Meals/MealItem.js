import { useDispatch } from "react-redux";
import { cartActions } from "../../store/index";
import MealAddForm from "./MealAddForm";
import styles from "./MealItem.module.css";

const MealItem = props => {
  const dispatch = useDispatch();
  const addItemHandler = count => {
    dispatch(
      cartActions.onAddItem({
        id: props.id,
        name: props.name,
        price: props.price,
        count: +count,
      })
    );

  };

  return (
    <li className={styles.meal}>
      <div>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.description}>{props.description}</p>
      </div>
      <div className={styles["right-side"]}>
        {/* <p className={styles.price}>{formattedPrice}</p> */}

        <MealAddForm onAddItem={addItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
