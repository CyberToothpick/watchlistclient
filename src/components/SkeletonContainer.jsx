import Grid from '@mui/material/Grid'
import { SkeletonGrid } from './SkeletonGrid'

export const SkeletonContainer = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '3%',
        marginBottom: '4%',
        alignItems: 'center',
      }}>
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
      <SkeletonGrid />
    </Grid>
  )
}
