import { Snackbar } from '@material-ui/core'
import React from 'react'
import { CurrencyState } from './Context'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = () => {
    const {alert, setAlert} = CurrencyState()
  
    const handleClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert({open: false});
    };
  return (
    <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleClose}
        >
        <MuiAlert
            onClose={handleClose}
            elevation={10}
            variant='filled'
            severity={alert.type}
         >
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert