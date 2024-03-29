import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import WomanClothing from "../../../sampleData/WomanClothing";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {MowStarView} from "../../../components/ui/Common/StarView/MowStarView";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {MowPicker} from "../../../components/ui/Common/Picker/MowPicker";
import {platform} from "../../../values/Constants/MowConstants";
import {borderStyle, fontFamily, paginationStyle} from "../../../values/Styles/MowStyles";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {_showToast} from "../../../components/ui/Common/Toast/MowToast";

let pickerSortData = [
    {id: 4, title: mowStrings.picker.sort.lowestPrice},
    {id: 5, title: mowStrings.picker.sort.highestPrice},
    {id: 6, title: mowStrings.picker.sort.topRated},
    {id: 7, title: mowStrings.picker.sort.highestScore},
    {id: 8, title: mowStrings.picker.sort.lowestScore},
    {id: 1, title: mowStrings.picker.sort.smartSorting},
    {id: 2, title: mowStrings.picker.sort.bestSeller},
    {id: 3, title: mowStrings.picker.sort.newest}
];

let self;

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pickerVisible: false,
            pickerSelectedId: null,
            productList: [],
            productListKey: 0,
            boxView: true,
            activeIndex: 0,
            activeSlide: []
        };

        self = this;
    }


    componentDidMount() {
        // to set all active index as 0
        let arr = [];
        let length = WomanClothing.length;
        for (let i = 0; i < length; i++){
            arr[i] = 0;
        }
        this.setState({activeSlide: arr});
    }

    static getDerivedStateFromProps(props, state){
        if(props.productList.length && !state.productList.length){
            return{
                productList: props.productList
            }
        }
    }

    // to handle (sort) picker selection
    _onSelect(selectedItem) {

        /**
         * id --> selected item id for sorting
         *
         *      1 --> according to the smart sorting
         *      2 --> according to the best seller
         *      3 --> according to the newest value
         *      4 --> according to the price (lowest -> highest)
         *      5 --> according to the price (highest -> lowest)
         *      6 --> according to the top rate
         *      7 --> according to the score (highest -> lowest)
         *      8 --> according to the score (lowest -> highest)
         *
         * */

        let id = selectedItem["id"];

        // selected id control
        switch (id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                this._increaseSort("lastPrice");
                break;
            case 5:
                this._decreaseSort("lastPrice");
                break;
            case 6:
                this._decreaseSort("voteCount");
                break;
            case 7:
                this._decreaseSort("star");
                break;
            case 8:
                this._increaseSort("star");
                break;
        }

        // to update selected id & picker visibility
        this.setState({
            pickerSelectedId: id,
            pickerVisible: false
        })

    }

    // ascending order according to the key
    _increaseSort(productKey) {
        let products = this.state.productList;

        // to sort and update the product array
        products = products.sort((a,b) => parseFloat(a[productKey]) - parseFloat(b[productKey]));

        // to update list
        this.setState({productList: products, productListKey: this.state.productListKey});
    }

    // descending order according to the key
    _decreaseSort(productKey) {
        let products = this.state.productList;

        // to sort and update the product array
        products = products.sort((a,b) => parseFloat(b[productKey]) - parseFloat(a[productKey]));

        // to update list
        this.setState({productList: products, productListKey: this.state.productListKey});
    }

    _renderImages ({item, index}) {
        console.log('REENDER IMAGE =>', item);
        return (
            <TouchableOpacity
                onPress={() => {self.props.navigation.navigate("ProductDetail", {product: self.state.productList[index]})}}
                key={index}>

                <Image
                    style={{height: "100%", width: "100%", borderRadius: 10}}
                    resizeMode={"stretch"}
                    source={{uri:item}}/>

            </TouchableOpacity>
        );
    }

    _addToCart(product) {
        _showToast.success(mowStrings.productAdded);
        this.props.addProductToCart(product);
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

    onClickProduct = (product) => {
       this.props.preserveProductDetails(product);
       this.props.navigate.navigation('ProductDetail');
    }

    isExistCart = (item) => {
        const {cartItems} = this.props;
        const isExist = cartItems.find(o => o._id === item._id);
        return isExist;
    }

    render() {
        const {loading, error} = this.props;
        return(

            <MowContainer
                title={'Products'}>

                {/* filter view */}
                <View
                    style={{
                        marginVertical: hp("2%"),
                        marginHorizontal: wp("3%"),
                        borderRadius: 5,
                        backgroundColor: mowColors.filterHeaderBG,
                        padding: 10,
                        flexDirection: "row",
                    }}>

                    {/* icon view */}
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({boxView: !this.state.boxView, productListKey: this.state.productListKey + 1});

                        }}
                        style={{justifyContent: "center", alignItems: "center", flex: 2}}>

                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                                flex: 1,
                                height: "100%",
                            }}
                            name={!this.state.boxView ? "th-large" : "list"}/>

                    </TouchableOpacity>

                    {/* vertical line view */}
                    <View
                        style={{
                            width: 1,
                            height: "100%",
                            backgroundColor: "#a4a4a4",
                        }}/>

                    {/* order by view */}
                    <TouchableOpacity
                        onPress={() => {this.setState({pickerVisible: true})}}
                        style={{flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center"}}>

                        {/* order icon */}
                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                            }}
                            name={"sort"}/>

                        {/* order text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: mowColors.textColor,
                                marginLeft: 5,
                                fontFamily: fontFamily.light
                            }}>

                            {mowStrings.products.orderBy}

                        </Text>

                    </TouchableOpacity>

                    {/* vertical line view */}
                    <View
                        style={{
                            width: 1,
                            height: "90%",
                            backgroundColor: "#a4a4a4",
                        }}/>

                    {/* filter view */}
                    <TouchableOpacity
                        style={{flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center"}}
                        onPress={() => {this.props.navigation.navigate("Filter");}}>

                        {/* order icon */}
                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                            }}
                            name={"filter"}/>

                        {/* order text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: mowColors.textColor,
                                marginLeft: 5,
                                fontFamily: fontFamily.light
                            }}>

                            {mowStrings.products.filter}

                        </Text>

                    </TouchableOpacity>

                </View>

                {/* product list */}
                { loading ? 
                <ActivityIndicator color={mowColors.mainColor} style={{flex: 1}} size={35}/> :
                    this.state.boxView

                        ?

                        // box view
                        <View
                            style={{flex: 1}}>

                            <FlatList
                                key={this.state.productListKey}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                style={{paddingHorizontal: wp("3%")}}
                                data={this.state.productList}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{margin: 5, flex: 1}}>
                                        <TouchableOpacity onPress={this.onClickProduct}>
                                        {/* image view */}
                                        <View
                                            style={{
                                                height: platform === "android" ? hp("25") : hp("21"),
                                                width: "100%",
                                                borderRadius: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                                style={{position: "absolute", top: 10, right: 10, zIndex: 99}}>

                                                <FAIcon
                                                    style={{
                                                        color: "grey",
                                                        fontSize: hp("2%")
                                                    }}
                                                    name={"heart"}/>

                                            </TouchableOpacity>

                                            {/* didn't use swiper, because multiple swiper causes android ui problem */}
                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => {this._carousel = c}}
                                                data={item["images"]}
                                                onSnapToItem={(activeSlide) => this._handleActiveSlide(activeSlide, index)}
                                                sliderWidth={wp("45%")}
                                                itemWidth={wp("45%")}
                                                // hideIndicators={true}
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
                                                !item["count"] &&

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

                                                {item["name"]}

                                            </Text>

                                            {/* star view */}
                                            <View
                                                style={{flexDirection: "row", alignItems: "center", marginTop: 1}}>

                                                {/* stars*/}
                                                <MowStarView
                                                    score={item["star"] || 5}/>

                                                {/* vote count text */}
                                                {/* <Text
                                                    style={{
                                                        marginLeft: 3,
                                                        fontSize: hp("1.5%"),
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.textColor,
                                                        fontFamily: fontFamily.regular,
                                                    }}>

                                                    {"("}{item["voteCount"]}{")"}

                                                </Text> */}

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
                                                                backgroundColor: mowColors.successColor,
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

                                                                    {'₹ '}{item["price"]}

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
                                                                    color: mowColors.titleTextColor,
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

                                                        {'₹ '}{item["price"]}

                                                    </Text>
                                            }

                                        </View>
                                        </TouchableOpacity>
                                        {/* add to cart button */}
                                        <MowButtonBasic
                                            disabled={this.isExistCart(item)}
                                            onPress={() => {this._addToCart(item)}}
                                            containerStyle={{marginBottom: 20, marginTop: 0, borderColor: this.isExistCart(item) ? mowColors.textColor :  mowColors.mainColor}}
                                            textStyle={{color: this.isExistCart(item) ? mowColors.textColor :  mowColors.mainColor}}
                                            type={"success"}
                                            size={"small"}
                                            filled={false}>

                                            {mowStrings.button[this.isExistCart(item) ? 'addedToCart' : 'addToCart']}

                                        </MowButtonBasic>

                                    </View>

                                )}
                            />

                        </View>

                        :

                        // list view
                        <View
                            style={{flex: 1}}>

                            <FlatList
                                key={this.state.productListKey}
                                keyExtractor={(item, index) => index.toString()}
                                style={{paddingHorizontal: wp("3%")}}
                                data={this.state.productList}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{margin: 5, marginVertical: 8, flex: 1, flexDirection: "row", ...borderStyle, height: hp(14), width: "98%", borderRadius: 10}}>

                                        {/* image view */}
                                        <View
                                            style={{
                                                marginRight: 10,
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                                style={{position: "absolute", top: 5, right: 5, zIndex: 99}}>

                                                <FAIcon
                                                    style={{color: "grey", fontSize: hp("1.5%")}}
                                                    name={"heart"}/>

                                            </TouchableOpacity>

                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => {this._carousel = c}}
                                                data={item["images"]}
                                                sliderWidth={wp("30%")}
                                                itemWidth={wp("30%")}
                                                renderItem={this._renderImages}/>

                                            {
                                                item["new"] &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: mowColors.mainColor,
                                                        top: 5,
                                                        left: 5,
                                                        borderRadius: 200,
                                                        width: hp("3.2%"),
                                                        height: hp("3.2%"),
                                                        justifyContent: "center"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#ffffff",
                                                            fontSize: hp(1.3)
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

                                        {/* info view */}
                                        <View>

                                            <View
                                                style={{height: hp(8)}}>

                                                {/* title text */}
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        marginTop: 1,
                                                        fontSize: hp("1.6%"),
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
                                                        width={hp(8)}
                                                        height={hp(1.5)}
                                                        score={item["star"]}/>

                                                    {/* vote count text */}
                                                    <Text
                                                        style={{
                                                            marginLeft: 3,
                                                            fontSize: hp("1.3%"),
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: mowColors.textColor,
                                                            fontFamily: fontFamily.regular
                                                        }}>

                                                        {"("}{item["voteCount"]}{")"}

                                                    </Text>

                                                </View>

                                                {/* price & discount view */}
                                                {
                                                    item["discountRate"]

                                                        ?

                                                        <View
                                                            style={{flexDirection: "row", marginTop: 1, alignItems: "center"}}>

                                                            {/* discount rate view */}
                                                            <View
                                                                style={{
                                                                    backgroundColor: mowColors.successColor,
                                                                    borderRadius: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: wp("9%"),
                                                                    height: hp("3.5%")
                                                                }}>

                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.6%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "left",
                                                                        color: "#ffffff",
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item["discountRate"]}

                                                                </Text>

                                                            </View>

                                                            {/* price view */}
                                                            <View
                                                                style={{marginLeft: 10}}>

                                                                {/* first price text view  */}
                                                                <View
                                                                    style={{alignItems: "center", justifyContent: "center"}}>

                                                                    {/* first price text */}
                                                                    <Text
                                                                        style={{
                                                                            fontSize: hp("1.5%"),
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
                                                                            backgroundColor: mowColors.textColor,
                                                                            width: "100%",
                                                                            height: hp("0.1%"),
                                                                            position: "absolute",
                                                                        }}/>

                                                                </View>

                                                                {/* last price text */}
                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.7%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "center",
                                                                        color: mowColors.titleTextColor,
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item["currency"]}{item["lastPrice"]}

                                                                </Text>

                                                            </View>

                                                        </View>

                                                        :

                                                        <Text
                                                            style={{
                                                                fontSize: hp("1.8%"),
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                textAlign: "left",
                                                                color: mowColors.titleTextColor,
                                                                marginTop: 5,
                                                                fontFamily: fontFamily.bold
                                                            }}>

                                                            {item["currency"]}{item["lastPrice"]}

                                                        </Text>
                                                }

                                            </View>

                                            <View
                                                style={{width: wp(25), marginTop: hp(0.5)}}>

                                                {/* add to cart button */}
                                                <MowButtonBasic
                                                    containerStyle={{marginBottom: 0, marginTop: 10, borderColor: mowColors.textColor}}
                                                    textStyle={{color: mowColors.textColor}}
                                                    onPress={() => {this._addToCart(item)}}
                                                    type={"success"}
                                                    size={"xSmall"}
                                                    filled={false}>

                                                    {mowStrings.button.addToCart}

                                                </MowButtonBasic>

                                            </View>

                                        </View>

                                    </View>

                                )}
                            />

                        </View>

                }

                <MowPicker
                    key={2}
                    pickerTitle={mowStrings.products.orderBy}
                    selectedValue={this.state.pickerSelectedId}
                    onSelect={(obj) => {this._onSelect(obj)}}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.pickerVisible}
                    onClosed={() =>{this.setState({pickerVisible: false})}}
                    data={pickerSortData}/>

            </MowContainer>

        )

    }

}
