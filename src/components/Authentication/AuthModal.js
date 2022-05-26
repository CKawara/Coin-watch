import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor: theme.palette.background.paper,
    fontWeight: 900,
    padding:20
  },
}));

const AuthModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained'
        style={{
            width: 70,
            height: 30,
            marginLeft: 20,
            // backgroundColor:'#ED602B',
            color: 'black'
        }}
        onClick={handleOpen}
        >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static'
                style={{backgroundColor: 'transparent', color:'white'}}
            >
                <Tabs value={value}
                    onChange={handleChange}
                    variant='fullWidth'
                    style={{borderRadius: 10}}
                >
                    <Tab label='login'/>
                    <Tab label='sign up'/>
                </Tabs>
            </AppBar>
            {value === 0 &&  <Login handleClose={handleClose}/>}
            {value ===1 && <SignUp handleClose={handleClose}/>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal