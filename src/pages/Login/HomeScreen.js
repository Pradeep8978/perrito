import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper';
import Axios from 'axios';
import {mowColors} from '../../values/Colors/MowColors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MowContainer from '../../components/ui/Core/Container/MowContainer';
import {mowStrings} from '../../values/Strings/MowStrings';
import {MowTitleView} from '../../components/ui/MowTitleView';
import {
  categoryStyle,
  fontFamily,
  gPadding,
} from '../../values/Styles/MowStyles';
import TrendCategories from '../../sampleData/TrendCategories';
import TrendCampaign from '../../sampleData/Campaign/TrendCampaign';
import {MowButtonBasic} from '../../components/ui/Common/Button/MowButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import TodaysBestDiscounts from '../../sampleData/TodaysBestDiscounts';
// import BestSeller from "../../sampleData/BestSeller";
import {MowStarView} from '../../components/ui/Common/StarView/MowStarView';
import Advantages from '../../sampleData/Advantages';
// import SmartPhones from "../../sampleData/SmartPhones";
import CarAccessories from '../../sampleData/CarAccessories';
import {MowCountDown} from '../../components/ui/Common/CountDown/MowCountDown';
import TrendBrands from '../../sampleData/TrendBrands';
import {API_BASE_URL} from '../../constants/config';
import CategoryTile from './CategoryTile';
import ProductTile from './ProductTile';

export default class HomeScreen extends React.Component {
  state = {
    BestSeller: [],
  };

  componentDidMount() {
    this.props.fetchUserProfile();
    this.fetchBestSellers();
    this.fetchProductsByCategory('food', 'Food');
    this.fetchProductsByCategory('toys', 'Toys');
    this.fetchProductsByCategory('health', 'Health');
    this.fetchProductsByCategory('accessories', 'Accessories');
    this.fetchProductsByCategory('grooming', 'Grooming');
    this.fetchProductsByCategory('bath', 'Bath');
  }

  fetchBestSellers = () => {
    const url = `${API_BASE_URL}/products/list`;
    Axios.get(url).then(res => {
      this.setState({
        BestSeller: res.data,
      });
    });
  };

  fetchProductsByCategory = (searchStr, category) => {
    this.setState({
      [`${searchStr}Loading`]: true
    })
    const url = `${API_BASE_URL}/products/list?categories=${searchStr}`;
    Axios.get(url).then(res => {
      this.setState({
        [category]: res.data.filter((o, i) => i < 4),
        [`${searchStr}Loading`]: false
      });
    }).catch(err => {
      this.setState({
        [`${searchStr}Loading`]: false
      })
    });
  };

  onSelectProduct = product => {
    this.props.preserveProductDetails(product);
    this.props.navigation.navigate('ProductDetail');
  };

  onClickProductCategory = type => {
    this.props.fetchProducts(type);
    this.props.navigation.navigate('ProductList');
  };

  render() {
    const {BestSeller, Food} = this.state;
    return (
      <MowContainer footerActiveIndex={1} navbar={false}>
        {/* home screen navbar */}
        <View
          style={[
            {
              paddingHorizontal: gPadding,
              paddingTop: 10,
              backgroundColor: mowColors.mainColor,
            },
          ]}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* logo with text */}
            <Image
              source={require('../../assets/logo/logo_with_text.png')}
              style={{height: hp('3%')}}
              resizeMode={'contain'}
            />
          </View>
        </View>

        {/* search view */}
        <View
          style={{
            backgroundColor: mowColors.mainColor,
            paddingHorizontal: gPadding,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: hp(1),
          }}>
          {/* search button */}
          <MowButtonBasic
            onPress={() => {
              this.props.navigation.navigate('HomeFilter');
            }}
            containerStyle={{
              width: '85%',
              alignSelf: 'flex-end',
              borderRadius: 30,
              height: hp('5%'),
            }}
            textStyle={{
              padding: 0,
              margin: 0,
              color: '#aeaeae',
              fontSize: hp('1.6%'),
              fontFamily: fontFamily.light,
              fontStyle: 'normal',
              letterSpacing: 0,
              textAlign: 'left',
            }}
            leftIconStyle={{color: '#aeaeae'}}
            leftIcon={'search'}>
            {mowStrings.search}
          </MowButtonBasic>

          {/* drawer button */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
            style={{height: hp('3%'), width: hp('3%')}}>
            <FAIcon
              style={{color: 'white', fontSize: hp('3%')}}
              name={'bars'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* trend categories view */}
          <View
            style={[
              categoryStyle,
              {
                paddingBottom: hp(2),
                backgroundColor: mowColors.categoryBGColor,
              },
            ]}>
            {/* trend categories title view */}
            <MowTitleView
              showButton={false}
              title={mowStrings.homeScreen.trendCategories}
            />

            {/* trend categories horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={TrendCategories}
              renderItem={({item, index}) => (
                // category item touchable
                <TouchableOpacity
                  onPress={() => this.onClickProductCategory(item.title)}
                  style={{
                    backgroundColor: mowColors.mainColor,
                    borderRadius: 10,
                    width: hp('12%'),
                    height: hp('12%'),
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={index}>
                  {/* category image */}
                  <Image
                    style={{width: hp('7%'), height: hp('7%')}}
                    source={item['image']}
                    resizeMode={'contain'}
                  />

                  {/* category text */}
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: hp('1.3%'),
                      // fontWeight: "bold",
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      textAlign: 'center',
                      fontFamily: 'Poppins-Bold',
                      color: '#ffffff',
                    }}>
                    {item['title']}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* trend campaign view */}
          {/* trend campaign view */}
          <View
            style={[
              categoryStyle,
              {
                marginTop: 15,
                height: wp('75%'),
                backgroundColor: mowColors.categoryBGColor,
              },
            ]}>
            {/* trend campaign title view */}
            <MowTitleView
              buttonOnPress={() => {
                this.props.navigation.navigate('TrendCampaigns');
              }}
              title={mowStrings.homeScreen.trendCampaign}
            />

            {/* trend campaign swiper */}
            <Swiper
              ref="swiper"
              pagingEnabled={true}
              showsPagination={true}
              horizontal={true}
              loop={false}
              dotColor={mowColors.titleTextColor}
              activeDotColor={mowColors.mainColor}
              paginationStyle={{bottom: 0}}
              autoplay={false}>
              {TrendCampaign.map((item, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      width: '95%',
                      alignSelf: 'center',
                      height: wp('53.5%'),
                      borderRadius: 10,
                      marginLeft: '-5%',
                    }}>
                    {/* 16:9 image */}
                    {/* 820*480 */}
                    <Image
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        zIndex: -1,
                        borderRadius: 10,
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'contain'}
                      source={{uri: item['image']}}
                      // source={require("../../assets/image/placeimg_820_480_any.jpg")}
                    />

                    {/* <View
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          marginTop: 10,
                        }}>
                        <MowCountDown
                          size={12}
                          timeToLeft={item['timeToLeft']}
                        />
                      </View>

                      <View
                        style={{
                          justifyContent: 'flex-end',
                          height: '100%',
                          left: '3%',
                          marginBottom: '-40%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('TrendCampaigns');
                          }}
                          style={{
                            height: hp('3%'),
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            borderRadius: 5,
                            borderBottomLeftRadius: 0,
                            paddingLeft: 10,
                            width: wp(75),
                          }}>
                          <Text
                            style={{
                              fontSize: hp('1.7%'),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              textAlign: 'left',
                              color: '#ffffff',
                            }}>
                            {mowStrings.homeScreen.browseAmazingProduct}
                          </Text>
                        </TouchableOpacity>

                        <View
                          style={{
                            height: hp('3%'),
                            backgroundColor: mowColors.trendCampaign.buttonBG,
                            justifyContent: 'center',
                            borderRadius: 5,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            paddingLeft: 10,
                            width: wp(50),
                          }}>
                          <Text
                            style={{
                              fontSize: hp('1.7%'),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              textAlign: 'left',
                              color: mowColors.trendCampaign.buttonText,
                            }}>
                            {item['text']}
                          </Text>
                        </View>
                      </View>
                    </View> */}
                  </View>
                );
              })}
            </Swiper>
          </View>

          {/* trend brands view */}
          <View
            style={[
              categoryStyle,
              {marginTop: 15, backgroundColor: mowColors.categoryBGColor},
            ]}>
            {/* trend brands title view */}
            <MowTitleView
              showButton={false}
              title={mowStrings.homeScreen.trendBrands}
            />

            {/* trend brands horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={TrendBrands}
              renderItem={({item, index}) => (
                // trend brands item touchable
                <TouchableOpacity
                  style={{
                    width: wp('30%'),
                    height: hp('8%'),
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgba(146, 146, 146, 0.41)',
                    borderRadius: 5,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    alignItems: 'center',
                  }}
                  key={index}>
                  {/* brand image */}
                  <Image
                    style={{width: wp('20%'), height: hp('6%')}}
                    source={item['image']}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* best seller view */}
         
          <View
            style={[
              categoryStyle,
              {marginTop: 15, backgroundColor: mowColors.categoryBGColor},
            ]}>
            {/* best seller title view */}
            <MowTitleView
              showButton={false}
              title={mowStrings.homeScreen.bestSeller}
            />

            {/* today's best discount list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={BestSeller}
              renderItem={({item, index}) => (
                //best seller list item
                <ProductTile
                  item={item}
                  index={index}
                  onSelectProduct={this.onSelectProduct}
                />
              )}
            />
          </View>

          {/* advantages view */}
          <View
            style={[
              categoryStyle,
              {marginTop: 15, backgroundColor: mowColors.categoryBGColor},
            ]}>
            {/* advantages title view */}
            <MowTitleView
              showButton={false}
              title={mowStrings.homeScreen.advantages}
            />

            {/* advantages horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={Advantages}
              renderItem={({item, index}) => (
                // advantage item view
                <View
                  style={{
                    width: hp('12%'),
                    height: hp('11%'),
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* advantage view */}
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: mowColors.mainColor,
                      width: '100%',
                      height: hp('8%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    key={index}>
                    {/* advantage image */}
                    <Image
                      style={{width: hp('6%'), height: hp('6%')}}
                      source={item['image']}
                      resizeMode={'contain'}
                    />
                  </View>

                  {/* advantage text */}
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: hp('1.4%'),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      textAlign: 'center',
                      color: mowColors.textColor,
                    }}>
                    {item['title']}
                  </Text>
                </View>
              )}
            />
          </View>
          {/* smart phones view */}
          
          <CategoryTile
            title={mowStrings.homeScreen.food}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.foodLoading}
          />
          <CategoryTile
            title={mowStrings.homeScreen.toys}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.toysLoading}
          />
          <CategoryTile
            title={mowStrings.homeScreen.accessories}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.accessoriesLoading}
          />
          <CategoryTile
            title={mowStrings.homeScreen.grooming}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.groomingLoading}
          />
          <CategoryTile
            title={mowStrings.homeScreen.health}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.healthLoading}
          />
          <CategoryTile
            title={mowStrings.homeScreen.bath}
            data={Food}
            onSelectProduct={this.onSelectProduct}
            loading={this.state.bathLoading}
          />
        </ScrollView>
      </MowContainer>
    );
  }
}
