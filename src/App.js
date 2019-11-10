import React, { useContext, useEffect } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { Context } from './contexts/index';
import Dashboard from './containers/Dashboard';
import Feedback from './containers/Feedback';
import Homepage from './containers/Homepage/index';
import Login from './containers/Auth/Login';
import Nav from './components/Nav/index';
import Settings from './containers/Settings/index';
import SignUp from './containers/Auth/SignUp';

function App() {
  const { setLoggedIn } = useContext(Context);

  useEffect(() => {
    const doesTokenExist = window.localStorage.getItem('jwt');
    if (doesTokenExist) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const token = window.localStorage.getItem('jwt');

  const client = token
    ? new ApolloClient({
        uri: process.env.REACT_APP_HEROKU_URL,
        // uri: 'http://localhost:4000/',
        request: async operation => {
          operation.setContext({
            headers: {
              authorization: token
            }
          });
        }
      })
    : new ApolloClient({
        uri: process.env.REACT_APP_HEROKU_URL
        // uri: 'http://localhost:4000/'
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
          <Route
            exact
            path="/feedback"
            render={props => <Feedback {...props} />}
          />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} />}
          />
          <Route
            exact
            path="/account"
            render={props => <Dashboard {...props} />}
          />
          <Route render={() => <h1>URL not found!</h1>} />
        </Switch>
      </ApolloProvider>
    </>
  );
}

export default App;
