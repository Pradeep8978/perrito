import {connect} from 'react-redux';
import {preserveProductDetails, addProductToCart} from './../actions/products.actions';
import ProductList from '../pages/Login/Product/ProductList';

const mapStateToProps = state => ({
    productList: state.products.productList,
    cartItems: state.products.cartItems,
    loading: state.products.loading,
    error: state.products.error
})

const mapDispatchToProps = {
    preserveProductDetails,
    addProductToCart
    // updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);