import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        "Explore our menu and dive into a world of flavors! 🍕 From sizzling snacks to gourmet delights, every bite is a treat. Craving something spicy, cheesy, or sweet? We’ve got it all—fresh, fast, and made just for you. Tap in, order now, and satisfy your cravings instantly! 😋🚀"
      </p>
      
      <div className='explore-menu-list'>
        {menu_list?.map((item, index) => (
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={category===item.menu_name?"active":""}src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
