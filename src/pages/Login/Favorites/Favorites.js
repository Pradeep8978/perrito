import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {platform} from "../../../values/Constants/MowConstants";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {mowColors} from "../../../values/Colors/MowColors";
import {MowStarView} from "../../../components/ui/Common/StarView/MowStarView";
import FavoriteData from "../../../sampleData/FavoriteData";
import {fontFamily, paginationStyle} from "../../../values/Styles/MowStyles";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {_warningDialog} from "../../../components/ui/Common/Dialog/MowDialogFunctions";

let self;

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            favoriteData: FavoriteData,
            favoriteDataListKey: 0,
            activeIndex: 0,
            activeSlide: []
        };

        self = this;
    }

    componentDidMount() {
        // to set all active index as 0
        let arr = [];
        let length = FavoriteData.length;
        for (let i = 0; i < length; i++){
            arr[i] = 0;
        }
        this.setState({activeSlide: arr});
    }

    _deleteItemFromFavoriteList(index) {
        // warning dialog to confirm user selection
        _warningDialog("Mowega", mowStrings.alertDialogs.removeFavorite, mowStrings.button.yes, mowStrings.button.no, true)
            .then(() => {
                let favoriteData = this.state.favoriteData;

                favoriteData.splice(index, 1);

                this.setState({favoriteData: favoriteData, favoriteDataListKey: this.state.favoriteDataListKey + 1});
            });
    }

    _renderImages ({item, index}) {
        return (
            <TouchableOpacity
                onPress={() => {self.props.navigation.navigate("ProductDetail", {product: self.state.favoriteData[index]})}}
                key={index}>

                <Image
                    style={{height: "100%", width: "100%", borderRadius: 10}}
                    resizeMode={"stretch"}
                    source={item["image"]}/>

            </TouchableOpacity>
        );
    }

    // image pagination style
    pagination (data, index) {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={this.state.activeSlide[index]}
                containerStyle={paginationStyle.container}
                dotStyle={[paginationStyle.activeDot, {backgroundColor: mowColors.pagination.activeDot}]}
                inactiveDotStyle={[paginationStyle.passiveDot, {backgroundColor: mowColors.pagination.passiveDot}]}
                inactiveDotOpacity={paginationStyle.inactiveDotOpacity}
                inactiveDotScale={paginationStyle.inactiveDotScale}/>
        );
    }

    // to handle active slide for all items
    _handleActiveSlide(activeSlide, index) {
        let activeSlideArr = this.state.activeSlide;
        activeSlideArr[index] = activeSlide;
        this.setState({
            activeSlide: activeSlideArr,
        });
    }

    render() {

        return(

            <MowContainer
                title={mowStrings.favoritesPage.title}>

                {/* product list */}
                <FlatList
                    key={this.state.favoriteDataListKey}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    style={{paddingHorizontal: wp("3%")}}
                    data={this.state.favoriteData}
                    renderItem={({ item, index }) => (

                        //product item
                        <View
                            key={index}
                            style={{
                                margin: 5,
                                width: wp("45%"),
                            }}>

                            {/* image view */}
                            <View
                                style={{
                                    height: platform === "android" ? hp("25") : hp("21"),
                                    width: "100%",
                                    borderRadius: 10,
                                    justifyContent: "center"
                                }}>

                                {/* hearth icon touchable */}
                                <TouchableOpacity
                                    onPress={() => {this._deleteItemFromFavoriteList(index)}}
                                    style={{position: "absolute", top: 10, right: 10, zIndex: 99}}>

                                    <FAIcon
                                        style={{
                                            fontSize: hp("2%"),
                                            color: mowColors.mainColor
                                        }}
                                        name={"heart"}/>

                                </TouchableOpacity>

                                {/* favorite item image slider */}
                                <Carousel
                                    removeClippedSubviews={false}
                                    ref={(c) => {this._carousel = c}}
                                    data={item["images"]}
                                    onSnapToItem={(activeSlide) => this._handleActiveSlide(activeSlide, index)}
                                    sliderWidth={wp("45%")}
                                    itemWidth={wp("45%")}
                                    renderItem={this._renderImages}/>

                                {/* image pagination */}
                                {this.pagination(item["images"], index)}

                                {
                                    item["new"] &&

                                    <View
                                        style={{
                                            position: "absolute",
                                            backgroundColor: mowColors.mainColor,
                                            top: 10,
                                            left: 10,
                                            borderRadius: 200,
                                            width: hp("5%"),
                                            height: hp("5%"),
                                            justifyContent: "center"
                                        }}>

                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#ffffff"
                                            }}>

                                            {mowStrings.homeScreen.new}

                                        </Text>

                                    </View>
                                }

                                {
                                    !item["stock"] &&

                                    // out of stock view
                                    <View
                                        style={{
                                            position: "absolute",
                                            opacity: 0.8,
                                            backgroundColor: "#848484",
                                            width: "100%"
                                        }}>

                                        <Text
                                            style={{
                                                fontSize: hp("1.8%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "center",
                                                color: "#ffffff"
                                            }}>

                                            {mowStrings.homeScreen.outOfStock}

                                        </Text>

                                    </View>

                                }

                            </View>

                            <View
                                style={{height: hp(11.5)}}>

                                {/* title text */}
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        marginTop: 5,
                                        fontSize: hp("1.8%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        fontFamily: fontFamily.regular
                                    }}>

                                    {item["title"]}

                                </Text>

                                {/* star view */}
                                <View
                                    style={{flexDirection: "row", alignItems: "center", marginTop: 1}}>

                                    {/* stars*/}
                                    <MowStarView
                                        score={item["star"]}/>

                                    {/* vote count text */}
                                    <Text
                                        style={{
                                            marginLeft: 3,
                                            fontSize: hp("1.5%"),
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.textColor,
                                            fontFamily: fontFamily.regular,
                                        }}>

                                        {"("}{item["voteCount"]}{")"}

                                    </Text>

                                </View>

                                {/* price & discount view */}
                                {
                                    item["discountRate"]

                                        ?

                                        <View
                                            style={{flexDirection: "row", marginTop: 3, alignItems: "center"}}>

                                            {/* discount rate view */}
                                            <View
                                                style={{
                                                    backgroundColor: mowColors.mainColor,
                                                    borderRadius: 5,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: hp("5%"),
                                                    height: hp("5%")
                                                }}>

                                                <Text
                                                    style={{
                                                        fontSize: hp("2%"),
                                                        fontWeight: "bold",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: "#ffffff"
                                                    }}>

                                                    {item["discountRate"]}

                                                </Text>

                                            </View>

                                            {/* price view */}
                                            <View
                                                style={{marginLeft: 10, marginTop: 3}}>

                                                {/* first price text view  */}
                                                <View
                                                    style={{alignItems: "center", justifyContent: "center"}}>

                                                    {/* first price text */}
                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.8%"),
                                                            fontWeight: "300",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: mowColors.textColor,
                                                            fontFamily: fontFamily.light
                                                        }}>

                                                        {item["currency"]}{item["firstPrice"]}

                                                    </Text>

                                                    <View
                                                        style={{
                                                            backgroundColor: mowColors.mainColor,
                                                            width: "100%",
                                                            height: hp("0.1%"),
                                                            position: "absolute",
                                                        }}/>

                                                </View>

                                                {/* last price text */}
                                                <Text
                                                    style={{
                                                        fontSize: hp("2%"),
                                                        fontWeight: "bold",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "center",
                                                        color: mowColors.mainColor,
                                                        fontFamily: fontFamily.bold
                                                    }}>

                                                    {item["currency"]}{item["lastPrice"]}

                                                </Text>

                                            </View>

                                        </View>

                                        :

                                        <Text
                                            style={{
                                                fontSize: hp("2%"),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.titleTextColor,
                                                marginTop: 5,
                                                fontFamily: fontFamily.bold
                                            }}>

                                            {item["currency"]}{item["lastPrice"]}

                                        </Text>
                                }

                            </View>

                            {/* add to cart button */}
                            <MowButtonBasic
                                textStyle={{color: mowColors.textColor}}
                                containerStyle={{marginBottom: 5, borderColor: mowColors.textColor}}
                                type={"success"}
                                size={"small"}
                                filled={false}>

                                {mowStrings.button.addToCart}

                            </MowButtonBasic>

                        </View>

                    )}
                />

            </MowContainer>

        )

    }

}