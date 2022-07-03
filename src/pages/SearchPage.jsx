import { useState } from 'react'
import { MovieCard } from '../components/MovieCard'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import { SkeletonContainer } from '../components/SkeletonContainer'
import { Typography } from '@mui/material'
import { GoBackComponent } from '../components/GoBackComponent'
import { HeadingComponent } from '../components/HeadingComponent'

export const SearchPage = () => {
  const API_URL = 'https://www.omdbapi.com/?apikey=73af3a82&s='
  const [isLoading, setIsLoading] = useState(false)
  const allMovies = []
  const [moviesData, setMoviesData] = useState([])
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesList, setPagesList] = useState(0)
  const [firstOpen, setFirstOpen] = useState(true)

  const searchMovies = async (title) => {
    setFirstOpen(false)
    setIsLoading(true)
    setMoviesData([])
    setMovies([])
    setPagesList(0)
    setCurrentPage(1)
    for (let i = 1; i < 10; i++) {
      const response = await fetch(`${API_URL}${title}&page=${i}`)
      const data = await response.json()
      if (data.Response === 'False') {
        setIsLoading(false)
        setMoviesData([])
        return
      }
      allMovies.push(...data.Search)
    }

    const firstPageData = allMovies.slice(0, 20)
    setIsLoading(false)
    setMoviesData(allMovies)
    setMovies(firstPageData)
    if (moviesData.length > 0) {
      let pages = Math.ceil(moviesData.length / 20)
      setPagesList(pages)
    }
  }
  const pagination = async (title, page) => {
    setIsLoading(true)
    const limit = 20
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = moviesData.slice(startIndex, endIndex)
    setMovies([])
    setCurrentPage(page)
    setMovies(results)
    setIsLoading(false)
  }

  return (
    <>
      <GoBackComponent />
      <HeadingComponent text='SEARCH' px='16' />
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: '3%',
          marginBottom: '4%',
          alignItems: 'center',
        }}>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'center',
          }}>
          <TextField
            placeholder='Search...'
            type='text'
            className='form-control'
            size='small'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            onKeyPress={(e) => e.key === 'Enter' && searchMovies(search)}
            InputProps={{
              style: { fontSize: 'calc(12px + 5 * (100vw / 1280))' },
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => {
                      searchMovies(search)
                    }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div className='search-app'>
        <div>
          {!isLoading ? (
            <>
              {movies.length > 0 ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    direction: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Grid container spacing={0.5}>
                    {movies.map((movie) => (
                      <Grid item xs={3} key={movie.imdbID}>
                        <MovieCard movie={movie} key={movie.imdbID} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginTop: '3%',
                    marginBottom: '4%',
                    alignItems: 'center',
                  }}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      textAlign: 'center',
                    }}>
                    {!firstOpen ? (
                      <Alert severity='error'>No Movies Found</Alert>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              )}
              {moviesData.length > 20 ? (
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
                            pagination(search, currentPage + 1)
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
                            pagination(search, currentPage - 1)
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
                              pagination(search, currentPage + 1)
                            }}>
                            <Typography
                              sx={{
                                fontSize: `calc(9px + 5 * (100vw / 1280))`,
                              }}>
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
          ) : (
            <SkeletonContainer />
          )}
        </div>
      </div>
    </>
  )
}
