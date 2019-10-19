import React from 'react';

import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Homepage from './containers/Homepage/index';
import Nav from './components/Nav/index';

function App() {
  return (
    <>
      <CssBaseline />
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Homepage />} />
        {/* <Route
        path="/signup"
        render={props => <Signup {...props} updateToken={updateToken} />}
      />
      <Route
        path="/login"
        render={props => (
          <Login {...props} token={token} updateToken={updateToken} />
        )}
      />
      <Route
        path="/dashboard"
        render={props => <Dashboard {...props} token={token} />}
      />
      <Route exact path="/settings" render={props => <Settings {...props} />} /> */}
        <Route render={() => <h1>URL not found!</h1>} />
      </Switch>
    </>
  );
}

export default App;
