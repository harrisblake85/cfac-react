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
    const userData = { username: this.state.username, password: this.state.userpass, email:this.state.useremail, img:this.state.userimg }
    try {
      const response = await fetch(config.url + '/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      let json = {};
      if (response.ok) {
        json = await response.json();
        console.log(json.token);
        localStorage.setItem('token', JSON.stringify(json.token))
        this.continue = true;
      } else {
        json = await response.json();
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
  };

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
          <Input name='username' type='text' placeholder='Username'
            onChange={ this.handleInput.bind(this) }/>
          <Input name='userpass' type='password' placeholder='Password'
            onChange={ this.handleInput.bind(this) }/>
          <Input name='useremail' type='text' placeholder='Email@example.com'
            onChange={ this.handleInput.bind(this) }/>
          <Input name='userimg' type='text' placeholder='Profile-Url'
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
