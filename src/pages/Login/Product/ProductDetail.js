import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {mowStrings} from '../../../values/Strings/MowStrings';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import {
  borderStyle,
  categoryStyleWithoutShadow,
  fontFamily,
} from '../../../values/Styles/MowStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {MowButtonBasic} from '../../../components/ui/Common/Button/MowButton';
import Colors from '../../../sampleData/Colors';
import BodySize from '../../../sampleData/BodySize';
import {MowStarView} from '../../../components/ui/Common/StarView/MowStarView';
// import CustomerComments from '../../../sampleData/CustomerComments';
import {MowModal} from '../../../components/ui/Common/Modal/MowModal';
import {API_BASE_URL} from './../../../constants/config';
import Axios from 'axios';
import {
  _successDialog,
  _warningDialog,
} from '../../../components/ui/Common/Dialog/MowDialogFunctions';

export default class ProductDetail extends React.Component {
  ratingView = {
    row: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      color: mowColors.textColor,
      fontSize: hp('3%'),
    },
    text: {
      marginTop: 3,
      fontSize: hp('1.8%'),
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'center',
      color: mowColors.titleTextColor,
      fontFamily: 'Poppins-Light',
    },
  };

  state = {
    // product: this.props.navigation.getParam("product"),
    colorArr: [],
    colorListKey: 0,
    sizeArr: [],
    sizeListKey: 0,
    showMore: false,
    commentListKey: 0,
    reviewLoading: false,
    CustomerComments: [],
  };

  componentDidMount = () => {
    this.fetchUserReviews();
  };

  fetchUserReviews = () => {
    const {selectedProduct} = this.props;
    const url = `${API_BASE_URL}/reviews/customerReview/list/${selectedProduct._id}`;
    this.setState({reviewsListLoading: true});
    Axios.get(url)
      .then(res => {
        if (res.data.length) {
          this.setState({
            reviewsListLoading: false,
            CustomerComments: res.data,
          });
        } else {
          throw {};
        }
      })
      .catch(err => {
        this.setState({
          reviewsListLoading: false,
          reviewsListError: 'No reviews for the Product',
        });
      });
  };

  componentWillMount = () => {
    this.setState({
      reviewsListLoading: false,
      CustomerComments: [],
      reviewsListError: null
    })
  }

  _handleSizeSelection(index) {
    let sizeArr = this.state.sizeArr;

    let length = BodySize.length;

    for (let i = 0; i < length; i++) {
      if (i != index) {
        // to set false all array values except selected index
        sizeArr[i] = false;
      }
    }

    // to update selected item as its opposite
    sizeArr[index] = !sizeArr[index];

    this.setState({sizeArr: sizeArr, sizeListKey: this.state.sizeListKey + 1});
  }

  _handleColorSelection(index) {
    let colorArr = this.state.colorArr;

    let length = Colors.length;

    for (let i = 0; i < length; i++) {
      if (i != index) {
        // to set false all array values except selected index
        colorArr[i] = false;
      }
    }

    // to update selected item as its opposite
    colorArr[index] = !colorArr[index];

    this.setState({
      colorArr: colorArr,
      colorListKey: this.state.colorListKey + 1,
    });
  }

  _commentRow(item) {
    console.log('REvIEEW ITM ==>', item);
    const imageUrl =
      item.image ||
      'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png';
    return (
      <View
        style={{
          marginVertical: 5,
          borderRadius: 5,
          borderStyle: 'solid',
          // borderWidth: 1,
          borderColor: 'rgba(146, 146, 146, 0.41)',
          padding: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* image view */}
          <Image
            style={{
              width: hp('5%'),
              height: hp('5%'),
            }}
            resizeMode={'contain'}
            source={{uri: imageUrl}}
          />

          <View style={{marginLeft: 10}}>
            {/* name text */}
            <Text
              style={{
                fontSize: hp('1.8%'),
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'left',
                color: mowColors.titleTextColor,
                fontFamily: 'Poppins-Regular',
              }}>
              {item['name']}
            </Text>

            {/* date text */}
            <Text
              style={{
                fontSize: hp('1.4%'),
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'left',
                color: mowColors.textColor,
                fontFamily: 'Poppins-Light',
              }}>
              {item['date']}
            </Text>
          </View>

          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            {/* star view */}
            <MowStarView score={item['rating']} />
          </View>
        </View>

        {/* description text */}
        <Text
          style={{
            marginTop: 5,
            fontSize: hp('1.5%'),
            fontWeight: '300',
            fontStyle: 'normal',
            letterSpacing: 0,
            textAlign: 'left',
            color: mowColors.textColor,
            fontFamily: 'Poppins-Light',
          }}>
          {item['description']}
        </Text>
      </View>
    );
  }

  onAddToCart = product => {
    this.props.addProductToCart(product);
    this.props.navigation.navigate('Cart');
  };

  isExistCart = item => {
    const {cartItems} = this.props;
    const isExist = cartItems.find(o => o._id === item._id);
    return isExist;
  };

  onOpenRateModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onCloseRateModal = () => {
    this.setState({
      showModal: false,
    });
  };

  updateStars = val => {
    this.setState({
      score: val,
    });
  };

  onSubmitRating = () => {
    const {selectedProduct} = this.props;
    const {score, reviewDescription} = this.state;
    this.setState({reviewLoading: true});
    const url = `${API_BASE_URL}/reviews/customerReview/${selectedProduct._id}`;
    const body = {
      rating: Math.round(score),
      description: reviewDescription,
    };
    console.log('URL =>?', url);
    Axios.post(url, body)
      .then(res => {
        // _successDialog(
        //   'Success',
        //   'Thankyou for reviewing this product',
        // );
        this.setState({reviewLoading: false, showModal: false});
      })
      .catch(err => {
        console.log('error =>', err);
        _warningDialog(
          'Failed',
          err.response.error ||
            'Unable to submit your Review on product. please try again later',
        );
      })
      .finally(() => {
        this.setState({reviewLoading: false, showModal: false});
      });
  };

  renderRatingModal = () => {
    return (
      <MowModal
        animationType="slide"
        transparent={false}
        modalVisible={this.state.showModal}
        onClosed={this.onCloseRateModal}>
        <View
          style={{
            marginTop: 22,
            alignSelf: 'center',
            alignContent: 'space-between',
            // flexDirection: 'column',
          }}>
          <MowStarView
            style={{fontSize: 40}}
            spacing={5}
            updateStars={this.updateStars}
            score={this.state.score}
          />
          <TextInput
            style={styles.textComment}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => this.setState({reviewDescription: text})}
            value={this.state.text}
          />
          <MowButtonBasic
            containerStyle={{
              backgroundColor: mowColors.mainColor,
              width: 100,
              marginTop: 20,
            }}
            onPress={() => this.onSubmitRating()}
            textStyle={{fontSize: hp('1.5%'), textAlign: 'center'}}
            stickyIcon={true}
            shadow
            loading={this.state.reviewLoading}
            size={'small'}
            type={'success'}>
            Submit
          </MowButtonBasic>
        </View>
      </MowModal>
    );
  };

  render() {
    // const product = this.state.product;
    const product = this.props.selectedProduct;
    const {CustomerComments, reviewsListLoading, reviewsListError} = this.state;
    return (
      <MowContainer
        style={{backgroundColor: mowColors.pageBGDarkColor}}
        title={mowStrings.productDetail.title}>
        <ScrollView>
          {/* product info view */}
          {this.renderRatingModal()}
          <View
            style={[
              categoryStyleWithoutShadow,
              {backgroundColor: mowColors.categoryBGColor},
            ]}>
            {/* product name text */}
            <Text
              style={{
                marginVertical: 10,
                width: '100%',
                textAlign: 'center',
                fontSize: hp('2.2%'),
                fontWeight: '600',
                fontStyle: 'normal',
                letterSpacing: 0,
                fontFamily: 'Poppins-Medium',
                color: mowColors.titleTextColor,
              }}>
              {product['name']}
            </Text>

            {/* image swiper view */}
            <View style={{height: hp('42%')}}>
              {/* product image swiper */}
              <Swiper
                ref="swiper"
                pagingEnabled={true}
                showsPagination={true}
                horizontal={true}
                loop={false}
                dotColor={'grey'}
                activeDotColor={mowColors.mainColor}
                paginationStyle={{bottom: hp('1%')}}
                autoplay={false}>
                {product['images'].map((item, key) => {
                  return (
                    <Image
                      key={key}
                      style={{
                        height: hp('38%'),
                        width: '100%',
                      }}
                      resizeMode={'contain'}
                      source={item['image']}
                    />
                  );
                })}
              </Swiper>
            </View>
          </View>

          {/* content view */}
          <View>
            {/* discount rate & price & add to cart button */}
            <View
              style={[
                categoryStyleWithoutShadow,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  backgroundColor: mowColors.categoryBGColor,
                },
              ]}>
              {product['discountRate'] ? (
                //price & discount view
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  {/* discount rate view */}
                  <View
                    style={{
                      backgroundColor: mowColors.mainColor,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: hp('5%'),
                      height: hp('5%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        textAlign: 'left',
                        color: '#ffffff',
                      }}>
                      {product['discountRate']}
                    </Text>
                  </View>

                  {/* price view */}
                  <View style={{marginLeft: 10}}>
                    {/* first price text view  */}
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      {/* first price text */}
                      <Text
                        style={{
                          fontSize: hp('1.8%'),
                          fontWeight: '300',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          textAlign: 'center',
                          color: '#c2c2c2',
                        }}>
                        {product['currency']}
                        {product['firstPrice']}
                      </Text>

                      <View
                        style={{
                          backgroundColor: mowColors.mainColor,
                          width: '100%',
                          height: hp('0.1%'),
                          position: 'absolute',
                        }}
                      />
                    </View>

                    {/* last price text */}
                    <Text
                      style={{
                        marginTop: 1,
                        fontSize: hp('2%'),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        textAlign: 'center',
                        color: mowColors.mainColor,
                      }}>
                      {product['currency']}
                      {product['lastPrice']}
                    </Text>
                  </View>
                </View>
              ) : (
                //price text
                <Text
                  style={{
                    flex: 1,
                    fontSize: hp('2.5%'),
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'left',
                    color: '#575757',
                  }}>
                  {'₹ ' + product['price']}
                </Text>
              )}

              {/* button view */}
              <View style={{flex: 1}}>
                <MowButtonBasic
                  containerStyle={{margin: 0, height: hp(5)}}
                  onPress={() => {
                    this.onAddToCart(product);
                  }}
                  leftIconStyle={{fontSize: hp('2.5%')}}
                  textStyle={{fontSize: hp('1.5%')}}
                  stickyIcon={true}
                  leftIcon={'shopping-cart'}
                  size={'small'}
                  type={this.isExistCart(product) ? 'info' : 'success'}
                  disabled={this.isExistCart(product)}>
                  {this.isExistCart(product)
                    ? mowStrings.button.addedToCart
                    : mowStrings.button.addToCart}
                </MowButtonBasic>
              </View>
            </View>

            {/* product feature view */}
            <View
              style={[
                categoryStyleWithoutShadow,
                {marginTop: 15, backgroundColor: mowColors.categoryBGColor},
              ]}>
              <Text
                style={{
                  fontSize: hp('1.8%'),
                  fontWeight: '600',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'left',
                  color: mowColors.titleTextColor,
                  fontFamily: 'Poppins-Regular',
                }}>
                {mowStrings.productDetail.description}
              </Text>

              {/* product feature text */}
              {product.description.map(val => (
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: hp('1.6%'),
                    fontWeight: '300',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'left',
                    display: 'flex',
                    color: mowColors.textColor,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {val}
                </Text>
              ))}
            </View>

            {/* like report share view */}
            <View
              style={[
                categoryStyleWithoutShadow,
                {
                  marginTop: 15,
                  flexDirection: 'row',
                  backgroundColor: mowColors.categoryBGColor,
                },
              ]}>
              {/* like button */}
              <TouchableOpacity
                style={this.ratingView.row}
                onPress={this.onOpenRateModal}>
                <FAIcon name={'star'} style={this.ratingView.icon} />
                <Text style={this.ratingView.text}>Rate Product</Text>
              </TouchableOpacity>

              {/* report button */}
              <TouchableOpacity style={this.ratingView.row}>
                {/* report icon */}
                <FAIcon name={'info-circle'} style={this.ratingView.icon} />

                {/* report text */}
                <Text style={this.ratingView.text}>
                  {mowStrings.productDetail.report}
                </Text>
              </TouchableOpacity>

              {/* share button */}
              <TouchableOpacity style={this.ratingView.row}>
                {/* share icon */}
                <FAIcon name={'share'} style={this.ratingView.icon} />

                {/* share text */}
                <Text style={this.ratingView.text}>
                  {mowStrings.productDetail.share}
                </Text>
              </TouchableOpacity>
            </View>

            {/* comment list view */}
            <View
              style={[
                categoryStyleWithoutShadow,
                {marginTop: 15, backgroundColor: mowColors.categoryBGColor},
              ]}>
              {/* title text  */}
              <Text
                style={{
                  fontSize: hp('1.8%'),
                  fontWeight: '600',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'left',
                  color: mowColors.titleTextColor,
                  fontFamily: 'Poppins-Bold',
                }}>
                {mowStrings.productDetail.customerComments}{' '}
                {`(${CustomerComments.length})`}
              </Text>

              {/* comment list */}
              {reviewsListLoading ? (
                <ActivityIndicator />
              ) : reviewsListError ? (
                <Text>{reviewsListError}</Text>
              ) : (
                <FlatList
                  key={this.state.commentListKey}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={CustomerComments}
                  renderItem={({item, index}) => (
                    <View>
                      {index == 0 && (
                        <View key={index}>{this._commentRow(item, index)}</View>
                      )}

                      {index != 0 && this.state.showMore && (
                        <View key={index}>{this._commentRow(item, index)}</View>
                      )}
                    </View>
                  )}
                />
              )}

              {/* show more button */}
              {/* <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showMore: true,
                    commentListKey: this.state.commentListKey + 1,
                  })
                }
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.7%'),
                    color: mowColors.mainColor,
                    fontWeight: '500',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                  }}>
                  {mowStrings.productDetail.showMore}
                </Text>

                <FAIcon
                  name={'chevron-down'}
                  style={{
                    color: mowColors.mainColor,
                    fontSize: hp('2%'),
                  }}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </MowContainer>
    );
  }
}

const styles = StyleSheet.create({
  textComment: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 50,
    borderRadius: 5,
    padding: 10,
    // backgroundColor: 'black'
  },
});
