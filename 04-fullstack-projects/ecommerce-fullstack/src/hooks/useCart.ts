// hooks/useCart.ts - Custom hook for cart operations

import { useApp } from '../context/AppContext';
import { Product } from '../types/Product';

export const useCart = () => {
  const { state, actions } = useApp();

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    actions.addToCart(product, quantity, selectedSize, selectedColor);
    
    // Track analytics event
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics: Product added to cart', {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    actions.removeFromCart(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      actions.updateCartQuantity(itemId, quantity);
    }
  };

  const clearCart = () => {
    actions.clearCart();
  };

  const getCartItem = (productId: string) => {
    return state.cart.items.find(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = getCartItem(productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: string): boolean => {
    return state.cart.items.some(item => item.product.id === productId);
  };

  const getSubtotal = (): number => {
    return state.cart.total;
  };

  const getTotalItems = (): number => {
    return state.cart.totalItems;
  };

  const getFinalTotal = (): number => {
    return state.cart.finalTotal;
  };

  const applyDiscount = (discountAmount: number) => {
    actions.applyDiscount(discountAmount);
  };

  const updateShipping = (shippingCost: number) => {
    actions.updateShipping(shippingCost);
  };

  return {
    // State
    cart: state.cart,
    items: state.cart.items,
    totalItems: state.cart.totalItems,
    total: state.cart.total,
    finalTotal: state.cart.finalTotal,
    discount: state.cart.discount,
    shipping: state.cart.shipping,
    tax: state.cart.tax,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    updateShipping,

    // Utility functions
    getCartItem,
    getCartItemQuantity,
    isInCart,
    getSubtotal,
    getTotalItems,
    getFinalTotal
  };
};
