import React from 'react';
import MyContainer from '../../components/ui/Core/Container/MowContainer';
import {mowColors} from '../../values/Colors/MowColors';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {pageContainerStyle} from '../../values/Styles/MowStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {MowButtonBasic} from '../../components/ui/Common/Button/MowButton';
import {mowStrings} from '../../values/Strings/MowStrings';

export default class Home extends React.Component {
  state = {
    modalVisible: false,
  };
  toggleModal = () => {
    const {modalVisible} = this.state;
    console.log('modalVisible', modalVisible);
    this.setState({modalVisible: !modalVisible});
  };
  render() {
    return (
      <MyContainer
        footer={false}
        navbar={false}
        statusBar={true}
        style={{backgroundColor: mowColors.mainColor}}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={require('./../../assets/image/SliderLogin2.png')}>
          <View style={pageContainerStyle}>
            {/* button view */}
            <View
              style={{
                marginTop: hp('10%'),
                marginBottom: hp('3%'),
                position: 'absolute',
                bottom: 10,
                alignSelf: 'center',
              }}>
              {/* sign in with email button */}
              <MowButtonBasic
                onPress={() => {
                  this.props.navigation.navigate('NormalLogin');
                }}
                size={'big'}
                containerStyle={buttonStyle.container}
                textStyle={buttonStyle.text}
                borderRadius={50}
                // leftIcon={'mail'}
                filled={false}>
                Sign In
              </MowButtonBasic>

              <MowButtonBasic
                onPress={() => {
                  this.props.navigation.navigate('NormalRegister');
                }}
                size={'big'}
                containerStyle={buttonStyle.container}
                textStyle={buttonStyle.text}
                borderRadius={50}
                // leftIcon={'mail'}
                filled={false}>
                Sign Up
              </MowButtonBasic>
              <Text
                onPress={this.toggleModal}
                style={{
                  marginTop: hp('1%'),
                  fontSize: hp('2s%'),
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Light',
                  color: '#ffffff',
                }}>
                {mowStrings.loginHome.usageTerms}
              </Text>
              <Modal animationType = {"slide"} transparent = {false} visible={this.state.modalVisible}>
                <View style={ModalStyles.MondalContainer}>
                  <View  style={ModalStyles.modal}>
                    <Text>Terms and conditions</Text>

                  </View>
                  <MowButtonBasic
                      type="info"
                      size={'small'}
                      containerStyle={{width: 200, position: 'absolute', bottom: 50}}
                      onPress={() => {
                        this.toggleModal(!this.state.modalVisible);
                      }}>
                      Close
                    </MowButtonBasic>
                </View>
              </Modal>
            </View>
          </View>

          {/* logo */}
          <Image
            resizeMode={'contain'}
            style={{
              marginBottom: hp('5%'),
              alignSelf: 'center',
              width: wp('60%'),
              height: hp('4%'),
            }}
            source={require('../../assets/logo/logo_with_text.png')}
          />
        </ImageBackground>
      </MyContainer>
    );
  }
}

const buttonStyle = {
  container: {
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  text: {
    fontSize: hp('2.5%'),
    fontWeight: 'normal',
    fontStyle: 'normal',
    // letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
  },
};

const styles = {
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
};

const ModalStyles = {
  MondalContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // flex: 1,
    // marginBottom:100
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  text: {
    marginTop: 10,
  },
};
