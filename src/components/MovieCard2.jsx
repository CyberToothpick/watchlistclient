import { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import '../styles/movieCard.css'
import { Button, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import Grow from '@mui/material/Grow'

export const MovieCard2 = ({ movie }) => {
  const [widthO, setWidthO] = useState(80)
  const ref = useRef(null)

  useEffect(() => {
    setWidthO(ref.current.offsetWidth)
  }, [])
  return (
    <Grow in>
      <Link to={`/title/${movie.id}`}>
        <Box
          sx={{
            height: 1,
            width: 1,
          }}>
          <div
            ref={ref}
            style={{
              padding: '0px 0px 150% 0px',
              overflow: 'hidden',
              position: 'relative',
            }}>
            <CardMedia
              sx={{
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
              }}
              component='img'
              image={movie.image !== 'N/A' ? movie.image : '/poster.jpg'}
              alt={movie.title}
            />
          </div>
          <Box
            sx={{
              fontSize: 'calc(12px + 5 * (100vw / 1280))',
              width: widthO,
              color: 'black',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              marginTop: '-0.8em',
              textOverflow: 'ellipsis',
              textAlign: 'center',
              marginTop: '3%',
              marginBottom: '3%',
            }}>
            {movie.title}
          </Box>
        </Box>
      </Link>
    </Grow>
  )
}
