import { makeStyles } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';
import News from './components/News';
import Singlecoin from './components/Singlecoin';

const useStyles = makeStyles({
  App:{
    backgroundColor : '#0A0C0C',
    color : 'white',
    minHeight: '100vh',
  },
});
function App() {
  
  const classes = useStyles()
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <NavBar />
      <Switch>
        <Route path={'/'}  component={Homepage} exact/>
        <Route path={"/coins/:id"} component={Singlecoin}/>
        <Route path={"/news"} component={News}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
