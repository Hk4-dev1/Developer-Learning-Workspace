// Simple Cart Sidebar that uses SimpleCart
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useSimpleCartContext } from '../context/SimpleCartContext';
import { formatCurrency } from '../utils/helpers';
import './CartSidebar/CartSidebar.css';

const SimpleCartSidebar: React.FC = () => {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
  } = useSimpleCartContext();

  if (!isCartOpen) return null;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  return (
    <div className="cart-sidebar-overlay" onClick={toggleCart}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <h2>
            <ShoppingBag size={24} />
            Shopping Cart ({cart.totalItems})
          </h2>
          <button className="close-btn" onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {cart.items.map((item: any) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.product.thumbnail} alt={item.product.name} />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.product.name}</h4>
                      <p className="item-brand">{item.product.brand}</p>
                      {item.selectedSize && (
                        <span className="item-option">Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className="item-option">Color: {item.selectedColor}</span>
                      )}
                      <div className="item-price">{formatCurrency(item.product.price)}</div>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleCartSidebar;
