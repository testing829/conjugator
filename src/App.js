import React, { useState } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Homepage from './containers/Homepage/index';
import Nav from './components/Nav/index';
import Settings from './containers/Settings/index';

function App() {
  const [level, setLevel] = useState(0);
  const [latam, setLatam] = useState(true);
  const [token, setToken] = useState('');

  const client = new ApolloClient({
    uri: process.env.REACT_APP_HEROKU_URL
  });
  return (
    <>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />

          <Route
            exact
            path="/settings"
            render={props => <Settings {...props} />}
          />
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
      </ApolloProvider>
    </>
  );
}

export default App;
