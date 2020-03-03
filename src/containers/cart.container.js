import {connect} from 'react-redux';
import {incrementCartItem, decrementCartItem, removeCartItem, emptyCart} from '../actions/products.actions';
import Cart from '../pages/Login/CartOperations/Cart';

const mapStateToProps = state => ({
    cartItems: state.products.cartItems
})

const mapDispatchToProps = {
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
    emptyCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)