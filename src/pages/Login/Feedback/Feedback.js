import React from 'react';
import {Text, View} from 'react-native';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {fontFamily, pageContainerStyle} from '../../../values/Styles/MowStyles';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MowInput} from '../../../components/ui/Common/Input/MowInput';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import Axios from 'axios';
import {
  _successDialog,
  _warningDialog,
} from '../../../components/ui/Common/Dialog/MowDialogFunctions';
import {_showToast} from '../../../components/ui/Common/Toast/MowToast';
import {API_BASE_URL} from '../../../constants/config';
import {validationConfig} from '../../NotLogin/Register/validations';

export default class Feedback extends React.Component {
  state = {
    formValues: {
      title: '',
      message: '',
    },
    error: '',
    formErrors: {},
  };

  onChangeText = (key, value) => {
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [key]: value,
      },
    }));
  };

  validateAllFields = () => {
    const {formValues} = this.state;
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

  handleSubmit = () => {
    const {formValues} = this.state;
    const url = `${API_BASE_URL}/feedback/create`;
    if (!this.validateAllFields()) return;
    Axios.post(url, formValues)
      .then(res => {
        _successDialog('Success', 'Thank you for your feedback...');
      })
      .catch(err => {
        _warningDialog('Failed', 'We are sorry! Unable to sumbit feedback...');
      });
  };

  render() {
    const {formErrors} = this.state;
    return (
      <MowContainer title={mowStrings.feedback.title}>
        <View style={pageContainerStyle}>
          {/* user information input view */}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp('2%')}}>
            <View style={inputStyle.container}>
              {/* fullName title regular */}
              <Text
                style={[
                  inputStyle.titleText,
                  {color: mowColors.titleTextColor},
                ]}>
                {mowStrings.placeholder.feedbackTitle}
              </Text>

              {/* title input */}
              <MowInput
                leftIcon={'message-square'}
                type={'text'}
                containerStyle={{
                  width: '100%',
                  backgroundColor: mowColors.viewBGColor,
                }}
                textInputStyle={{color: mowColors.textColor}}
                placeholder={mowStrings.placeholder.feedbackTitle}
                // value={this.state.title}
                onChangeText={value => this.onChangeText('title', value)}
              />
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.title}
              </Text>
            </View>

            <View style={inputStyle.container}>
              {/* message title */}
              <Text style={inputStyle.titleText}>
                {mowStrings.placeholder.feedbackComment}
              </Text>

              {/* message input */}
              <MowInput
                type={'textarea'}
                containerStyle={{
                  width: '100%',
                  height: hp('15%'),
                  backgroundColor: mowColors.viewBGColor,
                }}
                textInputStyle={{
                  fontSize: hp('1.8%'),
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  fontFamily: fontFamily.regular,
                  textAlign: 'left',
                  color: mowColors.textColor,
                  width: '100%',
                  paddingBottom: 10,
                }}
                placeholder={mowStrings.placeholder.feedbackComment}
                // value={this.state.message}
                onChangeText={value => this.onChangeText('message', value)}
              />
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.message}
              </Text>
            </View>
          </KeyboardAwareScrollView>

          <MowButtonBasic onPress={this.handleSubmit} type={'success'}>
            {mowStrings.button.send}
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
    fontFamily: fontFamily.medium,
  },
};
