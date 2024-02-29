import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from '../Components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/`)
      .then(response => {
        console.log('API Response:', response.data); 
        setProducts(response.data.products);
        console.log('Updated Products:', response.data.products); 
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  console.log('Products:', products); 

  return (
    <div>
      <h1 className='text-center mt-3'>Products</h1>
        <div className='container-fluid mt-5 mb-5' >
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {products.map(product => (
                    <div key={product.id} className="col">
                    <ProductCard product={product} />
                    </div>
                    ))}
            </div>
        </div>
    </div>
  );
}

export default Home;


















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('https://dummyjson.com/products')
//       .then(response => {
//         setProducts(response.data.products);
//         console.log(response.data.products);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Products</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}><Link to={`/product/${product.id}`}>{product.title}</Link> </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;
















































// import React, { useEffect, useState } from 'react';
// import CategoryProducts from '../Components/CategoryProducts';
// import axios from 'axios';

// function Home({ selectedCategory }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (selectedCategory) {
//         try {
//           const res = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
//           setProducts(res.data.products);
//         } catch (error) {
//           console.error(`Error fetching products for category ${selectedCategory}:`, error);
//         }
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   return (
//     <div className="container-fluid">
//       <h1>Welcome to homePage</h1>
//       {products.map((product, index) => (
//         <div key={index}>{product.title}</div>
//         // You can customize the display of each product here
//       ))}
//     </div>
//   );
// }

// export default Home;

