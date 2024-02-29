import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
        setProducts(res.data.products);
        console.log(res.data.products);
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container mt-5 mb-5">
      <h1>{category} Products</h1>
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
            <div key={product.id} className="col">
                <ProductCard
                    product={product}
                />
            </div>
        ))}
    </div>
</div>
 
  );
}

export default CategoryPage;
  