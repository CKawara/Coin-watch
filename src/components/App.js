import { makeStyles } from '@material-ui/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from '../pages/Homepage';
import NavBar from './NavBar';
import News from '../pages/News';
import Singlecoin from '../pages/Singlecoin';
import ContactUs from './ContactUs';
import Alert from './Alert';

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
      <Routes>
        <Route path={'/'}  element={<Homepage/>} exact/>
        <Route path={"/coins/:id"} element={<Singlecoin/>} />
        <Route path={"/news"} element={<News/>}/>
      </Routes>
      <ContactUs/>
    </div>
    <Alert/>
    </BrowserRouter>
  );
}

export default App;
