import React from 'react'
import {menuData} from '../../data/menuData'
const Menu = () => {
  return (
    <>
      <section className='menu' id='menu'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">POPULAR DISHES</h1>
                <p>Explore our most loved dishes, hand-picked by our chefs to give you an unforgettable culinary experience filled with authentic flavors.</p>
            </div>
            <div className="dishes_container">
                {
                    menuData.map(element => (
                        <div className="card" key={element.id}>
                                <img src={element.image} alt={element.title} />
                                <h3>{element.title}</h3>
                                <button>{element.category}</button>
                        </div>
                    ))
                }   
            </div>
        </div>
      </section>
    </>
  )
}

export default Menu
