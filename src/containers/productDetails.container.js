import {connect} from 'react-redux';
// import {updateUserProfile} from './../actions/auth.actions';
import ProductDetail from '../pages/Login/Product/ProductDetail';
import {addProductToCart, fetchReviews} from './../actions/products.actions';

const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct,
    cartItems: state.products.cartItems,
    reviewsList:state.products.reviewsList
})

const mapDispatchToProps = {
    addProductToCart,
    fetchReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);