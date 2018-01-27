import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import config from './config'
import { Button } from './shared/buttons'
import { Input } from './shared/inputs'
import { Warning } from './shared/messages'

class Register extends Component {

  constructor() {
    super()
    this.state = {
      username: undefined,
      userpass: undefined,
      redirectToReferrer: false,
      err: null
    }
  }

  handleInput(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const userData = { username: this.state.username, password: this.state.userpass }
    try {
    const response = await fetch(config.url + '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
      const json = await response.json();
      if (response.ok) {
              localStorage.setItem('token', JSON.stringify(json.token))
              this.continue = true;
            } else {
              throw json
            }

    } catch (e) {
      console.log("error:",e);
      this.setState({ err: e.message })
      this.continue = false;
    } finally {
      console.log(this.continue);
      this.setState({ redirectToReferrer: this.continue });

    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to='/gallery' />)
    }
    return (
      <div>
        <h1>Sign Up</h1>
        { this.state.err &&
          <Warning>{ this.state.err }</Warning>
        }
        <form>
          <Input name='username' type='text' placeholder='user name'
            onChange={ this.handleInput.bind(this) }/>
          <Input name='userpass' type='password' placeholder='password'
            onChange={ this.handleInput.bind(this) }/>
          <Button
            onClick={ this.handleSubmit.bind(this) }>
            SIGN UP
          </Button>
        </form>
      </div>
    )
  }
}

export default Register;
