import React from 'react'

const Sushi = (props) => {
  let { sushi } = props
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={ () => props.handleEatSushi( sushi )}>
        { 
          /* Tell me if this sushi has been eaten! */ 
          sushi.isEaten ?
            null
          :
            <img src={ sushi.img_url } width="100%" alt='sushi' />
        }
      </div>
      <h4 className="sushi-details">
        { sushi.name} - ${ sushi.price }
      </h4>
    </div>
  )
}

export default Sushi