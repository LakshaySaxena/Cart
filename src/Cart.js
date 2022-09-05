import React from 'react';
import CartItem from './CartItem';

const Cart=(props)=> {
 

    const { Products } =props;
    return (
      <div className="cart">
        {Products.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
              onIncreaseQuantity={props.onIncreaseQuantity}
              onDecreaseQuantity={props.onDecreaseQuantity}
              onDeleteProduct={props.onDeleteProduct}
            />
          )
        })}
      </div>
    );
  
}

export default Cart;