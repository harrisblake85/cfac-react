import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// styled components
import { Button } from './shared/buttons'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      loggedOut: false
    }
  }

  handleClick() {
    localStorage.removeItem('token')
    this.setState({
      loggedOut: true
    })
  }

  render() {
    if (this.state.loggedOut) {
      return(<Redirect to='/gallery' />)
    }
    return(
      <Button
        onClick={ this.handleClick.bind(this) }>
        LOG OUT
      </Button>
    )
  }
}

export default Logout;
