import { Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export const HeadingComponent = ({ text, px }) => {
  return (
    <Typography
      variant='h5'
      gutterBottom
      component='div'
      sx={{
        padding: '4%',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: `calc(${px}px + 5 * (100vw / 1280))`,
        fontWeight: 800,
        color: blue[800],
      }}>
      {text}
    </Typography>
  )
}
