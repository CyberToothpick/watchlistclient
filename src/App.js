import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'
import Container from '@mui/material/Container'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { WatchlistPage } from './pages/WatchlistPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { useState, useContext, useEffect } from 'react'
import DetailPage from './pages/DetailPage'
import { Context } from '.'
import { LogoutPage } from './pages/LogoutPage'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const App = observer(() => {
  const { user } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check().then((data) => {
      user.setUser(true)
      user.setIsAuth(true)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Container fixed maxWidth='sm' sx={{ paddingBottom: 10 }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {user.isAuth ? (
            <Route path='/search' element={<SearchPage />} />
          ) : (
            <Route path='/search' element={<Navigate to='/login' replace />} />
          )}
          {user.isAuth ? (
            <Route path='/watchlist' element={<WatchlistPage />} />
          ) : (
            <Route
              path='/watchlist'
              element={<Navigate to='/login' replace />}
            />
          )}
          {!user.isAuth ? (
            <Route path='/login' element={<LoginPage />} />
          ) : (
            <Route path='/login' element={<Navigate to='/logout' replace />} />
          )}
          {!user.isAuth ? (
            <Route path='/register' element={<RegisterPage />} />
          ) : (
            <Route
              path='/register'
              element={<Navigate to='/logout' replace />}
            />
          )}
          {user.isAuth ? (
            <Route path='/logout' element={<LogoutPage />} />
          ) : (
            <Route path='/logout' element={<Navigate to='/login' replace />} />
          )}
          {user.isAuth ? (
            <Route path='/title/:id' element={<DetailPage />} />
          ) : (
            <Route
              path='/title/:id'
              element={<Navigate to='/login' replace />}
            />
          )}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Navbar />
      </Container>
    </BrowserRouter>
  )
})

export default App
