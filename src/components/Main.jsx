import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from 'Dashboard';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li></li>
              <li>Messagffs</li>
          </ul>

          <Route pattern="/" component={Dashboard}/>
        </div>
      </Router>
    );
  }
};

export default Main;
