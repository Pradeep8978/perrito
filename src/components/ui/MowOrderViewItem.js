import React from "react";
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {borderStyle} from "../../values/Styles/MowStyles";
import {mowColors} from "../../values/Colors/MowColors";
import moment from 'moment'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
// import {withNavigation} from "react-navigation";
import { useNavigation } from '@react-navigation/native';

const MowOrderViewItem = (props) => {

    // static propTypes = {
    //     product: PropTypes.object,
    //     key: PropTypes.number,
    //     opacity: PropTypes.bool
    // };

    const orderStyle = {
        icon: {
            color: mowColors.mainColor,
            fontSize: hp("2.5%")
        }
    };

        const value = props.product;
        const navigation = useNavigation();
        return(

            <TouchableOpacity
                onPress={() => {navigation.navigate("OrderDetail", {product: value})}}
                style={{
                    marginHorizontal: wp("5%"),
                    marginVertical: hp("1%"),
                    backgroundColor: mowColors.categoryBGColor,
                    flexDirection: "row",
                    padding: 10,
                    ...borderStyle,
                    borderWidth: 1.5
                }}
                key={props.key}>

                {/* product image */}
                <View
                    style={{flex: 1, alignItems: "center", justifyContent: "center"}}>

                    <Image
                        source={value["image"]}
                        resizeMode={"contain"}
                        style={{height: hp("8%"), width: hp("8%"), borderRadius: 10}}/>

                    {
                        props.opacity &&

                            <View
                                style={{
                                    width: "110%",
                                    height: "110%",
                                    position: "absolute",
                                    backgroundColor: "rgb(238, 238, 238)",
                                    zIndex: 1,
                                    borderRadius: 10,
                                    opacity: 0.83,
                                }}/>
                    }

                    {
                        value["quantity"] > 1 &&

                            <View
                                style={{
                                    position: "absolute",
                                    backgroundColor: "grey",
                                    right: wp(-4),
                                    borderRadius: 100,
                                    width: hp(3.5),
                                    height: hp(3.5),
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>

                                <Text
                                    style={{fontSize: hp(1.6), color: "white", fontWeight: "500"}}>

                                    +{value["quantity"]}

                                </Text>

                            </View>
                    }

                </View>

                <View
                    style={{marginLeft: wp(7), flex: 2}}>

                    {/* date text */}
                    <Text
                        style={{
                            fontSize: hp("1.7%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: mowColors.textColor
                        }}>

                        {value.name}

                    </Text>

                    {/* time text */}
                    <Text
                        style={{
                            fontSize: hp("1.7%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: mowColors.titleTextColor
                        }}>

                        {value["daytime"]}

                    </Text>

                    {/* delivery info view */}
                    <View
                        style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 3}}>

                        {
                            value["delivery"] &&

                            <FeatherIcon
                                name={"truck"}
                                style={[orderStyle.icon]}/>
                        }

                        {
                            value["complete"] &&

                            <FeatherIcon
                                name={"check-circle"}
                                style={[orderStyle.icon, {color: "#65b707"}]}/>
                        }

                        {
                            value["cancel"] &&

                            <FeatherIcon
                                name={"x-circle"}
                                style={orderStyle.icon}/>
                        }

                        {
                            value["return"] &&

                            <FeatherIcon
                                name={"x-circle"}
                                style={orderStyle.icon}/>
                        }

                        {/* order situation */}
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: hp("1.4%"),
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {value["productInfo"]}

                        </Text>

                    </View>

                </View>

                <View
                    style={{flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>

                    <Text
                        style={{
                            fontSize: hp("1.5%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: props.opacity ? "#b6babe" : "#48bb20"
                        }}>

                        {value["currency"]}{value["price"]}

                    </Text>

                    <View
                        style={{
                            backgroundColor: "#b6babe",
                            width: hp("4%"),
                            height: hp("4%"),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 100,
                            marginLeft: 20
                        }}>

                        <FeatherIcon
                            style={{fontSize: hp("2%"), color: "white"}}
                            name={"arrow-right"}/>

                    </View>

                </View>

            </TouchableOpacity>

        )
                    }

export default MowOrderViewItem;