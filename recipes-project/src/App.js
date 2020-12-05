import './App.css';
import List from './components/List'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/actions/index'
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();

  const handleClick = () =>{
    dispatch(addUser());
  }
  return (
    <div className="App">
      <List/>
      <button type="button" width="200px" height="200px" onClick={handleClick}>check</button>
    </div>
  );
}

export default App;
