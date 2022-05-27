import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { CurrencyState } from '../Context';
import { Avatar, Button, Typography } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';


const useStyles = makeStyles({
  container:{
      width:300,
      padding:25,
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap:'25px'
  },
  picture:{
    width: 150,
    height: 150,
    cursor: 'pointer',
    objectFit: 'contain',
    backgroundColor: '#ED602B'

  },
  starred:{
    flex:1,
    padding:20,
    width:'100%',
    backgroundColor: '#333333',
    gap: 10,
    overflowY: 'scroll'
  },
  coin:{
    margin:10
  }

});


const UserProfile=()=> {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert, starred, coins} = CurrencyState()


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
 
  const logOut = ()=>{
    signOut(auth);

    setAlert({
        open: true,
        type:'success',
        message: 'Logout Successfull'
    })
    toggleDrawer()
}

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar
                onClick={toggleDrawer(anchor, true)}
                style={{
                    width:40,
                    height:40,
                    marginLeft:20,
                    cursor:'pointer',
                    backgroundColor:'#ED602B'
                }}
                src={user.photoURL}
            />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
                <Avatar className={classes.picture}
                    src={user.photoURL}
                />
                <Typography style={{fontSize: 'x-large'}}>
                    {user.displayName || user.email}
                </Typography>
                <div className={classes.starred}>
                    <h3>My Coins</h3>
                    <hr/>
                    {
                        // eslint-disable-next-line array-callback-return
                        coins.map((coin) => {
                            if (starred.includes(coin.id))
                            return (
                                <div className={classes.coin}>
                                    <Typography key={coin.id}>{coin.name}</Typography>
                                </div>
                            )
                        })
                    }
                </div>
                <Button variant='contained'
                    onClick={logOut}
                 >
                     LogOut
                </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default UserProfile
