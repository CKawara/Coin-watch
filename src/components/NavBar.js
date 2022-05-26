import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography , ThemeProvider} from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom"
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
            <NavLink to="/" exact className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/news" exact className={classes.link}>
              News
            </NavLink>
            <NavLink to="/contact" exact className={classes.link}>
              Contact
            </NavLink>
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