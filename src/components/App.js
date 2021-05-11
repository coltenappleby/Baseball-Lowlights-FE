import React, { useState }from 'react'
import {Switch, Route} from 'react-router-dom'
import PostList from './PostList'
import Login from './Login'

function App() { 
  const [currentUserId, setCurrentUserId] = useState("")

 
  return (
    <Switch>
      <Route exact path="/">
        {currentUserId ? <PostList /> : <Login setCurrentUserId={setCurrentUserId}/>}
      </Route>
      <Route path="/users">
        <h1>something</h1>
      </Route>
    </Switch>
  );
}

export default App;
