import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          if (response.data.status === 1) {
            setProduct(response.data.product)
          } else {
            setProduct(null)
          }
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (!product) return

    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) return <p>Loading product details...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.product_name}</h2>
      <p>{product.brands}</p>

      <img src={product.image_small_url} alt={product.product_name} />

      <h3>Nutrition per 100g</h3>
      <ul>
        <li>Energy: {product.nutriments.energy_100g}</li>
        <li>Fat: {product.nutriments.fat_100g}</li>
        <li>Carbs: {product.nutriments.carbohydrates_100g}</li>
        <li>Sugars: {product.nutriments.sugars_100g}</li>
        <li>Protein: {product.nutriments.proteins_100g}</li>
        <li>Salt: {product.nutriments.salt_100g}</li>
      </ul>

      <button onClick={handleSaveToggle}>
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage