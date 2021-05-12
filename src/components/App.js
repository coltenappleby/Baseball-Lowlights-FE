import React, { useState }from 'react'
import {Switch, Route} from 'react-router-dom'
import PostList from './PostList'
import Login from './Login'
import PostShow from './PostShow'
import UserShow from './UserShow'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {(!window.sessionStorage.getItem("currentUserId")) ? <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/> : 
      <Switch>
        <Route exact path="/">
          <PostList />
        </Route>
        <Route path="/posts/:id">
          <PostShow />
        </Route> 
        <Route path="/users/:id"> 
          <UserShow />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
