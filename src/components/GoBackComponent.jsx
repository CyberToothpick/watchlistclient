import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const GoBackComponent = () => {
  const navigate = useNavigate()

  return (
    <IconButton
      variant='primary'
      onClick={() => navigate(-1)}
      sx={{
        marginTop: '1%',
        marginBottom: '3%',
      }}>
      <ArrowBackIcon />
    </IconButton>
  )
}
