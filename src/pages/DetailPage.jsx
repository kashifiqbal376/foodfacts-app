import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'

import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'

function DetailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const product = location.state?.product

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Product not found.</Typography>
        <Button onClick={() => navigate('/')}>Back to Search</Button>
      </Container>
    )
  }

  const isSaved = savedItems.some(p => p.code === product.code)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(product.code))
    } else {
      dispatch(addItem(product))
    }
  }

  const n = product.nutriments || {}

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          {product.image_small_url && (
            <Box
              component="img"
              src={product.image_small_url}
              alt={product.product_name}
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {product.product_name || 'Unknown Product'}
            </Typography>

            <Typography color="text.secondary" gutterBottom>
              {product.brands || 'Unknown Brand'}
            </Typography>

            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={
                isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />
              }
              onClick={handleSaveToggle}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Nutrition per 100g
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography>Calories: {n['energy-kcal_100g']}</Typography>
        <Typography>Protein: {n.proteins_100g}</Typography>
        <Typography>Carbs: {n.carbohydrates_100g}</Typography>
        <Typography>Sugars: {n.sugars_100g}</Typography>
        <Typography>Fat: {n.fat_100g}</Typography>
        <Typography>Salt: {n.salt_100g}</Typography>
      </Paper>
    </Container>
  )
}

export default DetailPage