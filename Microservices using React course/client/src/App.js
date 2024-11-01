import logo from './logo.svg';
import './App.css';
import CreatePost from './CreatePost';
import PostList from './PostList';

function App() {
  return (
    <div className="App">
      <div>
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}

export default App;
