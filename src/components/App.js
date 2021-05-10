import {Switch, Route} from 'react-router-dom'
import PostList from './PostList'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <PostList />
      </Route>
    </Switch>
  );
}

export default App;
