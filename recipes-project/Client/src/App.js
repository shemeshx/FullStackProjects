import './App.css';
import RecipesGrid from './components/RecipesGrid'
import { useDispatch } from 'react-redux'
import SideMenu from './components/SideMenu';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }}));
function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideMenu/>
      <RecipesGrid/>
    </div>
  );
}

export default App;
