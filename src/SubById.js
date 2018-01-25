import React,{Component} from 'react';
import Submission from './Submission.js'

class SubById extends Component {
  constructor(props){
    super(props)
    this.state={
      submission:{

      }
    };
    this.url = "http://localhost:3010";
  }
  componentWillMount(){
    this.showSubmission(this.props.match.params.id)
  }

  showSubmission(id){
    fetch(this.url+"/submissions/"+id)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        submission:json
      })
    })
    .catch((err) => {
      console.log(err);
    })

  };

  render(){
    return(
       <Submission
        subclass = "sub_id"
        submission = {this.state.submission}
        />
    )
  }


};


export default SubById;
