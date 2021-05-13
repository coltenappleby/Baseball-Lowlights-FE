import '../App.css';
import React, { useState }from 'react';
import {Switch, Route} from 'react-router-dom';
import PostList from './PostList';
import Login from './Login';
import PostShow from './PostShow';
import UserShow from './UserShow';
import PostEdit from './PostEdit';
import PostCard from './PostCard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {(!window.sessionStorage.getItem("currentUserId")) ? <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/> :
      <Switch>
        <Route exact path="/">
          <PostList />
        </Route>
        <Route exact path="/posts/:id/">
          <PostShow />
        </Route> 
        <Route path="/users/:id"> 
          <UserShow />
        </Route>
        <Route exact path="/posts/:id/edit">
          <PostEdit />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
