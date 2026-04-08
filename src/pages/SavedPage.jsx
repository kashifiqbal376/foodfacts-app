import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>No saved items yet.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items ({saved.length})</h2>

      {saved.map(product => (
        <div key={product.code}>
          <h4>{product.product_name}</h4>
          <p>{product.brands}</p>

          <button onClick={() => navigate(`/product/${product.code}`)}>
            View Details
          </button>

          <button onClick={() => dispatch({ type: 'REMOVE', code: product.code })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default SavedPage