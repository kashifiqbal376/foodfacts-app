import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      className="food-card"
      onClick={() => navigate(`/product/${product.code}`)}
      style={{ cursor: 'pointer' }}
    >
      <img src={product.image_small_url} alt={product.product_name} />
      <h3>{product.product_name}</h3>
      <p>{product.brands}</p>
    </div>
  )
}

export default FoodCard