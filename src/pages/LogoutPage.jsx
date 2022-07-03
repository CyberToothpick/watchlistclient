import { Button, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '..'
import { HeadingComponent } from '../components/HeadingComponent'

export const LogoutPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(Context)

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate('/')
  }

  return (
    <>
      <HeadingComponent text='Profile' px='16' />

      <Grid container>
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '2%' }}>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              navigate('/search')
            }}>
            <Typography sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
              Search
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '2%' }}>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              navigate('/watchlist')
            }}>
            <Typography sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
              My Watchlist
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '2%' }}>
          <Button
            variant='contained'
            size='medium'
            onClick={() => {
              logout()
            }}>
            <Typography sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
              Logout
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
