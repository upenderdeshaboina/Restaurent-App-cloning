import './index.css'

const DishItem = props => {
  const {dishDetails, cartItems, addingToCart, removingFromCart} = props
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImg,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const addingQuantity = () => addingToCart(dishDetails)
  const removingQuantity = () => removingFromCart(dishDetails)

  const gettingQuantity = () => {
    const item = cartItems.find(e => e.dishId === dishId)
    return item ? item.quantity : 0
  }

  const renderingBtns = () => (
    <div className="btn-container">
      <button
        className="btn"
        type="button"
        onClick={removingQuantity}
        data-testid="decrement"
      >
        -
      </button>
      <p className="quantity">{gettingQuantity()}</p>
      <button
        className="btn"
        type="button"
        onClick={addingQuantity}
        data-testid="increment"
      >
        +
      </button>
    </div>
  )

  return (
    <li className="card-container">
      <div className={`${dishType === 1 ? 'red-border' : 'green-border'}`}>
        <div className={`${dishType === 1 ? 'red-round' : 'green-round'}`} />
      </div>
      <div className="details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="description">{dishDescription}</p>
        {dishAvailability && renderingBtns()}
        {!dishAvailability && (
          <p className="not-available-para">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="addons-available-para">Customizations available</p>
        )}
      </div>
      <p className="calories-para">{dishCalories} calories</p>
      <img src={dishImg} alt={dishName} className="dish-img" />
    </li>
  )
}
export default DishItem
