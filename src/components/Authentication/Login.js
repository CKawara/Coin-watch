import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { CurrencyState } from '../Context'

const Login = ({handleClose}) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const{setAlert} = CurrencyState

    const handleSubmit =()=> {
        if(!email || !password){
            setAlert({
                open:true,
                message: 'Fill all the fields',
                type: 'error',
            })
            return;
        }
    }

  return (
    <Box p={3}
      style={{display: 'flex', flexDirection:'column', gap:'20px'}}>
        <TextField
            variant='outlined'
            type='email'
            label='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            variant='outlined'
            type='password'
            label='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            fullWidth
        />
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
        >
         Log In
        </Button>

    </Box >
  )
}

export default Login