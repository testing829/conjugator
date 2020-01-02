import React, { useContext, useEffect } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { Context } from './contexts/index';

import Account from './containers/Account';
import CancelSubscription from './containers/Account/CancelSubscription';
import Feedback from './containers/Feedback';
import ForgotPassword from './containers/Auth/ForgotPassword';
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
        // uri: process.env.REACT_APP_HEROKU_URL,
        uri: 'http://localhost:4000/',
        request: async operation => {
          operation.setContext({
            headers: {
              authorization: token
            }
          });
        }
      })
    : new ApolloClient({
        // uri: process.env.REACT_APP_HEROKU_URL
        uri: 'http://localhost:4000/'
      });

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Route path="/es" component={() => <Nav language="es" />} />
      <Route path="/fr" render={() => <Nav language="fr" />} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/es" />
        </Route>
        <Route exact path="/es" render={() => <Homepage />} />
        <Route exact path="/fr" render={() => <Homepage />} />
        <Route
          exact
          path="/:language/settings"
          render={props => <Settings {...props} />}
        />
        <Route
          exact
          path="/:language/feedback"
          render={props => <Feedback {...props} />}
        />
        <Route path="/:language/login" render={props => <Login {...props} />} />
        <Route
          path="/:language/sign-up"
          render={props => <SignUp {...props} />}
        />
        <Route
          path="/:language/account"
          render={props => <Account {...props} />}
        />
        <Route
          path="/:language/cancel-account"
          render={props => <CancelSubscription {...props} />}
        />
        <Route
          path="/:language/forgot-password"
          render={props => <ForgotPassword {...props} />}
        />
        <Route render={() => <h1>URL not found!</h1>} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
