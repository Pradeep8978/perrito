import React from "react";
import {Text, View, Image, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {mowColors} from "../../values/Colors/MowColors";
import {categoryStyle, fontFamily, gPadding} from "../../values/Styles/MowStyles";
import {MowTitleView} from "../../components/ui/MowTitleView";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {MowStarView} from "../../components/ui/Common/StarView/MowStarView";
import { API_BASE_URL } from "../../constants/config";

const CategoryTile = props => {
    const {title, data} = props;
    return(
        <View
        style={[categoryStyle, {marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor}]}>

        {/* smart phones title view */}
        <MowTitleView
            showButton={false}
            title={title}/>

        {/* smart phones list */}
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            data={data}
            renderItem={({ item, index }) => (
                //smart phone list item
                <TouchableOpacity
                    style={{
                        height: hp("33%"),
                        margin: 10,
                        marginTop: 0,
                        flex: 1,
                    }}
                    onPress={()=>props.onSelectProduct(item)}
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
                            source={{uri : `${API_BASE_URL}/${item.images[0]}`}}/>
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

                        {item["name"]}

                    </Text>

                    {/* star view */}
                    <View
                        style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>

                        {/* stars*/}
                        <MowStarView
                            score={item["star"] || 4}/>

                        {/* vote count text */}
                        {/* <Text
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

                        </Text> */}

                    </View>

                    {/* price & discount view */}
                    <View
                        style={{flexDirection: "row", marginTop: 5, alignItems: "center"}}>

                        {/* discount rate view */}
                        {/* <View
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

                        </View> */}

                        {/* price view */}
                        <View
                            style={{marginLeft: 10}}>

                            {/* first price text view  */}
                            {/* <View
                                style={{alignItems: "center", justifyContent: "center"}}>

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

                            </View> */}

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

                                {`₹ ${item["price"]}`}

                            </Text>

                        </View>

                    </View>

                </TouchableOpacity>

            )}
        />

    </View>
    )
}

export default CategoryTile;