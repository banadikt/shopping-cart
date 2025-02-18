import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/products')
        .then((response) => {
      return response.json();
    })
        .then((data) => { setCart(data); });
  }, [])

  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ))
  }

  const calculateTotal = async () => {
    const response = await
        fetch('http://localhost:3001/calculate-total', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart })
        })
    const data = await response.json()
    setTotal(data.total)
  }

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <div className="item-info">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-price">${item.price}</span>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                </div>
            ))}
            <button onClick={calculateTotal}>Calculate Total</button>
            <h2>Total: ${total}</h2>
        </div>
    )
}

export default App;
