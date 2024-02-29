export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';


export const removeFromWishlist = productId => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: productId ,
  });