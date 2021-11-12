import '../App.css';
import React, { useState, useEffect }from 'react';
import {Switch, Route} from 'react-router-dom';
import PostList from './PostList';
import Login from './Login';
import PostShow from './PostShow';
import UserShow from './UserShow';
import PostEdit from './PostEdit';
import NavBar from './NavBar'
import Logout from './Logout'
import Header from './Header'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/posts`)
    .then(resp => resp.json())
    .then(setPosts)
  }, [])

  function removePost(id) {
    const filteredPosts = posts.filter((post) => post.id !== id)
    setPosts(filteredPosts)
  }
  
  return (
    <>
      <Header />
      {(!window.sessionStorage.getItem("currentUserId")) ? <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/> :
      <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <PostList posts={posts} setPosts={setPosts} removePost={removePost} />
          </Route>
          <Route exact path="/posts/:id/">
            <PostShow removePost={removePost}/>
          </Route> 
          <Route path="/users/:id"> 
            <UserShow removePost={removePost}/>
          </Route>
          <Route exact path="/posts/:id/edit">
            <PostEdit removePost={removePost}/>
          </Route>
          <Route path="/logout">
            <Logout setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
        </Switch>
      </>}
    </>
  );
}

export default App;
