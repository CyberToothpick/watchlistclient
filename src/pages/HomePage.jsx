import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { SkeletonContainer } from '../components/SkeletonContainer'
import { HeadingComponent } from '../components/HeadingComponent'
import { GoBackComponent } from '../components/GoBackComponent'
import { MovieCard2 } from '../components/MovieCard2'

export const HomePage = () => {
  const MOVIE_API_URL =
    'https://imdb-api.com/en/API/MostPopularMovies/k_rp9il0hw'
  const SERIES_API_URL = 'https://imdb-api.com/en/API/MostPopularTVs/k_rp9il0hw'
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [moviesData, setMoviesData] = useState([])
  const [seriesData, setSeriesData] = useState([])
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [pagesList, setPagesList] = useState(0)
  const [pagesList2, setPagesList2] = useState(0)

  const popularMovies = async () => {
    setIsLoading(true)
    setMoviesData([])
    setMovies([])
    setPagesList(0)
    setCurrentPage(1)
    const response = await fetch(MOVIE_API_URL)
    const data = await response.json()
    const firstPageData = data.items.slice(0, 12)
    setIsLoading(false)
    setMoviesData(data.items)
    setMovies(firstPageData)
    if (moviesData.length > 0) {
      let pages = Math.ceil(moviesData.length / 12)
      setPagesList(pages)
    }
  }

  const pagination = async (page) => {
    setIsLoading(true)
    const limit = 12
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = moviesData.slice(startIndex, endIndex)
    setMovies([])
    setCurrentPage(page)
    setMovies(results)
    setIsLoading(false)
  }

  const popularTV = async () => {
    setIsLoading2(true)
    setSeriesData([])
    setSeries([])
    setPagesList(0)
    setCurrentPage2(1)
    const response = await fetch(SERIES_API_URL)
    const data = await response.json()
    const firstPageData = data.items.slice(0, 12)
    setIsLoading2(false)
    setSeriesData(data.items)
    setSeries(firstPageData)
    if (seriesData.length > 0) {
      let pages = Math.ceil(seriesData.length / 12)
      setPagesList2(pages)
    }
  }

  const paginationTV = async (page) => {
    setIsLoading2(true)
    const limit = 12
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = seriesData.slice(startIndex, endIndex)
    setSeries([])
    setCurrentPage2(page)
    setSeries(results)
    setIsLoading2(false)
  }

  useEffect(() => {
    popularMovies()
    popularTV()
  }, [])

  return (
    <>
      <GoBackComponent />
      <HeadingComponent text='TOP MOVIES' px='16' />
      <div>
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
                      <Grid item xs={3}>
                        <MovieCard2 movie={movie} key={movie.id} />
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
                    }}></Grid>
                </Grid>
              )}
              {movies.length > 0 ? (
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

      <HeadingComponent text='TOP SERIES' px='16' />

      <div>
        <div>
          {!isLoading2 ? (
            <>
              {series.length > 0 ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    direction: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Grid container spacing={0.5}>
                    {series.map((movie) => (
                      <Grid item xs={3}>
                        <MovieCard2 movie={movie} key={movie.id} />
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
                    }}></Grid>
                </Grid>
              )}
              {series.length > 0 ? (
                <div className='pagination'>
                  {currentPage2 === 1 ? (
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
                        <h3>{currentPage2}</h3>
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
                            setCurrentPage2(currentPage2 + 1)
                            paginationTV(currentPage2 + 1)
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
                            setCurrentPage2(currentPage2 - 1)
                            paginationTV(currentPage2 - 1)
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
                        <h3>{currentPage2}</h3>
                      </Grid>
                      {currentPage2 < pagesList2 ? (
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
                              setCurrentPage2(currentPage2 + 1)
                              paginationTV(currentPage2 + 1)
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
