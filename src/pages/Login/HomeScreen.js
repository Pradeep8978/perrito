import React from "react";
import {Text, View, Image, FlatList, TouchableOpacity, ScrollView} from "react-native";
import Swiper from 'react-native-swiper'
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
import BestSeller from "../../sampleData/BestSeller";
import {MowStarView} from "../../components/ui/Common/StarView/MowStarView";
import Advantages from "../../sampleData/Advantages";
import SmartPhones from "../../sampleData/SmartPhones";
import CarAccessories from "../../sampleData/CarAccessories";
import {MowCountDown} from "../../components/ui/Common/CountDown/MowCountDown";
import TrendBrands from "../../sampleData/TrendBrands";

export default class HomeScreen extends React.Component {

    render() {

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
                                    onPress={() => {this.props.navigation.navigate("Categories")}}
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

                    {/* today's best discounts view */}
                    <View
                        style={[categoryStyle, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* trend campaign title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.bestDiscounts}/>

                        {/* today's best discount list */}
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={TodaysBestDiscounts}
                            renderItem={({ item, index }) => (

                                //discount list item
                                <View
                                    style={{
                                        width: wp("35%"),
                                        height: hp("33%"),
                                        marginHorizontal: 10,
                                    }}
                                    key={index}>

                                    {/* image view */}
                                    <View
                                        style={{
                                            height: "60%",
                                            width: "100%",
                                            borderRadius: 10,
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderColor: "rgba(112, 112, 112, 0.16)"
                                        }}>

                                        {/* hearth icon touchable */}
                                        <TouchableOpacity
                                            style={{position: "absolute", top: 5, right: 5, zIndex: 99}}>

                                            <FAIcon
                                                style={{
                                                    color: mowColors.titleTextColor,
                                                    fontSize: hp("2%")
                                                }}
                                                name={"heart"}/>

                                        </TouchableOpacity>

                                        <Image
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            resizeMode={"contain"}
                                            source={item["image"]}/>

                                    </View>

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
                                        }}>

                                        {item["title"]}

                                    </Text>

                                    {/* star view */}
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>

                                        {/* stars*/}
                                        <MowStarView
                                            score={item["star"]}/>

                                        {/* vote count text */}
                                        <Text
                                            style={{
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: "#848484",
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View>

                                    {/* price & discount view */}
                                    <View
                                        style={{flexDirection: "row", marginTop: 5, alignItems: "center"}}>

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
                                            style={{marginLeft: 10}}>

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
                                                        color: "#c2c2c2"
                                                    }}>

                                                    {item["firstPrice"]}

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
                                                    marginTop: 1,
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: mowColors.mainColor
                                                }}>

                                                {item["lastPrice"]}

                                            </Text>

                                        </View>

                                    </View>

                                </View>

                            )}
                        />

                    </View>

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
                                <View
                                    style={{
                                        width: wp("35%"),
                                        height: hp("25%"),
                                        marginHorizontal: 10,
                                    }}
                                    key={index}>

                                    {/* image view */}
                                    <View
                                        style={{
                                            height: "60%",
                                            width: "100%",
                                            borderRadius: 10,
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderColor: "rgba(112, 112, 112, 0.16)",
                                            justifyContent: "center"
                                        }}>

                                        {/* hearth icon touchable */}
                                        <TouchableOpacity
                                            style={{position: "absolute", top: 5, right: 5, zIndex: 99}}>

                                            <FAIcon
                                                style={{
                                                    color: mowColors.titleTextColor,
                                                    fontSize: hp("2%")
                                                }}
                                                name={"heart"}/>

                                        </TouchableOpacity>

                                        <Image
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            resizeMode={"contain"}
                                            source={item["image"]}/>

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

                                        {
                                            item["new"] &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: mowColors.mainColor,
                                                        top: 5,
                                                        left: 5,
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

                                    </View>

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
                                        }}>

                                        {item["title"]}

                                    </Text>

                                    {/* star view */}
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", marginTop: 5,}}>

                                        {/* stars*/}
                                        <MowStarView
                                            score={item["star"]}/>

                                        {/* vote count text */}
                                        <Text
                                            style={{
                                                marginLeft: 2,
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor,
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View>

                                    {/* price text */}
                                    <Text
                                        style={{
                                            fontSize: hp("2%"),
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                            marginTop: 5,
                                        }}>

                                        {item["price"]}

                                    </Text>

                                </View>

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
                    <View
                        style={[categoryStyle, {marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* smart phones title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.smartPhones}/>

                        {/* smart phones list */}
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            data={SmartPhones}
                            renderItem={({ item, index }) => (

                                //smart phone list item
                                <View
                                    style={{
                                        height: hp("33%"),
                                        margin: 10,
                                        marginTop: 0,
                                        flex: 1,
                                    }}
                                    key={index}>

                                    {/* image view */}
                                    <View
                                        style={{
                                            height: "60%",
                                            width: "100%",
                                            borderRadius: 10,
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderColor: "rgba(112, 112, 112, 0.16)",
                                            justifyContent: "center"
                                        }}>

                                        {/* hearth icon touchable */}
                                        <TouchableOpacity
                                            style={{position: "absolute", top: 5, right: 5, zIndex: 99}}>

                                            <FAIcon
                                                style={{
                                                    color: mowColors.titleTextColor,
                                                    fontSize: hp("2%")
                                                }}
                                                name={"heart"}/>

                                        </TouchableOpacity>

                                        <Image
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            resizeMode={"contain"}
                                            source={item["image"]}/>

                                        {
                                            item["new"] &&

                                            <View
                                                style={{
                                                    position: "absolute",
                                                    backgroundColor: mowColors.mainColor,
                                                    top: 5,
                                                    left: 5,
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

                                    </View>

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
                                        }}>

                                        {item["title"]}

                                    </Text>

                                    {/* star view */}
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>

                                        {/* stars*/}
                                        <MowStarView
                                            score={item["star"]}/>

                                        {/* vote count text */}
                                        <Text
                                            style={{
                                                marginLeft: 3,
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View>

                                    {/* price & discount view */}
                                    <View
                                        style={{flexDirection: "row", marginTop: 5, alignItems: "center"}}>

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
                                            style={{marginLeft: 10}}>

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
                                                        color: mowColors.textColor
                                                    }}>

                                                    {item["firstPrice"]}

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
                                                    marginTop: 1,
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: mowColors.mainColor
                                                }}>

                                                {item["lastPrice"]}

                                            </Text>

                                        </View>

                                    </View>

                                </View>

                            )}
                        />

                    </View>

                    {/* car accessories view */}
                    <View
                        style={[categoryStyle, {marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor}]}>

                        {/* smart phones title view */}
                        <MowTitleView
                            showButton={false}
                            title={mowStrings.homeScreen.carAccessories}/>

                        {/* car accessories list */}
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            data={CarAccessories}
                            renderItem={({ item, index }) => (

                                //car accessories list item
                                <View
                                    style={{
                                        height: hp("33%"),
                                        margin: 10,
                                        marginTop: 0,
                                        flex: 1,
                                    }}
                                    key={index}>

                                    {/* image view */}
                                    <View
                                        style={{
                                            height: "70%",
                                            width: "100%",
                                            borderRadius: 10,
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderColor: "rgba(112, 112, 112, 0.16)",
                                            justifyContent: "center"
                                        }}>

                                        {/* hearth icon touchable */}
                                        <TouchableOpacity
                                            style={{position: "absolute", top: 5, right: 5, zIndex: 99}}>

                                            <FAIcon
                                                style={{
                                                    color: mowColors.titleTextColor,
                                                    fontSize: hp("2%")
                                                }}
                                                name={"heart"}/>

                                        </TouchableOpacity>

                                        <Image
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            resizeMode={"contain"}
                                            source={item["image"]}/>

                                        {
                                            item["new"] &&

                                            <View
                                                style={{
                                                    position: "absolute",
                                                    backgroundColor: mowColors.mainColor,
                                                    top: 5,
                                                    left: 5,
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

                                    </View>

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
                                            color: mowColors.titleTextColor
                                        }}>

                                        {item["title"]}

                                    </Text>

                                    {/* star view */}
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>

                                        {/* stars*/}
                                        <MowStarView
                                            score={item["star"]}/>

                                        {/* vote count text */}
                                        <Text
                                            style={{
                                                marginLeft: 2,
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View>

                                    {/* price text */}
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontSize: hp("2%"),
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor
                                        }}>

                                        {item["price"]}

                                    </Text>

                                </View>

                            )}
                        />

                    </View>

                </ScrollView>

            </MowContainer>

        );
    }
}
