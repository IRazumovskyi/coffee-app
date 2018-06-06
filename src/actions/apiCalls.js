import {FETCH_COFFEE_LIST, FETCH_COFFEE_DETAILS } from "./actionTypes";



 export const fetchCoffeeList = () => {
    return dispatch => fetch(`http://159.89.106.160/products`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: FETCH_COFFEE_LIST, data })        
      );
    
}
export const fetchCoffeeDetails = (i) => {
  return dispatch => fetch(`http://159.89.106.160/products/${i}`)
    .then(res => res.json())
    .then(
      data => {
      console.log(data);
       dispatch({ type: FETCH_COFFEE_DETAILS, data })        
      });
  }
