import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {MowInput} from '../../../components/ui/Common/Input/MowInput';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import {
  borderStyle,
  fontFamily,
  pageContainerStyle,
} from '../../../values/Styles/MowStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {View} from 'react-native';
import CountryList from '../../../sampleData/CountryList';
import {MowPicker} from '../../../components/ui/Common/Picker/MowPicker';
import CityList from '../../../sampleData/CityList';
import TownList from '../../../sampleData/TownList';
import {API_BASE_URL} from '../../../constants/config';
import Axios from 'axios';
import {
  _successDialog,
  _warningDialog,
} from '../../../components/ui/Common/Dialog/MowDialogFunctions';
import {connect} from 'react-redux';
import {fetchUserProfile} from './../../../actions/auth.actions';

class NewAddress extends React.Component {
  /**
   *  these style values are here because of the color change.
   *  when changed the color, styles that are outside the class, are not re-rendered!
   */
  iconColor = mowColors.mainColor;

  inputStyle = {
    container: {
      backgroundColor: mowColors.viewBGColor,
    },
  };

  state = {
    formValues: {
      name: '',
      phone: '',
      address_line_1: '',
      address_line_2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
    },
  };

  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [key]: value,
      },
    }));
  };

  onSaveAddress = () => {
    const {formValues} = this.state;
    const url = `${API_BASE_URL}/customers/profile/address/new`;
    Axios.post(url, formValues)
      .then(res => {
        this.props.fetchUserProfile();
        _successDialog(
          'Success',
          'Address successfully added. Please select default address',
        );
        this.props.navigation.navigate('AddressList');
      })
      .catch(err => {
        _warningDialog(
          'Failed',
          'Unable to save address please try again later',
        );
      });
  };

  render() {
    return (
      <MowContainer title={mowStrings.button.addNewAddress}>
        <KeyboardAwareScrollView
          style={pageContainerStyle}
          showsVerticalScrollIndicator={false}>
          {/* name input */}
          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('name', value)}
            placeholder={mowStrings.placeholder.name}
            iconColor={this.iconColor}
            leftIcon={'user'}
            type={'text'}
          />

          {/* phone input */}
          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('phone', value)}
            placeholder={mowStrings.placeholder.phone}
            iconColor={this.iconColor}
            leftIcon={'phone'}
            type={'number'}
          />

          {/* address title input */}
          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('address_line_1', value)}
            placeholder={mowStrings.placeholder.addressName}
            iconColor={this.iconColor}
            leftIcon={'navigation'}
            type={'text'}
          />

          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('address_line_2', value)}
            placeholder={mowStrings.placeholder.addressName2}
            iconColor={this.iconColor}
            leftIcon={'navigation'}
            type={'text'}
          />

          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('landmark', value)}
            placeholder={mowStrings.placeholder.landmark}
            iconColor={this.iconColor}
            leftIcon={'map'}
            type={'text'}
          />

          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('city', value)}
            placeholder={mowStrings.placeholder.city}
            iconColor={this.iconColor}
            leftIcon={'navigation'}
            type={'text'}
          />

          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('state', value)}
            placeholder={mowStrings.placeholder.state}
            iconColor={this.iconColor}
            leftIcon={'map-pin'}
            type={'text'}
          />

          <MowInput
            containerStyle={this.inputStyle.container}
            onChangeText={value => this.onChangeText('pincode', value)}
            placeholder={mowStrings.placeholder.pincode}
            iconColor={this.iconColor}
            leftIcon={'hash'}
            type={'text'}
          />
        </KeyboardAwareScrollView>

        <View style={{marginHorizontal: wp('3%')}}>
          {/* save address button */}
          <MowButtonBasic
            onPress={this.onSaveAddress}
            size={'medium'}
            type={'success'}>
            {mowStrings.button.saveAddress}
          </MowButtonBasic>
        </View>
      </MowContainer>
    );
  }
}

const mapDispatchToProps = {
  fetchUserProfile
}


export default connect(null, mapDispatchToProps)(NewAddress);