import React from 'react';
import {Text, View} from 'react-native';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {pageContainerStyle} from '../../../values/Styles/MowStyles';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {MowInput} from '../../../components/ui/Common/Input/MowInput';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import {validationConfig} from '../../NotLogin/Register/validations';
import {
  _successDialog,
  _warningDialog,
} from '../../../components/ui/Common/Dialog/MowDialogFunctions';
import Axios from 'axios';
import {API_BASE_URL} from '../../../constants/config';

export default class Password extends React.Component {
  state = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
    error:"",
    formErrors:{}
  };

  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  validateAllFields = () => {
    const {oldpassword, newpassword, confirmpassword} = this.state;
    const formValues = {
      oldpassword,
      newpassword,
      confirmpassword,
    };
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

  updatedPassword = () => {
    const {oldpassword, newpassword, confirmpassword} = this.state;
    const url = `${API_BASE_URL}/customers/update/password`;
    const bodyParams = {
      oldpassword,
      newpassword,
      confirmpassword,
    };
    if (!this.validateAllFields()) return;
    Axios.put(url, bodyParams)
      .then(res => {
        _successDialog('Success', 'Password successfully updated');
      })
      .catch(err => {
        _warningDialog('Failed', 'Please matched password');
      });
  };

  render() {
      const {formErrors} = this.state;
      console.log("formerrors===========>", formErrors)
    return (
      <MowContainer title={mowStrings.passwordPage.title}>
        <View style={pageContainerStyle}>
          <View style={inputStyle.container}>
            {/* currentPassword title regular */}
            <Text
              style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>
              {mowStrings.placeholder.currentPassword}
            </Text>

            {/* currentPassword input */}
            <MowInput
              leftIcon={'lock'}
              type={'text'}
              passwordInput={true}
              containerStyle={{
                backgroundColor: mowColors.viewBGColor,
                width: '100%',
              }}
              textInputStyle={{color: mowColors.textColor}}
              value={this.state.oldpassword}
              onChangeText={value => this.onChangeText('oldpassword', value)}
            />
            <Text style={{color: 'red', fontSize: 12}}>
              {formErrors && formErrors.oldpassword}
            </Text>
          </View>

          <View style={inputStyle.container}>
            {/* newPassword title regular */}
            <Text
              style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>
              {mowStrings.placeholder.newPassword}
            </Text>

            {/* newPassword input */}
            <MowInput
              passwordInput={true}
              leftIcon={'lock'}
              type={'text'}
              containerStyle={{
                backgroundColor: mowColors.viewBGColor,
                width: '100%',
              }}
              textInputStyle={{color: mowColors.textColor}}
              value={this.state.newpassword}
              onChangeText={value => this.onChangeText('newpassword', value)}
            />
             <Text style={{color: 'red', fontSize: 12}}>
              {formErrors && formErrors.newpassword}
            </Text>
          </View>

          <View style={inputStyle.container}>
            {/* newPassword2 title regular */}
            <Text
              style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>
              {mowStrings.placeholder.newPassword2}
            </Text>

            {/* newPassword2 input */}
            <MowInput
              passwordInput={true}
              leftIcon={'lock'}
              type={'text'}
              containerStyle={{
                backgroundColor: mowColors.viewBGColor,
                width: '100%',
              }}
              textInputStyle={{color: mowColors.textColor}}
              value={this.state.confirmpassword}
              onChangeText={value =>
                this.onChangeText('confirmpassword', value)
              }
            />
               <Text style={{color: 'red', fontSize: 12}}>
              {formErrors && formErrors.confirmpassword}
            </Text>
          </View>
        </View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <MowButtonBasic
            onPress={this.updatedPassword}
            type={'success'}>
            {mowStrings.button.update}
          </MowButtonBasic>
        </View>
      </MowContainer>
    );
  }
}

const inputStyle = {
  container: {
    marginVertical: 5,
  },
  titleText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
  },
};
