import React from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch , useSelector} from "react-redux";
import { addToWishlist } from '../Store/Actions/AddToWishList';
import { addToFavorites } from '../Store/Actions/AddToFavorite'
import { removeFromWishlist } from '../Store/Actions/RemoveFromWishList';
import { removeFromFavorites } from '../Store/Actions/RemoveFromFavorite';
import { useEffect, useState } from 'react';
import { addToCart } from '../Store/Actions/AddToCart'
import { removeFromCart } from '../Store/Actions/RemoveFromCart'
function ProductCard({ product }) {
    const { id } = product || {};
    const dispatch = useDispatch();
    const wishlists = useSelector((state) => state.wish.wishlist);
    const [isWishlist,setIsWishlist]=useState()
    const favorites = useSelector((state) => state.favor.favorites);
    const [isFavorite, setIsFavorite] = useState();
    const [isCart, setIsCart] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      setIsWishlist(wishlists.some((wishlist) => wishlist.id ===id));
  }, [wishlists, id]);

    const addToWishlistHandler = () => {
      dispatch(addToWishlist(product));
      setIsWishlist(true);
  };
  
  const removeFromWishlistHandler = () => {
      dispatch(removeFromWishlist(id));
      setIsWishlist(false);
  };
 
  const toggleWishlist = () => {
      if (isWishlist) {
        removeFromWishlistHandler();
      } else {
        addToWishlistHandler();
      }
  };
  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.id === id));
    console.log('Product:', product);
}, [favorites, id]);

const addToFavoritesHandler = () => {
    dispatch(addToFavorites(product));
    setIsFavorite(true);
};

const removeFromFavoritesHandler = () => {
    dispatch(removeFromFavorites(id));
    setIsFavorite(false);
};

const toggleFavorite = () => {
    if (isFavorite) {
        removeFromFavoritesHandler();
    } else {
        addToFavoritesHandler();
    }
};
const addToCartHandler = () => {
  if (isLoggedIn) {
    dispatch(addToCart(product));
    setIsCart(true);
} else {
    setShowAlert(true)
}
};
const removeFromCartHandler = () => {
  dispatch(removeFromCart(id));
  setIsCart(false);
};
const toggleCart = () => {
  if (isCart) {
      removeFromCartHandler();
  } else {
      addToCartHandler();
  }
};
  return (
    <>
         {showAlert && (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <i class="bi bi-exclamation-square-fill"></i> You must be logged in to add items to the cart.
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
      </div>
  )}
    <div className="card" style={{ height: '38rem' }}>
      {product.thumbnail && <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: '20rem' }} />}
      <div className="card-body">
        <h5 className="card-title text-center">{product.title}</h5>
        <div className="d-flex justify-content-between">
        <p className="card-text"><b>Price:</b> ${product.price}</p>
        {isFavorite ? (
                            <i className="bi bi-heart-fill text-danger" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={toggleFavorite}></i>  
                        ) : (
                          <i className="bi bi-heart text-danger" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={toggleFavorite}></i>  
                        )}
        </div>
        {isCart ? (
                     <i className="bi bi-cart-check-fill" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={toggleCart}></i> 
                 )  : (
                      <i className="bi bi-cart" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={toggleCart}></i>
                 )}
       
        <div style={{ marginTop: 'auto' }}>
        <Link to={`/product/${product.id}`} className="btn btn-primary d-flex justify-content-center">View Details</Link>
        </div>
        <br/>
        <button onClick={toggleWishlist} className='btn btn-warning d-flex justify-content-center w-100'>
          {isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
   </>
  );
}

export default ProductCard;