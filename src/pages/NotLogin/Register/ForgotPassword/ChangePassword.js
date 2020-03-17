import React from 'react';
import {Text, View} from 'react-native';
import MowForwardBack from '../../../../components/ui/Core/Navbar/MowForwardBack';
import {pageContainerStyle} from '../../../../values/Styles/MowStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {mowColors} from '../../../../values/Colors/MowColors';
import MowContainer from '../../../../components/ui/Core/Container/MowContainer';
import {mowStrings} from '../../../../values/Strings/MowStrings';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MowInput} from '../../../../components/ui/Common/Input/MowInput';
import {MowButtonBasic} from '../../../../components/ui/Common/Button/MowButton';
import {User} from '../../../../components/utils/User/User';
import {setLogin} from '../../../Router';
import {
  _successDialog,
  _warningDialog,
} from '../../../../components/ui/Common/Dialog/MowDialogFunctions';
import Axios from 'axios';
import {API_BASE_URL} from '../../../../constants/config';

let iconColor = 'white';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newpassword: '',
      confirmpassword: '',
    };
  }


  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  ChangePassword = () => {
    const {newpassword, confirmpassword} = this.state;
    const url = `${API_BASE_URL}/customers/update/newpassword`;
    // if (!this.validateAllFields()) return;
    const bodyParams = {
      email:this.props.route.params.email,
      newpassword,
      confirmpassword,
    };
    Axios.put(url, bodyParams)
      .then(res => {
        new User().setLogin(true);
        console.log('response =>', res.data);
        new User().setToken(res.data);
        // to change router
        // setLogin(true);
        this.props.navigation.navigate("NormalLogin")
        _successDialog('Success', 'Password successfully updated');
      })
      .catch(err => {
        _warningDialog('Failed', 'Please matched password');
      });
  };

  render() {
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
              }}>
              {mowStrings.changePasswordScreen.title}
            </Text>

            {/* info text */}
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: hp(1.8),
                marginBottom: hp(3),
              }}>
              {mowStrings.changePasswordScreen.infoMessage}
            </Text>

            {/* password view */}
            <View style={{...pageContainerStyle, marginVertical: 10}}>
              {/* password view */}
              <View style={inputStyle.container}>
                {/* password title text */}
                <Text style={inputStyle.titleText}>
                  {mowStrings.placeholder.password}
                </Text>

                {/* password input */}
                <MowInput
                  containerStyle={inputStyle.inputContainer}
                  textInputStyle={inputStyle.inputText}
                  onChangeText={value => this.onChangeText('newpassword', value)}
                  passwordInput={true}
                  iconColor={iconColor}
                  rightIcon={'eye'}
                />
              </View>

              {/* repeat password view */}
              <View style={inputStyle.container}>
                {/* repeat password title text */}
                <Text style={inputStyle.titleText}>
                  {mowStrings.placeholder.passwordRepeat}
                </Text>

                {/* repeat password input */}
                <MowInput
                  containerStyle={inputStyle.inputContainer}
                  textInputStyle={inputStyle.inputText}
                  onChangeText={value =>
                    this.onChangeText('confirmpassword', value)
                  }
                  passwordInput={true}
                  iconColor={iconColor}
                  rightIcon={'eye'}
                />
              </View>
            </View>

            <MowButtonBasic
              onPress={() => this.ChangePassword()}
              style={{marginTop: hp('3%')}}
              containerStyle={{marginTop: hp('5%')}}
              textStyle={{
                color: mowColors.mainColor,
                fontWeight: 'normal',
                letterSpacing: 0,
              }}
              type={'default'}>
              {mowStrings.button.updatePassword}
            </MowButtonBasic>
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
    fontSize: hp('2.2%'),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff',
    width: '85%',
  },
};
