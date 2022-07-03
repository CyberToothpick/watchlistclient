import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'

export const SkeletonGrid = () => {
  return (
    <Grid
      item
      xs={3}
      sx={{
        textAlign: 'center',
      }}>
      <Skeleton variant='rectangular' width='100%' height='10em' />
      <Skeleton variant='text' />
    </Grid>
  )
}
