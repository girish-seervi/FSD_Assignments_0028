import React from 'react'
import {qualitiesData} from '../../data/qualitiesData'
const Qualities = () => {
  return (
    <>
        <section className='qualities' id='qualities'>
          <div className="container">
            {
              qualitiesData.map(element=>{
                return(
                  <div className='card' key={element.id}>
                      <img src={element.image} alt={element.title} />
                      <p className='title'>{element.title}</p>
                      <p className='description'>{element.description}</p>
                  </div>
                )
              })
            }
          </div>
        </section>
    </>
  )
}

export default Qualities
