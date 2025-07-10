import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, Heart, Share2, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import './CartSidebar.css';

const CartSidebar: React.FC = () => {
  const { state, actions, toggleCart } = useApp();
  const { cart, isCartOpen } = state;

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      actions.removeFromCart(itemId);
    } else {
      actions.updateCartQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      actions.clearCart();
    }
  };

  const handleExportCart = () => {
    const cartData = {
      items: cart.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: cart.total,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(cartData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cart-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareCart = async () => {
    const shareText = `Check out my shopping cart! Total: ${formatCurrency(cart.finalTotal)} with ${cart.totalItems} items`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Shopping Cart',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Cart details copied to clipboard!');
      });
    }
  };

  // Calculate shipping (free over $100)
  const shippingCost = cart.total > 100 ? 0 : 9.99;
  const tax = cart.total * 0.08; // 8% tax
  const finalTotal = cart.total + shippingCost + tax;

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div className="cart-backdrop" onClick={toggleCart}></div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'cart-sidebar--open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart size={20} />
            <h3>Shopping Cart</h3>
            <span className="cart-count">({cart.totalItems})</span>
          </div>
          <button className="cart-close-btn" onClick={toggleCart}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {cart.items.length === 0 ? (
            /* Empty Cart */
            <div className="cart-empty">
              <ShoppingCart size={48} />
              <h4>Your cart is empty</h4>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.product.thumbnail} alt={item.product.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      <p className="cart-item-brand">{item.product.brand}</p>
                      <div className="cart-item-price">
                        {formatCurrency(item.product.price)}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Item Actions */}
                    <div className="cart-item-actions">
                      <button
                        className="cart-item-action wishlist-action"
                        onClick={() => actions.addToWishlist(item.product)}
                        title="Move to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        className="cart-item-action remove-action"
                        onClick={() => actions.removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
                
                <div className="cart-summary-row">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                <div className="cart-summary-row cart-total">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
                
                {cart.total < 100 && (
                  <div className="shipping-notice">
                    Add {formatCurrency(100 - cart.total)} more for free shipping!
                  </div>
                )}
              </div>

              {/* Cart Actions */}
              <div className="cart-actions">
                <div className="cart-action-buttons">
                  <button className="cart-btn secondary" onClick={handleClearCart}>
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                  <button className="cart-btn secondary" onClick={handleShareCart}>
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="cart-btn secondary" onClick={handleExportCart}>
                    <Download size={16} />
                    Export
                  </button>
                </div>
                
                <button className="cart-btn primary checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
