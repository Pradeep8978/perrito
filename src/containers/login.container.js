import {connect} from 'react-redux';
import Login from './../pages/NotLogin/NormalLogin';
import {loginUser} from './../actions/auth.actions';

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
})

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
