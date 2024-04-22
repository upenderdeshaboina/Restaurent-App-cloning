import {HiOutlineShoppingCart} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {cartItems} = props
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="header">
      <h1 className="header-name">UNI Resto Cafe</h1>
      <div className="my-orders-section">
        <p className="my-orders">My Orders</p>
        <div className="cart-icon">
          <HiOutlineShoppingCart size={45} className="cart" />
          <span className="badge">{totalItems}</span>
        </div>
      </div>
    </nav>
  )
}

export default Header
