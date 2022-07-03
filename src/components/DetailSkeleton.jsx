import { Grid, Skeleton } from '@mui/material'
import React from 'react'

export const DetailSkeleton = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Skeleton variant='circular' width={30} height={30} />
        </Grid>
        <Grid item xs={12} sx={{ padding: '5%' }}>
          <Skeleton variant='text' />
          <Skeleton variant='rectangular' width='100%' height='0.2em' />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            textAlign: 'center',
          }}>
          <Skeleton variant='rectangular' width='100%' height='15em' />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            textAlign: 'center',
            paddingLeft: '5%',
          }}>
          <Skeleton variant='rectangular' width='100%' height='20em' />
        </Grid>
      </Grid>
    </>
  )
}
