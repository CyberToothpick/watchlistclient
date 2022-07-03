import {
  Alert,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoBackComponent } from '../components/GoBackComponent'
import { HeadingComponent } from '../components/HeadingComponent'
import { registration } from '../http/userAPI'

export const RegisterPage = observer(() => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const postRegister = async () => {
    try {
      setIsLoading(true)
      const data = await registration(login, password)
      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.log(error.response.data.msg)
      setIsLoading(false)
      setIsError(true)
      setErrorMsg(error.response.data.msg)
      throw new Error(error.response.data.msg || 'Login error')
    }
  }

  return (
    <>
      <GoBackComponent />
      {isError === false ? (
        <Alert severity='success'>Succesfuly Registered</Alert>
      ) : isError === true ? (
        <Alert severity='error'>{errorMsg}</Alert>
      ) : (
        <></>
      )}
      <HeadingComponent text='Register' px='16' />
      <form>
        <FormControl sx={{ mt: 1, width: 1 }} variant='outlined'>
          <TextField
            fullWidth
            label='Login'
            size='small'
            id='login'
            type='text'
            name='login'
            onChange={(e) => {
              setLogin(e.target.value)
            }}
          />
        </FormControl>
        <FormControl sx={{ mt: '2%', width: 1 }} variant='outlined'>
          <TextField
            fullWidth
            size='small'
            name='password'
            label='Password'
            id='password'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </FormControl>
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: 'right', marginTop: '2%' }}>
            <Button
              variant='contained'
              size='medium'
              onClick={() => {
                postRegister()
              }}>
              <Typography sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
                Register
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={{
            marginTop: '5%',
            textAlign: 'right',
            textTransform: 'uppercase',
            fontSize: `calc(8px + 5 * (100vw / 1280))`,
            fontWeight: 800,
            opacity: 0.6,
          }}>
          Already have an account?
        </Typography>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={{
            marginTop: '1%',
            textAlign: 'right',
            textTransform: 'uppercase',
            fontSize: `calc(8px + 5 * (100vw / 1280))`,
            fontWeight: 800,
            opacity: 0.6,
          }}>
          <Link sx={{ color: 'blue' }} to='/login'>
            Login
          </Link>
        </Typography>
      </div>
    </>
  )
})
