import React,{Component} from 'react';
import config from './config.js';
import Submissions from './Submissions.js';
import { Warning } from './shared/messages';
  class Cart extends Component{
    constructor(props) {
      super(props)
      this.state= {
        cart:[],
        user:{},
        submissions:[]
      };
    }
    componentDidMount(){
      this.getCurrentUser();
    }
    async getCurrentUser(){
      const token = await JSON.parse(localStorage.getItem('token'));
      const response = await fetch(config.url+"/users/current/",{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      const json = await response.json();
      if (response.ok) {
        await this.setState({user:json})

          try {
            for (let subid of this.state.user.cart) {
            const response   = await fetch(config.url+"/submissions/"+subid);
            const submission = await response.json();
            await this.state.submissions.push(submission);
            this.setState({submission:this.state.submissions})
            }

          } catch (e) {
            console.log(e);
            this.setState({submissions:[{title:"Not Found"}]})
          }


        console.log(json);
        return json
      }
      else {
        console.log(json.message);
        await this.setState({err:"You need to login to like a submission!"})
      }
      return (json)
    };

    render(){
      return(

        <div className="cart">

          {this.state.user.username &&
            <h2>{"Hello "+this.state.user.username+"!"}</h2>
          }
          { this.state.err &&
            <Warning>{ this.state.err }</Warning>
          }

            <Submissions
              submissions = {this.state.submissions}
              />

        </div>
      )
    }
  }
export default Cart
