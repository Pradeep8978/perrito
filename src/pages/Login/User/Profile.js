import React from 'react';
import {View, Image, Text} from 'react-native';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {
  borderStyle,
  fontFamily,
  pageContainerStyle,
} from '../../../values/Styles/MowStyles';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {MowInput} from '../../../components/ui/Common/Input/MowInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MowPicker} from '../../../components/ui/Common/Picker/MowPicker';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import Gender from '../../../sampleData/Gender';
import {API_BASE_URL} from '../../../constants/config';
import {validationConfig} from '../../NotLogin/Register/validations';
import {
    _successDialog,
    _warningDialog,
  } from '../../../components/ui/Common/Dialog/MowDialogFunctions';

import Language from '../../../sampleData/Language';

export default class Profile extends React.Component {
  /**
   *  these style values are here because of the color change.
   *  when changed the color, styles that are outside the class, are not re-rendered!
   */

  inputStyle = {
    container: {
      marginVertical: 5,
    },
    titleText: {
      fontSize: hp('1.8%'),
      fontWeight: '600',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      color: mowColors.titleTextColor,
      fontFamily: fontFamily.medium,
    },
    inputContainer: {
      width: '100%',
      backgroundColor: mowColors.viewBGColor,
    },
    inputText: {
      fontSize: hp('1.8%'),
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
      fontFamily: fontFamily.regular,
      textAlign: 'left',
      color: mowColors.textColor,
    },
  };

  pickerStyle = {
    container: {
      marginVertical: 5,
    },
    button: {
      ...borderStyle,
      backgroundColor: mowColors.viewBGColor,
    },
    buttonText: {
      width: '63%',
      fontSize: hp('1.8%'),
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      fontFamily: fontFamily.regular,
      color: mowColors.textColor,
    },
    buttonIcon: {
      color: mowColors.mainColor,
    },
  };

  state = {
    fullName: 'Bianca Watkins',
    username: 'bianca.watkins',
    email: 'biancawatkins@gmail.com',
    birthday: '1998-08-21',
    phone: 'XXX XXX XX XX',
    genderPicker: false,
    languagePicker: false,
    pickerData: [],
    pickerType: 0,
    pickerVisible: false,
    gender: 'Female',
    language: 'English',
    formValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
    },
  };

  componentDidMount() {
    const {profile} = this.props;
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        name: profile.name,
        phone: profile.phone,
        dob: profile.dob,
        gender: profile.gender,
        email: profile.email,
      },
      error: '',
      formErrors: {},
    }));
  }

  // to store entered regular from user
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

  /**
   *      type -->
   *              1: gender
   *              2: language
   * */
  _onSelect(selectedItem) {
    this.setState({pickerVisible: false});

    let type = this.state.pickerType;
    const {formValues} = this.state;
    if (type === 1) {
      formValues.gender = selectedItem['title'];
      this.setState({formValues, pickerSelectedId: selectedItem['id']});
    } else if (type === 2) {
      this.setState({
        language: selectedItem['title'],
        pickerSelectedId: selectedItem['id'],
      });
    }
  }
  onSaveProfile = () => {
    const {formValues} = this.state;
    console.log('formvalues========>saverpofile', formValues);
    // const url = `${API_BASE_URL}/customers/profile/update`;
    // if (!this.validateAllFields()) return;
    if (!this.validateAllFields()) return;
    this.props
      .updateUserProfile(formValues)
      .then(res => {
        _successDialog(
          'Success',
          'Profile successfully updated.',
        );
        // this.props.navigation.goBack();
      })
      .catch(err => {
        _warningDialog(
          'Failed',
          'Unable to update Profile please try again later',
        );
      });
  };

  render() {
    const {profile} = this.props;
    const {formValues, formErrors} = this.state;
    console.log("fromvalues==========>", formValues)
    const profileImg =
      profile.image || require('../../../assets/image/guest.png');

    return (
      <MowContainer title={mowStrings.profilePage.title}>
        <View
          style={[
            pageContainerStyle,
            {marginTop: hp('3%'), marginHorizontal: wp('7%')},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: hp('8%'), height: hp('8%'), alignSelf: 'center'}}
              resizeMode={'contain'}
              source={profileImg}
            />

            {/* name, email view */}
            <View style={{justifyContent: 'center', marginLeft: 20}}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  fontWeight: '600',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'left',
                  color: mowColors.titleTextColor,
                  fontFamily: fontFamily.medium,
                }}>
                {profile.name}
              </Text>

              <Text
                style={{
                  fontSize: hp('1.8%'),
                  fontWeight: '400',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'left',
                  fontFamily: fontFamily.medium,
                  color: mowColors.titleTextColor,
                }}>
                {profile.email}
              </Text>
            </View>
          </View>

          {/* user information input view */}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp('2%'), marginBottom: hp('7%')}}>
            <View style={this.inputStyle.container}>
              {/* fullName title regular */}
              <Text style={this.inputStyle.titleText}>
                {mowStrings.placeholder.fullName}
              </Text>

              {/* fullName input */}
              <MowInput
                leftIcon={'user'}
                type={'text'}
                containerStyle={this.inputStyle.inputContainer}
                textInputStyle={this.inputStyle.inputText}
                value={formValues.name}
                onChangeText={value => this.onChangeText('name', value)}
              />
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.name}
              </Text>
            </View>
            {/* 
                        <View
                            style={this.inputStyle.container}>

                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.username}

                            </Text>

                            <MowInput
                                leftIcon={"user"}
                                type={"text"}
                                containerStyle={this.inputStyle.inputContainer}
                                textInputStyle={this.inputStyle.inputText}
                                value={this.state.username}
                                onChangeText={value => this.onChangeText('username', value)}/>

                        </View> */}

            {/* <View style={this.inputStyle.container}> */}
              {/* email title regular */}
              {/* <Text style={this.inputStyle.titleText}>
                {mowStrings.placeholder.email}
              </Text> */}

              {/* email input */}
              {/* <MowInput
                leftIcon={'mail'}
                type={'text'}
                containerStyle={this.inputStyle.inputContainer}
                textInputStyle={this.inputStyle.inputText}
                value={formValues.email}
                onChangeText={value => this.onChangeText('email', value)}
              />
                <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.email}
              </Text>
            </View> */}

            <View style={this.inputStyle.container}>
              {/* dob title regular */}
              <Text style={this.inputStyle.titleText}>
                {mowStrings.placeholder.dob}
              </Text>

              {/* dob input */}
              <MowInput
                leftIcon={'calendar'}
                type={'text'}
                containerStyle={this.inputStyle.inputContainer}
                textInputStyle={this.inputStyle.inputText}
                value={formValues.dob}
                onChangeText={value => this.onChangeText('dob', value)}
              />
                <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.dob}
              </Text>
            </View>

            <View style={this.inputStyle.container}>
              {/* gender title regular */}
              <Text style={this.inputStyle.titleText}>
                {mowStrings.placeholder.gender}
              </Text>

              {/* gender picker button */}
              <MowButtonBasic
                onPress={() => {
                  this.setState({
                    pickerData: Gender,
                    pickerVisible: true,
                    pickerType: 1,
                  });
                }}
                leftIcon={'user'}
                leftIconStyle={this.pickerStyle.buttonIcon}
                textStyle={this.pickerStyle.buttonText}
                containerStyle={this.pickerStyle.button}>
                {formValues.gender}
              </MowButtonBasic>
              <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.gender}
              </Text>
            </View>

            {/* <View
                            style={this.inputStyle.container}>
                            <Text
                                style={this.inputStyle.titleText}>
                                {mowStrings.placeholder.gender}
                            </Text>
                            <MowButtonBasic
                                onPress={() => {this.setState({pickerData: Language, pickerVisible: true, pickerType: 2})}}
                                leftIcon={"globe"}
                                leftIconStyle={this.pickerStyle.buttonIcon}
                                textStyle={this.pickerStyle.buttonText}
                                containerStyle={this.pickerStyle.button}>
                                {this.state.language}
                            </MowButtonBasic>
                        </View> */}

            <View style={this.inputStyle.container}>
              {/* phone title regular */}
              <Text style={this.inputStyle.titleText}>
                {mowStrings.placeholder.phone}
              </Text>

              {/* phone input */}
              <MowInput
                leftIcon={'phone'}
                type={'text'}
                containerStyle={this.inputStyle.inputContainer}
                textInputStyle={this.inputStyle.inputText}
                value={formValues.phone}
                onChangeText={value => this.onChangeText('phone', value)}
              />
                <Text style={{color: 'red', fontSize: 12}}>
                {formErrors && formErrors.phone}
              </Text>
            </View>
          </KeyboardAwareScrollView>

          <MowButtonBasic
            containerStyle={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
            }}
            onPress={this.onSaveProfile}
            type={'success'}>
            {mowStrings.button.save}
          </MowButtonBasic>
        </View>

        <MowPicker
          selectedValue={this.state.pickerSelectedId}
          search={false}
          data={this.state.pickerData}
          onSelect={obj => {
            this._onSelect(obj);
          }}
          modalVisible={this.state.pickerVisible}
        />
      </MowContainer>
    );
  }
}
