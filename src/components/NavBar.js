import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography , ThemeProvider} from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { CurrencyState } from './Context';

const useStyles = makeStyles((theme)=> ({

     logo: {
        flexGrow: "1",
        cursor: "pointer",
      },
      link: {
        textDecoration: "none",
        color:'white',
        fontSize: "20px",
        marginLeft: theme.spacing(5),
        "&:hover": {
          color: "#ED602B",
          borderBottom: "1px solid white",
        },
      },
}))

const NavBar = () => {
    const classes = useStyles()
    const {currency, setCurrency } = CurrencyState()
    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type: "dark"
        },
    })
  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent'  position='static'>
        <Container >
            <Toolbar>
                <Typography >Coin<span>Watch</span></Typography> 
                <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/news" className={classes.link}>
              News
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
          </div>
            <Select variant='outlined'
             style={{width: 100, height:40}}
             value={currency}
             onChange={(e)=> setCurrency(e.target.value)}
             >
                <MenuItem value={'USD'} >USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default NavBar