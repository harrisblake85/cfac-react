import React, {Component} from 'react';
import config from './config.js';
import { Button } from './shared/buttons'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
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
      await this.setState({err:json.message})
    }
    return (json)
  };


  async _handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.file);
    let file = this.state.file;

    const response = await fetch('https://api.imgur.com/3/upload.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Client-ID a444d490f310502'
      },
      body: this.state.file
    });
    const json = await response.json();
    console.log("json",json);

    console.log('handle uploading-', file);


  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

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
        <div
          className="previewText"
          >
          Please select an Image for Preview
        </div>);
      }

      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)} />
            <Button
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>
              Upload Image
            </Button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

  export default ImageUpload;
