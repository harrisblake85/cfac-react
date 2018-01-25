import React,{Component} from 'react';
import Submission from './Submission.js'

class SubById extends Component {
  constructor(props){
    super(props)
    this.state={
      submission:{

      }
    }
  }
  componentWillMount(){
    this.showSubmission(this.props.match.params.id)
  }

  showSubmission(id){
    console.log(id);
    fetch("http://localhost:3010/submissions/"+id)
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((json) => {
      console.log(json);
      this.setState({
        submission:json
      })
    })
    .catch((err) => {
      console.log(err);
    })

  };
  
  render(){
    console.log(this.props);
    console.log(this.props.match.params.id);
    return(
       <Submission
        submission = {this.state.submission}
        />

    )
  }


  }


export default SubById;
