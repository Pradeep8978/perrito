/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Axios from 'axios';

import SyncStorage from 'sync-storage';
// import Router from "./src/pages/NotLogin/Home";
import {mowColorFunction} from './src/values/Colors/MowColors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {fontFamily} from './src/values/Styles/MowStyles';
import {mowStrings} from './src/values/Strings/MowStrings';
import Router from './src/pages/Router';
import {API_BASE_URL} from './src/constants/config';

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//    GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

// import NormalLogin from './src/pages/';

class App extends React.Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    const _self = this;
    console.disableYellowBox = true;
    // to init local storage data, for retrieving data when entered the app
    const data = await SyncStorage.init();
    // to set theme color according to the user selection
    let color = SyncStorage.get('color');
    mowColorFunction(color);
    // to set selected language from user
    let lang = SyncStorage.get('language');
    const token = SyncStorage.get('token');
    if (token) {
      console.log('PREV TOKEEN =>', token);
      this.checkUserStatus(token);
    } else {
      SyncStorage.remove('token');
      this.setState({
        isReady: true,
      });
    }

    if (!lang) {
      mowStrings.setLanguage('en');
    } else {
      // to update selected language
      mowStrings.setLanguage(lang);
    }
  }

  checkUserStatus = token => {
    console.log(`${API_BASE_URL}/customers/status`, "===============================================")
    Axios.get(`${API_BASE_URL}/customers/status`, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    })
      .then(res => {
        console.log('STATUS SUCCESS');
        if (res.data.token) {
          SyncStorage.set('token', token);
          console.log('PRESENT TOKEN =>', SyncStorage.get('token'));
          Axios.defaults.headers.Authorization = token;
          this.setState({
            isReady: true,
          });
        } else throw {};
      })
      .catch(err => {
        console.log('STATUS FAILURE', err);
        this.setState({
          isReady: true,
        });
      });
  };

  render() {
    return !this.state.isReady ? (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          overflow: 'hidden',
        }}
        source={require('./src/assets/image/mowega_splash.jpg')}>
        <StatusBar hidden />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 100,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              position: 'absolute',
              opacity: 0.7,
              width: '100%',
              height: hp(11),
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: hp(3),
              fontFamily: fontFamily.bold,
            }}>
            Perrito
          </Text>
        </View>
      </ImageBackground>
    ) : (
      <Router />
    );
  }
}

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
