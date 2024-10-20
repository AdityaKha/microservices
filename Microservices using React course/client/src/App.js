import logo from './logo.svg';
import './App.css';
import CreatePost from './CreatePost';
import PostList from './PostList';

function App() {
  return (
    <div className="App">
      <p>
        <CreatePost />
        <PostList />
      </p>
    </div>
  );
}

export default App;
