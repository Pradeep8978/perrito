import {connect} from 'react-redux';
import {fetchOrders} from './../actions/orders.actions';
import PatmentInfo from '../pages/Login/CartOperations/PaymentInformation';

const mapStateToProps = state => ({
    cartItems: state.products.cartItems,
    deliveryAddress: state.orders.deliveryAddress
})

const mapDispatchToProps = {
    fetchOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(PatmentInfo);