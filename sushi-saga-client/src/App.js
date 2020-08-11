import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import 'semantic-ui-css/semantic.min.css'

// Endpoint!
const API = "http://localhost:3000/sushis"
const SUSHI_PER_PAGE = 4

class App extends Component {
  state = {
    sushiList: [],
    budget: 50,
    pages: {
      startIndex: 0,
      endIndex: SUSHI_PER_PAGE
    }
  }

  handleEatSushi = sushi => {
    if ( sushi.price <= this.state.budget && !sushi.isEaten){

      let updatedList = this.state.sushiList.map( s => {
        if ( s === sushi ){
          return { ...s, isEaten: true }
        }
        return s
      })

      this.setState({
        sushiList: updatedList,
        budget: this.state.budget - sushi.price
      })
    }
  }

  filterEatenSushi = () => {
    return this.state.sushiList.filter( sushi => sushi.isEaten )
  }

  handleNextPage = () => {
    let { startIndex, endIndex } = this.state.pages

    if ( this.state.pages.endIndex !== 100 ){
      this.setState({
        pages:{
          startIndex: startIndex + SUSHI_PER_PAGE,
          endIndex: endIndex + SUSHI_PER_PAGE
        }
      })
    } else if ( this.state.pages.endIndex === 100 ){
      this.setState({
        pages:{
          startIndex: 0,
          endIndex: SUSHI_PER_PAGE
        }
      })
    }
  }

  addMoreMoney = event => {
    event.preventDefault()
    let form = event.target
    let money = form.money.value
    this.setState({
      budget: this.state.budget + parseInt( money , 10 )
    })
    form.reset()
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushiList={ this.state.sushiList }
          handleEatSushi={ this.handleEatSushi }
          pages={ this.state.pages }
          handleNextPage={ this.handleNextPage }
        />
        <Table
          budget={this.state.budget}
          eatenSushiList={this.filterEatenSushi()}
        />
        <form onSubmit={ event => this.addMoreMoney( event )}>
          <button
            type='submit'
            className='ui primary button'
            style={{padding: '10px 20px'}}
          >Add More Money</button>
          <div className="ui icon input" data-children-count="1">
              <i className="dollar icon"></i>
              <input name='money' type="number" placeholder="moneys..." style={{width: '150px'}}/>
            </div>
        </form>
      </div>
    )
  }

  componentDidMount() {
    fetch(API)
      .then( resp => resp.json() )
      .then( sushiList => this.setState({ sushiList }))
  }
}

export default App;