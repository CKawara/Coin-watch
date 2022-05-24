import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme)=> ({

     logo: {
        flexGrow: "1",
        cursor: "pointer",
      },
      link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(5),
        "&:hover": {
          color: "yellow",
          borderBottom: "1px solid white",
        },
      },
}))

const NavBar = () => {
    const classes = useStyles()
  return (
    <AppBar color='transparent'  position='static'>
        <Container maxWidth='s'>
            <Toolbar>
                <Typography>CoinWatch</Typography> 
                <div className={classes.navlinks}>
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/news" className={classes.link}>
              About
            </NavLink>
            <NavLink to="/contact" className={classes.link}>
              Contact
            </NavLink>

          </div>
          
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavBar