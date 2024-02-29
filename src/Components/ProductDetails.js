
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import '/ProductDetails.css'

function ProductDetails({images}) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
    .then((res) => setProduct(res.data))
    .catch((err) => console.log(err))
},[id])

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-5 mb-5'>
    <div className='row'>
      <div className='col-md-6'>
        <div id={`carousel-${id}`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner" style={{width:"35rem"}}>
            {product.images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card" style={{width:'100%', height:'32rem'}}>
          <div className="card-body">
            <h1 className="card-title text-center">{product.title}</h1>
            <p className="card-text"><span className='fw-bold fs-4'>Description: </span><br/>{product.description}</p>
            <p className="card-text"><span className='fw-bold fs-4'>Price: </span> ${product.price}</p>
            <p className="card-text"><span className='fw-bold fs-4'>Discounted Percentage: </span> {product.discountPercentage}%</p>
            <p className="card-text"><span className='fw-bold fs-4'>Rating: </span> ⭐ {product.rating}</p>
            <p className="card-text"><span className='fw-bold fs-4'>In Stock: </span> {product.stock} Items</p>
            <p className="card-text"><span className='fw-bold fs-4'>Brand: </span> {product.brand}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProductDetails;

















































