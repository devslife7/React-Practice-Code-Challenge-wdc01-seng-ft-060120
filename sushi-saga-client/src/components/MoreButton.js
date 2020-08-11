import React from 'react'

const MoreButton = (props) => {
  return <button className='ui primary button' onClick={ () => props.handleNextPage() }>
          More sushi!
        </button>
}

export default MoreButton