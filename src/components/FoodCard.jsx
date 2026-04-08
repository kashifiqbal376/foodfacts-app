function FoodCard({ product }) {
    const { product_name, brands, nutriments, image_small_url } = product
  
    return (
      <div className="food-card">
        {image_small_url ? (
          <img src={image_small_url} alt={product_name} />
        ) : (
          <p>No image</p>
        )}
  
        <h2>{product_name || "Unknown Product"}</h2>
        <p><strong>Brand:</strong> {brands || "N/A"}</p>
  
        <p>Calories: {nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal</p>
        <p>Protein: {nutriments?.proteins_100g ?? 'N/A'} g</p>
        <p>Carbs: {nutriments?.carbohydrates_100g ?? 'N/A'} g</p>
        <p>Fat: {nutriments?.fat_100g ?? 'N/A'} g</p>
      </div>
    )
  }
  
  export default FoodCard