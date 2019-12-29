import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Auth, Bookings, Events } from "./pages";
import { MainNavigation } from './components/Navigation/MainNavigation'
import { AuthContext } from './context/auth-context'

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId });
  }

  logout = (token, userId, tokenExpiration) => {
    this.setState({ token: null, userId: null });
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout,
        }}>
          <MainNavigation />
          <Switch>
            <Redirect from='/' to='/auth' exact />
            <Route path='/auth' component={Auth} />
            <Route path='/events' component={Events} />
            <Route path='/bookings' component={Bookings} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter >
    );
  }
}

export default App;
