import {connect} from 'react-redux';
import {fetchOrders} from './../actions/orders.actions';
import Orders from '../pages/Login/Product/ProductList';

const mapStateToProps = state => ({
    cartItems: state.products.cartItems
})

const mapDispatchToProps = {
    fetchOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);