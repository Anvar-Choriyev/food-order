import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, getCartItems } from "./store/index";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import MealsList from "./components/Meals/MealsList";
import Modal from "./components/UI/Modal";
const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);
  const items = useSelector(st => st.items);
  const isChanged = useSelector(st => st.isChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isChanged) return;
    const itemsToPut = items.reduce((acc, el) => {
      acc[el.id] = { name: el.name, count: el.count, price: el.price };
      return acc;
    }, {});

    fetch(
      "https://products-dc2c8-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      { method: "PUT", body: JSON.stringify(itemsToPut) }
    );
  }, [items]);

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch]);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <>
      <Header onShowCart={showCartHandler} />
      <main className="container">
        <MealsList />
      </main>
      {isCartShown && (
        <Cart onShowCart={showCartHandler} onHideCart={hideCartHandler} />
      )}
    </>
  );
};

export default App;
