import React, {Component} from 'react';
import Submission from './Submission.js';
import config from './config';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { best : {}  };
  };

  componentWillMount() {
    this.showBest();
  };

  async showBest(){
    try {
      const response = await fetch(config.url+"/submissions/best")
      const best     = await response.json()
      await this.setState({best});
    } catch (e) {
      console.log(e);
      this.setState({best:{title:"Not Found"}})
    }

  };

  render(){
    return(
      <div className="main-content home">
        <Submission
          submission = {this.state.best}
          subclass = "sub_best"
          />
        <h2>Creatives For A Cause</h2>
        <p>Creatives For A Cause allows creative people to help many causes through <em>Democracy!</em> The top Submission from our creatives is chosen at the end of every month to go into production! </p>
        <p>When purchasing our past productions or going into pre-ordering our winner you get to select the cause you support!</p>
        <p>Sign-Up to be a creative today! All submissions are purchases are welcome!</p>

      </div>
    )
  };
};

export default Home;
