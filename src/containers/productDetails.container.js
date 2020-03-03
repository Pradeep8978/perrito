import {connect} from 'react-redux';
// import {updateUserProfile} from './../actions/auth.actions';
import ProductDetail from '../pages/Login/Product/ProductDetail';

const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct
})

const mapDispatchToProps = {
    // updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);