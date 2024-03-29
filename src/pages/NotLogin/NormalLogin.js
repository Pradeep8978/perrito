import React from 'react';
import {Text, View} from 'react-native';
import MowContainer from '../../components/ui/Core/Container/MowContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {pageContainerStyle} from '../../values/Styles/MowStyles';
import MowForwardBack from '../../components/ui/Core/Navbar/MowForwardBack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MowButtonBasic} from '../../components/ui/Common/Button/MowButton';
import {mowColors} from '../../values/Colors/MowColors';
import {mowStrings} from '../../values/Strings/MowStrings';
import {MowInput} from '../../components/ui/Common/Input/MowInput';
import {User} from '../../components/utils/User/User';
import {setLogin} from '../Router';
import {validationConfig} from './Register/validations';
import {createNativeWrapper} from 'react-native-gesture-handler';

let iconColor = 'white';

export default class NormalLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: {
        emialError: '',
        passwordError: '',
      },
    };
  }

  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  validateAllFields = () => {
    const {email, password} = this.state;
    let formValues = {email, password};
    const formErrors = {};
    let isValid = true;
    Object.keys(formValues).forEach(key => {
      const validaionFunc = validationConfig[key];
      const errormessage = validaionFunc ? validaionFunc(formValues[key]) : '';
      formErrors[key] = errormessage;
      if (errormessage) isValid = false;
    });
    this.setState({formErrors});
    return isValid;
  };

  _handleLogin() {
    const {email, password, formErrors} = this.state;
    if (!this.validateAllFields()) return;
    const bodyParams = {
      email,
      password,
      role: 'customer',
    };
    this.props.loginUser(bodyParams).then(res => {
      console.log('RESPOSNE =>', res.data);
      // to update user login situation
      new User().setLogin(true);
      console.log('response =>', res);
      new User().setToken(res.data.token);
      // to change router
      setLogin(true);
    });
    // to update user login situation
    // new User().setLogin(true);
    // to change router
    // setLogin(true);
  }
  loginError = () => {
    return (
      <View>
        <Text style={{color: 'red', textAlign: 'center'}}>
          Invalid Username or Password
        </Text>
      </View>
    );
  };

  // componentDidMount

  render() {
    let {formErrors} = this.state;
    return (
      <MowContainer
        footer={false}
        hideStatusBar={true}
        navbar={false}
        style={{backgroundColor: mowColors.mainColor}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={pageContainerStyle}>
          {/* top navigation button area */}
          <MowForwardBack
            leftOnPress={() => this.props.navigation.goBack()}
            left={true}
          />

          <View style={{...pageContainerStyle, marginTop: hp('3%')}}>
            <Text
              style={{
                fontSize: hp(3),
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'center',
                color: '#ffffff',
                marginBottom: hp(5),
                fontFamily: 'Poppins-Bold',
              }}>
              {mowStrings.login}
            </Text>
            {this.props.error && this.loginError()}

            {/* username view */}
            <View style={inputStyle.container}>
              <Text style={inputStyle.titleText}>
                {mowStrings.loginPage.username}
              </Text>

              <MowInput
                iconColor={iconColor}
                rightIcon={'check'}
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                onChangeText={value => this.onChangeText('email', value)}
              />
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.email}
              </Text>
            </View>

            {/* password view */}
            <View style={inputStyle.container}>
              {/* title regular */}
              <Text style={inputStyle.titleText}>
                {mowStrings.loginPage.password}
              </Text>

              <MowInput
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                onChangeText={value => this.onChangeText('password', value)}
                passwordInput={true}
                iconColor={iconColor}
                rightIcon={'eye'}
              />
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.password}
              </Text>
            </View>

            <MowButtonBasic
              onPress={() => {
                this._handleLogin();
              }}
              loading={this.props.loading}
              style={{marginTop: hp('3%')}}
              btnStyle={{
                borderRadius: 50,
                shadowColor: '#30C1DD',
                shadowRadius: 20,
                shadowOpacity: 0.9,
                elevation: 10,
                shadowOffset: {
                  width: 20,
                  height: 20
                }
              }}
              containerStyle={{marginTop: hp('5%')}}
              textStyle={{
                color: mowColors.mainColor,
                fontWeight: 'normal',
                letterSpacing: 0,
              }}
              type={'default'}>
              {mowStrings.login}
            </MowButtonBasic>

            {/* forgot password view */}
            <View style={{marginTop: hp(3)}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: hp(1.8),
                  textAlign: 'center',
                }}>
                {mowStrings.loginPage.cantAccessAccount}
              </Text>

              {/* forgot password button */}
              <MowButtonBasic
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}
                containerStyle={{borderWidth: 0, borderRadius: 50}}
                filled={false}
                type={'default'}>
                {mowStrings.loginPage.forgotPassword}
              </MowButtonBasic>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </MowContainer>
    );
  }
}

export const inputStyle = {
  container: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: hp('2%'),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff',
    opacity: 0.8,
    fontFamily: 'Poppins-Light',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    orderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    width: '100%',
  },
  inputText: {
    fontSize: hp('2%'),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff',
    width: '85%',
    fontFamily: 'Poppins-Light',
  },
};
