import React, {Component} from 'react';
import Submissions from './Submissions.js';
import config from './config';
import { Button } from './shared/buttons';
import { Link } from 'react-router-dom';
import Dropdown, {DropdownTrigger,DropdownContent} from 'react-simple-dropdown';

class Gallery extends Component {
  constructor(props){
    super(props)
    this.path = this.props.match.path;
    this.state={
      submissions: [],
      page : this.props.match.params.page,
      sort : this.props.match.params.sort,
      asc  : this.props.match.params.asc,
      likesclass:"",
      createdAtclass:"",
      "1class":"",
      "-1class":"",
      changed : false,
      explain2: "Most Likes",
      explain1: "Least Likes",
      likesactive:false,
      createdAtactive:false
    }
  };

  componentWillMount(){
    this.showGallery();
  };

  async showGallery() {
    try {
      const response    = await fetch(config.url+"/submissions/page/"+ this.state.page+"/"+this.state.sort+"/"+this.state.asc);
      const submissions = await response.json();
      await this.setState({submissions});
      let sortclass = this.state.sort+"class";
      let ascclass  = this.state.asc +"class";
      await this.noClass();
      this.setState({[sortclass]:"active",[ascclass]:"active"})
    } catch (e) {
      this.setState({submissions:[{title:"Not Found",key:"Not Found"}]});
    }
  };

  async noClass(){
    await this.setState({
      likesclass:"",
      createdAtclass:"",
      "1class":"",
      "-1class":""

    })
  }
  async sortBycreatedAt() {
    await this.setState({sort:"createdAt",createdAtclass:"active"})
    await this.setState({explain2:"Most Recent",explain1:"Least Recent"})
    await this.setState({createdAtactive:!this.state.createdAtactive});
    await this.setState({likesactive:false});
    this.showGallery();
  }
  async sortBylikes() {
    await this.setState({sort:"likes",likesclass:"active"})
    await this.setState({explain2:"Most Likes",explain1:"Least Likes"})
    await this.setState({likesactive:!this.state.likesactive});
    await this.setState({createdAtactive:false});
    this.showGallery();
  }

  async sortBylowhigh() {
    await this.setState({asc:"1",ascclass:"active"})
    this.showGallery();
  }

  async sortByhighlow() {
    await this.setState({asc:"-1",dscclass:"active"})
    this.showGallery();
  }

  async lastpage() {
    let nextpage = this.state.page;
    nextpage--;
    nextpage += "";
    await this.setState({page:nextpage})
    this.showGallery();
  }

  async nextpage() {
    let nextpage = this.state.page;
    nextpage++;
    nextpage += "";
    await this.setState({page:nextpage})
    this.showGallery();
  }




  render(){
    this.dropdown_insides =
    <DropdownContent>
      <ul><li><Link
            to={"/gallery/"+this.state.page+"/"+this.state.sort+"/-1"} >
            <Button
              className={this.state["-1class"]}
              onClick={ this.sortByhighlow.bind(this) }>
              {this.state.explain2}
            </Button></Link></li>
        <li><Link
            to={"/gallery/"+this.state.page+"/"+this.state.sort+"/1"} >
            <Button
              className={this.state["1class"]}
              onClick={ this.sortBylowhigh.bind(this) }>
              {this.state.explain1}
            </Button></Link></li></ul>
    </DropdownContent>

    return(
      <div className="gallery">
        <div className="dropdowns">

        <Dropdown active={false} onClick = {this.lastpage.bind(this)}>
          <Link to={"/gallery/"+(parseInt(this.state.page,10)-1)+"/"+this.state.sort+"/"+this.state.asc}>
          <DropdownTrigger><Button >Last Page</Button></DropdownTrigger>
          </Link>
          </Dropdown>

        <Dropdown active={this.state.likesactive} onClick = {this.sortBylikes.bind(this)}>
          <DropdownTrigger><Button className={"ddlbutton "+this.state.likesclass}>Sort By Likes</Button></DropdownTrigger>
          {this.dropdown_insides}
        </Dropdown>

        <Dropdown active={this.state.createdAtactive} onClick = {this.sortBycreatedAt.bind(this)}>
          <DropdownTrigger><Button className={"ddrbutton "+this.state.createdAtclass}>Sort By Date</Button></DropdownTrigger>
          {this.dropdown_insides}
        </Dropdown>


        <Dropdown active={false} onClick = {this.nextpage.bind(this)}>
          <Link to={"/gallery/"+(parseInt(this.state.page,10)+1)+"/"+this.state.sort+"/"+this.state.asc}>
          <DropdownTrigger><Button className={"ddrbutton "+this.state.createdAtclass}>Next Page</Button></DropdownTrigger>
          </Link>
          </Dropdown>


        </div>


        <Submissions
          submissions = {this.state.submissions}
          />

      </div>

    )
  };

};

export default Gallery;
