import {Component} from 'react'
import Loader from 'react-loader-spinner'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    dataFromApi: [],
    activeCateId: '',
    cartItems: [],
  }

  componentDidMount() {
    this.getData()
  }

  addingToCart = dish => {
    const {cartItems} = this.state
    const isExists = cartItems.find(e => e.dishId === dish.dishId)
    if (!isExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prev => ({
        cartItems: prev.cartItems.map(e =>
          e.dishId === dish.dishId ? {...e, quantity: e.quantity + 1} : e,
        ),
      }))
    }
  }

  removingFromCart = dish => {
    const {cartItems} = this.state
    const isExists = cartItems.find(e => e.dishId === dish.dishId)
    if (isExists && isExists.quantity > 1) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(e =>
          e.dishId === dish.dishId ? {...e, quantity: e.quantity - 1} : e,
        ),
      }))
    } else if (isExists && isExists.quantity === 1) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.filter(e => e.dishId !== dish.dishId),
      }))
    }
  }

  getData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const jsonData = data[0].table_menu_list.map(e => ({
        menuCategory: e.menu_category,
        menuCategoryId: e.menu_category_id,
        menuCategoryImg: e.menu_category_image,
        categoryDishes: e.category_dishes.map(eDish => ({
          dishId: eDish.dish_id,
          dishName: eDish.dish_name,
          dishPrice: eDish.dish_price,
          dishImg: eDish.dish_image,
          dishCurrency: eDish.dish_currency,
          dishCalories: eDish.dish_calories,
          dishDescription: eDish.dish_description,
          dishAvailability: eDish.dish_Availability,
          dishType: eDish.dish_Type,
          addonCat: eDish.addonCat.map(f => ({
            addonCategory: f.addon_category,
            addonCategoryId: f.addon_category_id,
            addonSelection: f.addon_selection,
            nxtUrl: f.nexturl,
          })),
        })),
      }))
      this.setState({
        dataFromApi: jsonData,
        activeCateId: jsonData[0].menuCategoryId,
        isLoading: false,
      })
    } catch (error) {
      console.error('Error:- ', error)
    }
  }

  updatingActiveCatId = menuCategoryId => {
    this.setState({activeCateId: menuCategoryId})
  }

  renderTabs = () => {
    const {dataFromApi, activeCateId} = this.state
    return dataFromApi.map(e => (
      <li
        key={e.menuCategoryId}
        className={`tab ${
          e.menuCategoryId === activeCateId ? 'active-tab' : ''
        }`}
        onClick={() => this.updatingActiveCatId(e.menuCategoryId)}
      >
        <button
          type="button"
          className={`tab-btn ${
            e.menuCategoryId === activeCateId ? 'active-tab-btn' : ''
          }`}
        >
          {e.menuCategory}
        </button>
      </li>
    ))
  }

  renderDishes = () => {
    const {dataFromApi, activeCateId, cartItems} = this.state
    const {categoryDishes} = dataFromApi.find(
      e => e.menuCategoryId === activeCateId,
    )
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(e => (
          <DishItem
            key={e.dishId}
            dishDetails={e}
            cartItems={cartItems}
            addingToCart={this.addingToCart}
            removingFromCart={this.removingFromCart}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader">
      <Loader />
    </div>
  )

  render() {
    const {isLoading, cartItems} = this.state
    console.log(cartItems)
    return (
      <>
        <Header cartItems={cartItems} />
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <div className="main-container">
            <ul className="tab-list-container">{this.renderTabs()}</ul>
            {this.renderDishes()}
          </div>
        )}
      </>
    )
  }
}
export default Home
