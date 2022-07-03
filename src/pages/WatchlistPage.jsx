import { Box, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GoBackComponent } from '../components/GoBackComponent'
import { MovieCard } from '../components/MovieCard'
import { SkeletonContainer } from '../components/SkeletonContainer'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { HeadingComponent } from '../components/HeadingComponent'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { fetchWatchlist } from '../http/watchlistAPI'

export const WatchlistPage = observer(() => {
  const { watchlist } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesList, setPagesList] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    fetchWatchlist().then((data) => {
      data.reverse()
      watchlist.setMovies(data)
      setIsLoading(false)
    })
  }, [])

  const pagination = async (page) => {
    setIsLoading(true)
    const limit = 20
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = watchlist.movies.slice(startIndex, endIndex)
    setMovies([])
    setCurrentPage(page)
    setMovies(results)
    setIsLoading(false)
  }

  return (
    <>
      <GoBackComponent />
      <>
        <HeadingComponent text='MY WATCHLIST' px='16' />
        {!isLoading ? (
          <>
            {watchlist.movies.length ? (
              <Box
                sx={{
                  flexGrow: 1,
                  direction: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Grid container spacing={0.5}>
                  {watchlist.movies.map((movie) => (
                    <Grid item xs={3} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <>No movies</>
            )}{' '}
          </>
        ) : (
          <SkeletonContainer />
        )}
        {watchlist.movies.length > 20 ? (
          <div className='pagination'>
            {currentPage === 1 ? (
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: 'center',
                }}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: 'center',
                  }}>
                  <></>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: 'center',
                  }}>
                  <h3>{currentPage}</h3>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: 'center',
                  }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => {
                      setCurrentPage(currentPage + 1)
                      pagination(currentPage + 1)
                    }}>
                    <Typography
                      sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
                      Next
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: 'center',
                }}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: 'center',
                  }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => {
                      setCurrentPage(currentPage - 1)
                      pagination(currentPage - 1)
                    }}>
                    <Typography
                      sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
                      Prev
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: 'center',
                  }}>
                  <h3>{currentPage}</h3>
                </Grid>
                {currentPage < pagesList ? (
                  <Grid
                    item
                    xs={4}
                    sx={{
                      textAlign: 'center',
                    }}>
                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => {
                        setCurrentPage(currentPage + 1)
                        pagination(currentPage + 1)
                      }}>
                      <Typography
                        sx={{ fontSize: `calc(9px + 5 * (100vw / 1280))` }}>
                        Next
                      </Typography>
                    </Button>
                  </Grid>
                ) : (
                  <Grid></Grid>
                )}
              </Grid>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  )
})
