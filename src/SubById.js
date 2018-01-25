import React,{Component} from 'react';
import Submission from './Submission.js'

class SubById extends Component {
  constructor(props){
    super(props)
    this.state={
      submission:{}
    };
    this.url = "http://localhost:3010";
  }
  componentWillMount(){
    this.showSubmission(this.props.match.params.id)
  }

  async showSubmission(id){
    try {
      const response   = await fetch(this.url+"/submissions/"+id);
      const submission = await response.json();
                         await this.setState({submission})
    } catch (e) {
      console.log(e);
      this.setState({submission:{title:"Not Found"}})
    }
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
