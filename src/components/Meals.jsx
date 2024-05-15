import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {}; //created outside to avoid infinite loop in useEffect in useHttp

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:3000/meals");
  //     const data = await response.json();
  //     setLoadedMeals(data);
  //   }
  //   fetchData();
  // }, []);
  const {
    data: loadedMeals,
    error,
    loading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (loading) {
    return <p className="center">Fetching meals</p>;
  }
  if (error) {
    return <Error title="failed request" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
