import React from "react";
import {Text, View, Image, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {mowColors} from "../../values/Colors/MowColors";
import {categoryStyle, fontFamily, gPadding} from "../../values/Styles/MowStyles";
import {MowTitleView} from "../../components/ui/MowTitleView";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {MowStarView} from "../../components/ui/Common/StarView/MowStarView";
import { API_BASE_URL } from "../../constants/config";

const ProductTile = props => {
    const {item, index, onSelectProduct} = props;
    console.log('HEROKU IMAGES =>', item.images)
    const imageUrl = `${API_BASE_URL}/${item.images[0]}`;
    return(
   
        <TouchableOpacity
        style={{
            width: wp("35%"),
            height: hp("25%"),
            marginHorizontal: 10,
        }}
        onPress={()=>onSelectProduct(item)}
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
                source={{uri: imageUrl}}/>

            {
                !item.count &&

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

            {item["name"]}

        </Text>

        {/* star view */}
        <View
            style={{flexDirection: "row", alignItems: "center", marginTop: 5,}}>

            {/* stars*/}
            <MowStarView
                score={item["star"] || 5}/>

            {/* vote count text */}
            {/* <Text
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

            </Text> */}

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

            {`₹ ${item["price"]}`}

        </Text>

    </TouchableOpacity>
)
}

export default ProductTile;