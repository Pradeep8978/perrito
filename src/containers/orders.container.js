import {connect} from 'react-redux';
import {fetchOrders} from './../actions/orders.actions';
import OrdersInfo from '../pages/Login/Orders/OrderList';

const mapStateToProps = state => ({
    orderList: state.orders.orderList,
    cartItems: state.products.cartItems
})

const mapDispatchToProps = {
    fetchOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersInfo);