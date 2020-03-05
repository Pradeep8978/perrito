import React from "react";
import {Text, View, Image, FlatList, TouchableOpacity, ScrollView} from "react-native";
import Swiper from 'react-native-swiper';
import Axios from 'axios';
import {mowColors} from "../../values/Colors/MowColors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import MowContainer from "../../components/ui/Core/Container/MowContainer";
import {mowStrings} from "../../values/Strings/MowStrings";
import {MowTitleView} from "../../components/ui/MowTitleView";
import {categoryStyle, fontFamily, gPadding} from "../../values/Styles/MowStyles";
import TrendCategories from "../../sampleData/TrendCategories";
import TrendCampaign from "../../sampleData/Campaign/TrendCampaign";
import {MowButtonBasic} from "../../components/ui/Common/Button/MowButton";
import FAIcon from "react-native-vector-icons/FontAwesome";
import TodaysBestDiscounts from "../../sampleData/TodaysBestDiscounts";
// import BestSeller from "../../sampleData/BestSeller";
import {MowStarView} from "../../components/ui/Common/StarView/MowStarView";
import Advantages from "../../sampleData/Advantages";
// import SmartPhones from "../../sampleData/SmartPhones";
import CarAccessories from "../../sampleData/CarAccessories";
import {MowCountDown} from "../../components/ui/Common/CountDown/MowCountDown";
import TrendBrands from "../../sampleData/TrendBrands";
import { API_BASE_URL } from "../../constants/config";
import CategoryTile from "./CategoryTile";
import ProductTile from "./ProductTile";

export default class HomeScreen extends React.Component {

    state = {
        BestSeller: []
    }

    componentDidMount(){
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
        Axios.get(url)
        .then(res => {
            this.setState({
                BestSeller: res.data
            })
        })
    }

    fetchProductsByCategory = (searchStr, category) => {
        const url = `${API_BASE_URL}/products/list?search=${searchStr}`;
        Axios.get(url)
        .then(res => {
            this.setState({
                [category]: res.data.filter((o,i)=>i<4)
            })
        })
    }
    
    onSelectProduct = (product) => {
        this.props.preserveProductDetails(product);
        this.props.navigation.navigate("ProductDetail");
    }

    onClickProductCategory = (type) => {
        this.props.fetchProducts(type);
        this.props.navigation.navigate("ProductList")
    }

    render() {
        const {BestSeller, Food} = this.state;
        return (

            <MowContainer
                footerActiveIndex={1}
                navbar={false}>

                    {/* home screen navbar */}
                    <View
                        style={[{paddingHorizontal:gPadding, paddingTop: 10, backgroundColor: mowColors.mainColor}]}>

                        <View
                            style={{
                                width:"100%",
                                alignSelf:"center",
                                alignItems:"center",
                                justifyContent:"center",
                            }}>

                            {/* logo with text */}
                            <Image
                                source={require("../../assets/logo/logo_with_text.png")}
                                style={{ height: hp("3%")}}
                                resizeMode={"contain"}/>

                        </View>

                    </View>

                    {/* search view */}
                    <View
                        style={{backgroundColor: mowColors.mainColor, paddingHorizontal: gPadding, alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingBottom: hp(1)}}>

                        {/* search button */}
                        <MowButtonBasic
                            onPress={() => {this.props.navigation.navigate("HomeFilter")}}
                            containerStyle={{width: "85%", alignSelf: "flex-end", borderRadius: 30, height: hp("5%")}}
                            textStyle={{padding: 0, margin: 0, color: "#aeaeae", fontSize: hp("1.6%"), fontFamily: fontFamily.light, fontStyle: "normal", letterSpacing: 0, textAlign: "left"}}
                            leftIconStyle={{color: "#aeaeae"}}
                            leftIcon={"search"}>

                            {mowStrings.search}

                        </MowButtonBasic>

                        {/* drawer button */}
                        <TouchableOpacity
                            onPress={() => {this.props.navigation.openDrawer()}}
                            style={{height: hp("3%"), width: hp("3%")}}>

                            <FAIcon
                                style={{color: "white", fontSize: hp("3%")}}
                                name={"bars"}/>

                        </TouchableOpacity>

                    </View>


                <ScrollView>

                    {/* trend categories view */}
                    <View
                        style={[categoryStyle, {paddingBottom: hp(2), backgroundColor: mowColors.categoryBGColor}]}>

                        {/* trend categories title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.trendCategories}/>

                        {/* trend categories horizontal list */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={TrendCategories}
                            renderItem={({ item, index }) => (

                                // category item touchable
                                <TouchableOpacity
                                    onPress={() => this.onClickProductCategory(item.title)}
                                    style={{backgroundColor: mowColors.mainColor, borderRadius: 10, width: hp("12%"), height: hp("12%"), marginRight: 10, justifyContent: "center", alignItems: "center"}}
                                    key={index}>

                                    {/* category image */}
                                    <Image
                                        style={{width: hp("7%"), height: hp("7%")}}
                                        source={item["image"]}
                                        resizeMode={"contain"}/>

                                    {/* category text */}
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontSize: hp("1.4%"),
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "center",
                                            color: "#ffffff"
                                        }}>

                                        {item["title"]}

                                    </Text>

                                </TouchableOpacity>

                            )}
                        />
                    </View>

                    {/* trend campaign view */}

    
                    {/* trend brands view */}
                    <View
                        style={[categoryStyle, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* trend brands title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.trendBrands}/>

                        {/* trend brands horizontal list */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={TrendBrands}
                            renderItem={({ item, index }) => (

                                // trend brands item touchable
                                <TouchableOpacity
                                    style={{
                                        width: wp("30%"),
                                        height: hp("8%"),
                                        justifyContent: "center",
                                        backgroundColor: "transparent",
                                        borderStyle: "solid",
                                        borderWidth : 1,
                                        borderColor: "rgba(146, 146, 146, 0.41)",
                                        borderRadius: 5,
                                        marginHorizontal: 10,
                                        marginVertical: 5,
                                        alignItems: "center",
                                    }}
                                    key={index}>

                                    {/* brand image */}
                                    <Image
                                        style={{width: wp("20%"), height: hp("6%")}}
                                        source={item["image"]}
                                        resizeMode={"contain"}/>

                                </TouchableOpacity>

                            )}
                        />

                    </View>

                    {/* best seller view */}
                    <View
                        style={[categoryStyle, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* best seller title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.bestSeller}/>

                        {/* today's best discount list */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={BestSeller}
                            renderItem={({ item, index }) => (
                                //best seller list item
                                <ProductTile item={item} index={index} onSelectProduct={this.onSelectProduct}/>
                            )}
                        />

                    </View>

                    {/* advantages view */}
                    <View
                        style={[categoryStyle, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* advantages title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.advantages}/>

                        {/* advantages horizontal list */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={Advantages}
                            renderItem={({ item, index }) => (

                                // advantage item view
                                <View
                                    style={{
                                        width: hp("12%"),
                                        height: hp("11%"),
                                        marginRight: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>

                                    {/* advantage view */}
                                    <View
                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: mowColors.mainColor,
                                            width: "100%",
                                            height: hp("8%"),
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        key={index}>

                                        {/* advantage image */}
                                        <Image
                                            style={{width: hp("6%"), height: hp("6%")}}
                                            source={item["image"]}
                                            resizeMode={"contain"}/>

                                    </View>

                                    {/* advantage text */}
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontSize: hp("1.4%"),
                                            fontWeight: "normal",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "center",
                                            color: mowColors.textColor
                                        }}>

                                        {item["title"]}

                                    </Text>

                                </View>

                            )}
                        />

                    </View>
                    {/* smart phones view */}
                    <CategoryTile title={mowStrings.homeScreen.food} data={Food} onSelectProduct={this.onSelectProduct}/>
                    <CategoryTile title={mowStrings.homeScreen.toys} data={Food} onSelectProduct={this.onSelectProduct}/>
                    <CategoryTile title={mowStrings.homeScreen.accessories} data={Food} onSelectProduct={this.onSelectProduct}/>
                    <CategoryTile title={mowStrings.homeScreen.grooming} data={Food} onSelectProduct={this.onSelectProduct}/>
                    <CategoryTile title={mowStrings.homeScreen.health} data={Food} onSelectProduct={this.onSelectProduct}/>
                    <CategoryTile title={mowStrings.homeScreen.bath} data={Food} onSelectProduct={this.onSelectProduct}/>

                </ScrollView>

            </MowContainer>

        );
    }
}
