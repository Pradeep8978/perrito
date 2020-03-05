import {connect} from 'react-redux';
import {updateUserProfile} from './../actions/auth.actions';
import Profile from '../pages/Login/User/Profile';

const mapStateToProps = state => ({
    profile: state.auth.profile
})

const mapDispatchToProps = {
    updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);