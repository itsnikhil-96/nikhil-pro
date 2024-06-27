import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import "./Cart.css";
import { MdDelete } from "react-icons/md";

function Cart() {
  let { currentUser } = useContext(userLoginContext);
  let [cartItems, setCartItems] = useState([]);

  async function getProductsOfUserCart() {
    let res = await fetch(
      `http://localhost:3000/user-cart?username=${currentUser.username}`
    );
    console.log(res);
    let cartItemsList = await res.json();
    setCartItems(cartItemsList);
  }

  async function handleDeleteCartItem(id) {
    // Update frontend state (optimistically)
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  
    // Update backend (send delete request)
    await fetch(`http://localhost:3000/user-cart/${id}`, {
      method: 'DELETE'
    });
  }
  
  useEffect(() => {
    getProductsOfUserCart();
  }, []);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="display-1 text-center text-danger">Cart is empty</p>
      ) : (
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
  {cartItems.map((cartItem) => (
    <tr key={cartItem.id}>
      <td>{cartItem.id}</td>
      <td>{cartItem.title}</td>
      <td>{cartItem.price}</td>
      <td>{cartItem.brand}</td>
      <td><MdDelete onClick={() => handleDeleteCartItem(cartItem.id)} /></td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}

export default Cart;
