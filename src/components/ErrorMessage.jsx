import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

function ErrorMessage({ message }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="error">
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorMessage