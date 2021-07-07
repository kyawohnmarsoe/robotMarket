import React, { useState, useEffect } from 'react';
import RobotList from './components/RobotList';
import axios from 'axios';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (item) => {
    if (item.stock > 0) {
      const exist = cartItems.find((x) => x.name === item.name);
      if (exist) {
        setCartItems(cartItems.map((x) =>
          x.name === item.name ? { ...exist, qty: exist.qty + 1, stock: exist.stock - 1 } : x)
        );
        setRobots(robots.map((x) => x.name === item.name ? { ...x, stock: x.stock - 1 } : x));
      } else {
        if (cartItems.length < 5) {
          setCartItems([...cartItems, { ...item, qty: 1, stock: item.stock - 1 }]);
          setRobots(robots.map((x) => x.name === item.name ? { ...x, stock: x.stock - 1 } : x));

        } else { alert('Can not add more than 5 types') }
      }
    } else {
      alert('out of stock')
    }

  };

  const onRemove = (item) => {
    const exist = cartItems.find((x) => x.name === item.name);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.name !== item.name));
      setRobots(robots.map((x) => x.name === item.name ? { ...x, stock: x.stock + 1 } : x));
    } else {
      setCartItems(cartItems.map((x) => x.name === item.name ? { ...exist, qty: exist.qty - 1, stock: exist.stock - 1 } : x));
      setRobots(robots.map((x) => x.name === item.name ? { ...x, stock: x.stock + 1 } : x));
    }
  };

  // Get Robot Data From API
  useEffect(async () => {
    const response = await axios.get('http://localhost:8000/api/robots')
      .then(response => {
        setLoading(false);
        setRobots(response.data.data);
        setError('');
      })
      .catch(error => {
        setLoading(false);
        setRobots([]);
        setError(error.message);
      })
  }, [])

  return (
    <div>
      <Nav cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {robots && <RobotList robots={robots} onAdd={onAdd} />}
      <Footer />
    </div>
  );
}

export default App;
