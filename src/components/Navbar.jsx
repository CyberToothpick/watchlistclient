import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import Paper from '@mui/material/Paper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { Context } from '..'

export const Navbar = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2000 }}
      elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={() => {
            navigate('/')
          }}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate('/search')
          }}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate('/watchlist')
          }}
          icon={<FavoriteIcon />}
        />
        {user.isAuth ? (
          <BottomNavigationAction
            onClick={() => {
              navigate('/login')
            }}
            icon={<AccountCircleIcon />}
          />
        ) : (
          <BottomNavigationAction
            onClick={() => {
              navigate('/logout')
            }}
            icon={<AccountCircleIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  )
})
