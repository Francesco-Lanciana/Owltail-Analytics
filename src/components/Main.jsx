import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import StatsChart from 'StatsChart';
import Dashboard from 'Dashboard';

class Main extends React.Component {
  state = {
    right: 50
  }

  handleButtonClick = () => {
    this.setState({
      right: this.state.right === 50 ? 200 : 50
    })
  }

  render() {
    return (
      <Router>
        <div>
          <button onClick={this.handleButtonClick}>Resize container</button>
          <div style={{
            position: 'static',
            height: 200,
            top: 50,
            right: this.state.right,
            bottom: 50,
            left: 50
          }}>
          <StatsChart/>
          </div>

          <Route pattern="/" component={Dashboard}/>
        </div>
      </Router>
    );
  }
};

export default Main;
