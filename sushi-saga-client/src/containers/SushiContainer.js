import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  let { startIndex, endIndex } = props.pages

  function renderSushis() {
    return props.sushiList.slice(startIndex, endIndex).map( s => 
        <Sushi
          key={s.id}
          sushi={s}
          handleEatSushi={ props.handleEatSushi }
        />
      )
  }

  return (
    <Fragment>
      <div className="belt">
        { renderSushis() }
        <MoreButton
          handleNextPage={ props.handleNextPage }
        />
      </div>
    </Fragment>
  )
}

export default SushiContainer