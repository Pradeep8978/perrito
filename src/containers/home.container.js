import {connect} from 'react-redux';
import HomeScreen from '../pages/Login/HomeScreen';
import {fetchUserProfile} from './../actions/auth.actions';
import {fetchProducts, preserveProductDetails} from './../actions/products.actions';

const mapStateToProps = state => ({
    loading:state.products.loading
})

const mapDispatchToProps = {
    fetchUserProfile,
    fetchProducts,
    preserveProductDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);