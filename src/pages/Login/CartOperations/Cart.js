import React from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  borderStyle,
  categoryStyleWithoutShadow,
  fontFamily,
} from '../../../values/Styles/MowStyles';
import CartData from '../../../sampleData/CartData';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import {MowInput} from '../../../components/ui/Common/Input/MowInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Cart extends React.Component {
  state = {
    cartData: CartData,
    cartDataListKey: 0,
    cartTotal: 3057,
  };

  cartTotalStyle = {
    rowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: mowColors.titleTextColor,
      marginRight: 10,
      fontSize: hp(1.6),
      letterSpacing: 0,
    },
    content: {
      color: mowColors.textColor,
      marginRight: 10,
      fontSize: hp(1.5),
      fontWeight: '600',
      letterSpacing: 1,
    },
  };

  _deleteItemFromCart(index) {
    let cartData = this.state.cartData;

    cartData.splice(index, 1);

    this.setState({
      cartData: cartData,
      cartDataListKey: this.state.cartDataListKey + 1,
    });
  }

  _calculateTotalPrice() {
    let totalPrice = 0;
    this.props.cartItems.forEach(item => {
      totalPrice = totalPrice + item.cartCount * item.price;
    });
    return totalPrice;
  }

  // to update product cartCount according to the user value
  _updateProductcartCount(value, index) {
    // the value that entered by user
    value = Number(value);

    let newArray = [...this.state.cartData];

    // to update product cartCount according to the value
    newArray[index]['cartCount'] = value;

    // to update new array with new product cost
    newArray = this._updateProductCost(index, newArray, value);

    let totalPrice = 0;
    for (let i in newArray) {
      let price = Number(newArray[i]['totalPrice']);
      totalPrice += price;
    }

    this.setState({
      cartData: newArray,
      cartTotal: totalPrice,
    });
  }

  // to update product total cost
  _updateProductCost(index, productArr, cartCount) {
    // to get product product price
    let price = productArr[index]['price'];

    // to calculate new product total price and update
    productArr[index]['totalPrice'] = price * cartCount;

    // return new product array
    return productArr;
  }

  render() {
    const totalPrice = this._calculateTotalPrice();
    return (
      <MowContainer
        footerActiveIndex={3}
        title={mowStrings.cart}
        style={{backgroundColor: mowColors.pageBGDarkColor}}>
        <KeyboardAwareScrollView style={{marginBottom: hp('7%')}}>
          <FlatList
            // key={this.state.cartDataListKey}
            style={{marginTop: -5}}
            keyExtractor={(item, index) => index.toString()}
            data={this.props.cartItems}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={[
                  categoryStyleWithoutShadow,
                  {
                    flexDirection: 'row',
                    marginVertical: 5,
                    backgroundColor: mowColors.viewBGColor,
                    padding: 10,
                  },
                ]}>
                <View
                  style={{
                    flex: 1.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: hp('10%'), height: hp('10%')}}
                    source={item['image']}
                  />
                </View>

                <View style={{flex: 4, marginLeft: 10}}>
                  {/* product title text */}
                  <Text
                    style={{
                      fontSize: hp('1.8%'),
                      fontWeight: '600',
                      fontStyle: 'normal',
                      textAlign: 'left',
                      color: mowColors.titleTextColor,
                      marginBottom: 10,
                      paddingRight: 5,
                      fontFamily: fontFamily.semiBold,
                    }}>
                    {item['name']}
                  </Text>

                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    {/* price view */}
                    <View style={{flex: 1.5}}>
                      <Text
                        style={{
                          fontSize: hp('2%'),
                          fontWeight: 'bold',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          textAlign: 'left',
                          color: mowColors.titleTextColor,
                          fontFamily: fontFamily.bold,
                        }}>
                        {`₹ ${item.price * item.cartCount}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* minus button view */}
                      <TouchableOpacity
                        disabled={item.cartCount === 1}
                        onPress={() => {
                          this.props.decrementCartItem(index);
                        }}
                        style={minusPlusStyle.container}>
                        <Text style={minusPlusStyle.text}>-</Text>
                      </TouchableOpacity>

                      {/* product cartCount text */}
                      <Text
                        style={{
                          fontSize: hp('2%'),
                          fontWeight: '600',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          textAlign: 'center',
                          color: mowColors.titleTextColor,
                          marginHorizontal: 15,
                          fontFamily: fontFamily.semiBold,
                        }}>
                        {item['cartCount']}
                      </Text>

                      {/* plus button view*/}
                      <TouchableOpacity
                        onPress={() => {
                          this.props.incrementCartItem(index);
                        }}
                        style={minusPlusStyle.container}>
                        <Text style={minusPlusStyle.text}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.props.removeCartItem(index);
                      }}
                      style={{flex: 1}}>
                      <FeatherIcon
                        style={{
                          textAlign: 'center',
                          color: mowColors.mainColor,
                          fontSize: hp('2.5%'),
                        }}
                        name={'trash-2'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* coupon view */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: mowColors.viewBGColor,
              borderRadius: 5,
              alignSelf: 'center',
              height: hp('5.5%'),
              marginVertical: hp('1%'),
              width: '90%',
            }}>
            <MowInput
              containerStyle={{
                flex: 3,
                borderWidth: 0,
                backgroundColor: 'transparent',
              }}
              iconColor={'#b6babe'}
              textInputStyle={{fontFamily: fontFamily.regular}}
              placeholder={mowStrings.placeholder.couponCode}
              leftIcon={'percent'}
            />

            <MowButtonBasic
              containerStyle={{flex: 1, backgroundColor: mowColors.mainColor}}
              size={'small'}
              type={'success'}>
              {mowStrings.button.apply}
            </MowButtonBasic>
          </View>
        </KeyboardAwareScrollView>

        <MowButtonBasic
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
          style={{marginTop: hp('5%')}}
          btnStyle={{
            borderRadius: 50,
            shadowColor: '#30C1DD',
            shadowRadius: 50,
            shadowOpacity: 0.9,
            elevation: 3,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          }}
          containerStyle={{marginTop: hp('5%')}}
          textStyle={{
            color: mowColors.mainColor,
            fontWeight: 'normal',
            letterSpacing: 0,
          }}
          type={'default'}>
          {mowStrings.button.continue}
        </MowButtonBasic>

        <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
          {/* cart total ui */}
          <View
            style={{
              backgroundColor: mowColors.viewBGColor,
              flexDirection: 'row',
              width: '100%',
              borderRadius: 5,
              padding: 10,
            }}>
            <View style={{flex: 1}}>
              {/* sub-total row view */}
              <View style={this.cartTotalStyle.rowView}>
                {/* sub-total text */}
                <Text style={this.cartTotalStyle.title}>
                  {mowStrings.cartScreen.subtotal}:
                </Text>

                {/* sub-total amount text */}
                <Text style={this.cartTotalStyle.content}>
                  {`₹ ${totalPrice}`}
                </Text>
              </View>

              {/* coupon row view */}
              {/* <View
                                style={this.cartTotalStyle.rowView}>
                                <Text
                                    style={this.cartTotalStyle.title}>
                                    {mowStrings.cartScreen.coupon}:
                                </Text>
                                <Text
                                    style={this.cartTotalStyle.content}>
                                    $0
                                </Text>
                            </View> */}

              {/* shipping row view */}
              <View style={this.cartTotalStyle.rowView}>
                {/* sub total text */}
                <Text style={this.cartTotalStyle.title}>
                  {mowStrings.cartScreen.shipping}:
                </Text>

                {/* sub total amount text */}
                <Text style={this.cartTotalStyle.content}>$0</Text>
              </View>
            </View>

            {/* total price view */}
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: mowColors.mainColor,
                  marginRight: 10,
                  fontSize: hp(2),
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {`₹ ${totalPrice}`}
              </Text>
            </View>
          </View>

          <MowButtonBasic
            onPress={() => {
              this.props.navigation.navigate('AddressList', {cart: true});
            }}
            type={'success'}>
            {mowStrings.button.completeShopping}
          </MowButtonBasic>
        </View>
      </MowContainer>
    );
  }
}

const minusPlusStyle = {
  container: {
    borderRadius: 3,
    backgroundColor: '#ffffff',
    ...borderStyle,
    alignItems: 'center',
    justifyContent: 'center',
    width: hp('3%'),
    height: hp('3%'),
  },
  text: {
    fontSize: hp('2%'),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#707070',
  },
};
