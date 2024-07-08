import styles from "./MealsList.module.css";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";
const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = async () => {
    const res = await fetch(
      "https://meals-15cfb-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    const data = await res.json();

    const formattedMeals = [];

    for (const key in data) {
      const meal = data[key];
      formattedMeals.push({
        id: key,
        name: meal.name,
        description: meal.description,
        price: meal.price,
      });
    }
    setMeals(formattedMeals);
  };

  const mealList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return <ul className={styles.meals}>{mealList}</ul>;
};

export default MealsList;
