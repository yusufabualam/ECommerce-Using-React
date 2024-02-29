export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';

export const addToWishlist = product => ({
    type: 'ADD_TO_WISHLIST',
    payload: product,
  });
