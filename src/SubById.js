import React,{Component} from 'react';
import Submission from './Submission.js';
import config from './config';
import Like from './like.js';
import CartButton from './CartButton.js';
import { Warning } from './shared/messages';

class SubById extends Component {
  constructor(props){
    super(props)
    this.state={
      submission:{},
      user:{
        liked:["fusdjkop"],
        non:false
      },
      userliked:false,
      usercart:false
    };
  }

  async componentDidMount(){
    this.showSubmission(this.props.match.params.id);

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
      return json
    }
    else {
      console.log(json.message);
      await this.setState({err:"You need to login to like a submission!"})
    }
    return (json)
  };

  async showSubmission(id){
    const user = await this.getCurrentUser();
    const userid = id;
    if (user.liked) {
      if (user.liked.includes(userid)) {
        console.log("hey");
        this.setState({userliked:true})
      }
    }

    if (user.cart) {
      if (user.cart.includes(userid)) {
        console.log("hey");
        this.setState({inCart:true})
      }
    }

    try {
      const response   = await fetch(config.url+"/submissions/"+id);
      const submission = await response.json();
      await this.setState({submission})

    } catch (e) {
      console.log(e);
      this.setState({submission:{title:"Not Found"}})
    }
  };

  async likeSubmission(id){
    const token = await JSON.parse(localStorage.getItem('token'));
    const response =await fetch(config.url+"/submissions/like/"+id,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log("ayy");
      await this.setState({submission:json.submission})
      await this.setState({userliked:true})
      await localStorage.setItem('token', JSON.stringify(json.token))

    }

    else {
      console.log(json.message);
      await this.setState({err:json.message})
    }


  };

  async cartSubmission(id){
    const token = await JSON.parse(localStorage.getItem('token'));
    const response =await fetch(config.url+"/submissions/cart/"+id,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log("ayy");
      await this.setState({submission:json.submission})
      await this.setState({inCart:true})
      await localStorage.setItem('token', JSON.stringify(json.token))

    }

    else {
      console.log(json.message);
      await this.setState({err:json.message})
    }


  };

  render(){
    return(
      <div className = "sub_id">
        {this.state.user.username &&
          <h2>{"Hello "+this.state.user.username+"!"}</h2>
        }
        { this.state.err &&
          <Warning>{ this.state.err }</Warning>
        }
        <Submission
          subclass = "sub_id"
          submission = {this.state.submission}
          />
        <Like
          submission = {this.state.submission}
          likeSubmission = {this.likeSubmission.bind(this)}
          liked = {this.state.userliked}
          />

        <CartButton
          submission = {this.state.submission}
          cartSubmission = {this.cartSubmission.bind(this)}
          inCart = {this.state.inCart}
          />
      </div>
    )
  }
};


export default SubById;
