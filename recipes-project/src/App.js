import './App.css';
import List from './components/List'
import { useDispatch } from 'react-redux'
import { addArticle } from './redux/actions/index'
function App() {
  const dispatch = useDispatch();
  dispatch(addArticle({name:"idan"}));

  return (
    <div className="App">
      <List/>
    </div>
  );
}

export default App;
