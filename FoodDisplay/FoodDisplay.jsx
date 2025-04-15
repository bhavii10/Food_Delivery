// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { food_list } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({category}) => {
//     const {food_list}=useContext(StoreContext)
//   return (
//     <div className="food-display" id='food-display'>
//         <h2>Top Dishes near you</h2>
//         <div className="food-display-list">
//             {food_list.map((item,index)=>{
//               if(category==="All" || category===item.category){
//                 return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image}/>
//               }
               
//             })}
//         </div>
//     </div>
//   )
// }

// export default FoodDisplay




































import React, { useContext } from 'react';
import './FoodDisplay.css';
import { food_list } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import VoiceOrder from '../VoiceOrder';

const FoodDisplay = ({ category }) => {
  const { addToCart } = useContext(StoreContext);

  return (
    <div className="food-display" id='food-display'>
      <h2>Top Dishes Near You</h2>
      <VoiceOrder addToCart={addToCart} />
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
























































// import React, { useEffect, useState } from "react";
// import "./FoodDisplay.css";
// import FoodItem from "../FoodItem/FoodItem";
// import { food_list } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext'

// const FoodDisplay = ({ category }) => {
//   const [foodList, setFoodList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:2500/api/foods") // ✅ Fetch food items from backend
//       .then((res) => res.json())
//       .then((data) => setFoodList(data))
//       .catch((err) => console.error("Error fetching food:", err));
//   }, []);

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top Dishes near you</h2>
//       <div className="food-display-list">
//         {foodList.map((item, index) => {
//           if (category === "All" || category === item.category) {
//             return (
//               <FoodItem
//                 key={index}
//                 id={item.id}
//                 name={item.name}
//                 description={item.description}
//                 price={item.price}
//                 image={`http://localhost:2500${item.image}`} // ✅ Show image
//               />
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;

