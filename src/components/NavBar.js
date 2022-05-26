import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography , ThemeProvider, Hidden, IconButton, SwipeableDrawer, Divider} from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom"
import { CurrencyState } from './Context';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AuthModal from './Authentication/AuthModal';

const useStyles = makeStyles((theme)=> ({

    logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color:'white',
      fontSize: "20px",
      marginRight: theme.spacing(5),
      "&:hover": {
        color: "#ED602B",
        borderBottom: "1px solid white",
      },
    },

}))

const NavBar = () => {
    const [open, setOpen]=useState(false)
    const classes = useStyles()
    const {currency, setCurrency } = CurrencyState()
    const history = useNavigate()
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
            <Typography style={{marginRight: 'auto', cursor: 'pointer'}} 
            onClick={()=>history('/')}>Coin<span>Watch</span></Typography> 
            <Hidden xsDown>
              <div className={classes.navlinks}>
                <NavLink to="/" exact className={classes.link} 
                style={({ isActive }) => ({ borderBottom: isActive ? "2px solid #ED602B" : " " })}>
                  Home
                </NavLink>
                <NavLink to="/news" exact className={classes.link} 
                style={({ isActive }) => ({ borderBottom: isActive ? "2px solid #ED602B" : " " })}>
                  News
                </NavLink>
              </div>
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={()=> setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Select variant='outlined'
              style={{width: 90, height:30 }}
              value={currency}
              onChange={(e)=> setCurrency(e.target.value)}>
              <MenuItem value={'USD'} >USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
            <Hidden xsDown>
            <AuthModal/>
            </Hidden>
          </Toolbar>
        </Container>
        <SwipeableDrawer open={open} 
         anchor={'right'} 
         onOpen={()=> setOpen(true)}
         onClose={()=> setOpen(false)}>
          <div>
          <IconButton onClick={()=> setOpen(false)}>
            <ChevronRightIcon />
          </IconButton>
          </div>
          <Divider/>
          <List >
            <ListItem>
              <NavLink to="/" exact className={classes.link} 
              style={({ isActive }) => ({ borderBottom: isActive ? "2px solid #ED602B" : " " })}
              >Home</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/news" exact className={classes.link} s
              tyle={({ isActive }) => ({ borderBottom: isActive ? "2px solid #ED602B" : " " })}
              >News</NavLink>
            </ListItem>
            <ListItem>
            <AuthModal/>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </ThemeProvider>
  )
}

export default NavBar