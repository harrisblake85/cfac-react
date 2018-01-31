import React, {Component} from 'react';
import config from './config.js';
import { Redirect } from 'react-router-dom';
import { Button } from './shared/buttons';
import { Input } from './shared/inputs';
import { Warning } from './shared/messages';

class NewSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '',status:"Upload Submission!",created:false,submission:{},user:{}};
  }

  componentDidMount(){
    this.getCurrentUser()
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
      await this.setState({err:"You need to log in to make a submission!"})
    }
    return (json)
  };


  async handleSubmit(event) {
    event.preventDefault();
    this.setState({status:"Uploading.."})
    console.log(this.state.file);
    let file = this.state.file;
    try {
      let response = {};
      if (file) {
        response = await fetch('https://api.imgur.com/3/upload.json', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'Client-ID a444d490f310502'
          },
          body: this.state.file
        });
      }
      else {
        console.log("User Did Not Upload Image");
        this.setState({err:"You need to upload an image in order to make a submission!"})
        throw response
      }

      console.log('handle uploading-', file);
      const json = await response.json();
      if (response.ok) {
        console.log("great");
        console.log(json);
      }
      else {
        console.log("All fields are required!");
        this.setState({err:"All fields are required!"})
        throw response
      }
      console.log("Imgur Link",json.data.link);

      try {
        let newsubmission = {};
        if (this.state.user.username) {
           newsubmission = {
              title   : this.state.title,
              img     : json.data.link,
              desc    : this.state.desc,
              creator : this.state.user
          }
        }
        else {
          console.log("User Did Not Login");
          this.setState({err:"You cannot upload a submission until you login!"})
          throw this.state.user.username
        }
        let newresponse
        if (newsubmission.title && newsubmission.desc) {
          newresponse = await fetch(config.url+'/submissions',{
            method:"Post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(newsubmission)
          });
        }

        const newjson = await newresponse.json();
        if (newresponse.ok) {
          console.log(newjson);
          this.setState({status:"Uploaded!"})
          this.setState({submission:newjson})
          this.setState({created:true})
        }else {
          this.setState({status:"Try Again!"})
          this.setState({err:"All fields are required!"})
          throw newresponse

        }

      } catch (e) {
        this.setState({status:"Try Again!"})
        this.setState({err:"All Fields Are Required!"})
        console.log(e);
      }
    } catch (e) {
      this.setState({status:"Try Again!"})
      console.log("It Failed Bottom Catch"+e);
    }




  }

  handleInput(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          alt="Please Choose A Correct File Format (.JPEG, .PNG etc)"
          src={imagePreviewUrl}
          />
      );
    } else {
      $imagePreview = (
        <div></div>
        );
      }

      if (this.state.created) {
        return (<Redirect to={"/submissions/"+this.state.submission._id} />)
      }

      return (
        <div className="new_sub">
          <a href="https://i.imgur.com/2uYYMsa.png" target="_blank" rel="noopener noreferrer">Link To T-Shirt Template</a>
          <br></br>
          {this.state.user.username &&
            <h1>{"Hello "+this.state.user.username+"!"}</h1>
          }
          { this.state.err &&
            <Warning>{ this.state.err }</Warning>
          }
          <br></br>
          <h2>Make A New Submission</h2>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this.handleImageChange(e)} />
            <Input name='title' type='text' placeholder='Submission Title'
              onChange={ this.handleInput.bind(this) }/>
            <Input name='desc' type='text' placeholder='Submission Description'
              onChange={ this.handleInput.bind(this) }/>
            <br></br>
            <Button
              type="submit"
              onClick={(e)=>this.handleSubmit(e)}>
              {this.state.status}
            </Button>
          </form>
          <br></br>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

  export default NewSubmission;
