import {connect} from 'react-redux';
import Register from './../pages/NotLogin/Register/NormalRegister';
import {signupUser} from './../actions/auth.actions';

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
})

const mapDispatchToProps = {
    signupUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
