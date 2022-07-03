import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import LinkIcon from '@mui/icons-material/Link'
import { DetailSkeleton } from '../components/DetailSkeleton'
import { GoBackComponent } from '../components/GoBackComponent'
import { addWatchlist, deleteWatchlist } from '../http/watchlistAPI'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const DetailPage = observer(() => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const action = (
    <Link to='/watchlist'>
      <Button size='small' variant='contained' sx={{ color: 'white' }}>
        Open
      </Button>
    </Link>
  )

  const { watchlist } = useContext(Context)
  const { id } = useParams()
  const API_URL = `https://www.omdbapi.com/?apikey=73af3a82&i=${id}`
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [movie, setMovie] = useState({})

  const fetchMovie = async () => {
    setIsLoading(true)
    const response = await fetch(API_URL)
    const data = await response.json()
    setMovie(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMovie()
    watchlist.movies.map((movie) => {
      if (movie.imdbID === id) {
        setIsAdded(true)
      }
    })
  }, [])

  return (
    <>
      {!isLoading ? (
        <div
          sx={{
            marginTop: '3%',
            marginBottom: '4%',
          }}>
          <GoBackComponent />

          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              sx={{
                textAlign: 'center',
              }}>
              <Typography
                variant='h5'
                gutterBottom
                component='div'
                sx={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  fontSize: `calc(16px + 5 * (100vw / 1280))`,
                  fontWeight: 800,
                }}>
                {movie.Title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                textAlign: 'center',
              }}>
              <Typography
                variant='h5'
                gutterBottom
                component='div'
                sx={{
                  textAlign: 'right',
                  textTransform: 'uppercase',
                  fontSize: `calc(12px + 5 * (100vw / 1280))`,
                  fontWeight: 800,
                  opacity: 0.5,
                }}>
                {movie.Year}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '3%',
              marginBottom: '4%',
            }}>
            <Grid
              item
              xs={4}
              sx={{
                textAlign: 'center',
              }}>
              <CardMedia
                image={movie.Poster}
                alt={movie.Title}
                component='img'
              />
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                textAlign: 'left',
              }}>
              <div style={{ paddingLeft: '4%' }}>
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      textAlign: 'left',
                    }}>
                    <Typography
                      variant='h6'
                      gutterBottom
                      component='div'
                      sx={{
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        fontSize: `calc(8px + 5 * (100vw / 1280))`,
                        fontWeight: 600,
                        opacity: 0.5,
                      }}>
                      {movie.Country}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      textAlign: 'right',
                    }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Rating
                        name='half-rating'
                        size='small'
                        value={parseFloat(movie.imdbRating) / 2}
                        precision={0.1}
                        readOnly
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(10px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.7,
                  }}>
                  Storyline:
                </Typography>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(8px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.5,
                  }}>
                  {movie.Plot}
                </Typography>
              </div>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                textAlign: 'left',
              }}>
              <Typography
                variant='h6'
                gutterBottom
                component='div'
                sx={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  fontSize: `calc(8px + 5 * (100vw / 1280))`,
                  fontWeight: 600,
                  opacity: 0.7,
                }}>
                Genres:
              </Typography>
              <Typography
                variant='h6'
                gutterBottom
                component='div'
                sx={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  fontSize: `calc(8px + 5 * (100vw / 1280))`,
                  fontWeight: 600,
                  opacity: 0.5,
                }}>
                {movie.Genre}
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                textAlign: 'left',
              }}>
              <div style={{ paddingLeft: '4%' }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(8px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.7,
                  }}>
                  Directors:
                </Typography>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(8px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.5,
                  }}>
                  {movie.Director}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '3%',
              marginBottom: '4%',
            }}>
            <Grid
              item
              xs={4}
              sx={{
                textAlign: 'center',
              }}>
              {!isAdded ? (
                <>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    sx={{ marginBottom: '3%', zIndex: 3000 }}>
                    <Alert severity='info' sx={{ width: 1 }}>
                      Deleted From Watchlist
                    </Alert>
                  </Snackbar>
                  <IconButton
                    variant='primary'
                    color='error'
                    size='small'
                    onClick={() => {
                      addWatchlist(id)
                      setIsAdded(true)
                      handleClick()
                    }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    sx={{ marginBottom: '3%', zIndex: 3000 }}>
                    <Alert severity='success' sx={{ width: 1 }} action={action}>
                      Added to Watchlist
                    </Alert>
                  </Snackbar>
                  <IconButton
                    variant='primary'
                    color='error'
                    size='small'
                    onClick={() => {
                      deleteWatchlist(id)
                      setIsAdded(false)
                      handleClick()
                    }}>
                    <FavoriteIcon />
                  </IconButton>
                </>
              )}

              <IconButton
                variant='primary'
                color='secondary'
                onClick={(e) => {
                  e.preventDefault()
                  window.open(
                    `https://imdb.com/title/${id}`,
                    '_blank',
                    'noopener,noreferrer'
                  )
                }}
                sx={{
                  marginTop: '1%',
                  marginBottom: '2%',
                }}>
                <LinkIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                textAlign: 'left',
              }}>
              <div style={{ paddingLeft: '4%' }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(8px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.7,
                  }}>
                  Actors:
                </Typography>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    fontSize: `calc(8px + 5 * (100vw / 1280))`,
                    fontWeight: 600,
                    opacity: 0.5,
                  }}>
                  {movie.Actors}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Typography
            variant='h6'
            gutterBottom
            component='div'
            sx={{
              textAlign: 'left',
              textTransform: 'uppercase',
              fontSize: `calc(4px + 5 * (100vw / 1280))`,
              fontWeight: 600,
              opacity: 0.2,
            }}>
            {id}
          </Typography>
        </div>
      ) : (
        <>
          <DetailSkeleton />
        </>
      )}
    </>
  )
})

export default DetailPage
