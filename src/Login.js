import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from './config';
import { Button } from './shared/buttons'
import { Input } from './shared/inputs'
import { Warning } from './shared/messages';

class Login extends Component {

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
    this.setState({ err: null})
    event.preventDefault();
    const userData = { username: this.state.username, password: this.state.userpass }
    this.continue = false;
    try {
      const response = await fetch(config.url + '/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      console.log(await response);
      let json = {};
      if (response.ok) {
              json = await response.json();
              console.log(json.token);
              localStorage.setItem('token', JSON.stringify(json.token))
              this.continue = true;
            } else {
              throw response
            }

    } catch (e) {
      console.log("error:",e);
      this.setState({ err: e.statusText })
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
    return(
      <div>
        <h1>Log In</h1>
        { this.state.err &&
          <Warning>{ this.state.err }</Warning>
        }
        <form>
          <Input name='username' type='text' placeholder='user name'
            onChange={ this.handleInput.bind(this) }
          />
          <Input name='userpass' type='password' placeholder='password'
            onChange={ this.handleInput.bind(this) }
          />
          <Button
            onClick={ this.handleSubmit.bind(this) }
            >
            LOG IN
          </Button>
        </form>
      </div>
    )
  }
}

export default Login;
