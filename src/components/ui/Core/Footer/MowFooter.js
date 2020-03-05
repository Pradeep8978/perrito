import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {withNavigation} from "react-navigation";
import {footerHeight} from "../../../../values/Constants/MowConstants";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import FatherIcon from "react-native-vector-icons/Feather";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {mowColors} from "../../../../values/Colors/MowColors";
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const MowFooter = props => {

    // footer props
    // static propTypes = {
    //     activeIndex: PropTypes.number
    // };

        const navigation = useNavigation();

        return (

            <View
                style={{
                    height: footerHeight,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    flexDirection: "row",
                    backgroundColor: mowColors.footer,
                    shadowColor: "rgba(0, 0, 0, 0.11)",
                    shadowOffset: {
                        width: 0,
                        height: -3
                    },
                    shadowRadius: 4,
                    shadowOpacity: 1,
                    borderTopWidth: 0.5,
                    borderTopColor: "#a1a1a1"
                }}>

                {/* explore button*/}
                <TouchableOpacity
                    onPress={() => {useNavigation().navigate("Home")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"home"}
                        style={[styles.buttonIcon, {color: props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.explore}

                    </Text>

                </TouchableOpacity>

                {/* categories button*/}
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Categories")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"grid"}
                        style={[styles.buttonIcon, {color: props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings._categories}

                    </Text>

                </TouchableOpacity>

                {/* cart button*/}
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Cart")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"shopping-bag"}
                        style={[styles.buttonIcon, {color: props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.cart}

                    </Text>

                </TouchableOpacity>

                {/* orders button*/}
                <TouchableOpacity
                    onPress={() => {navigation.navigate("OrderList")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"box"}
                        style={[styles.buttonIcon, {color: props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.orders}

                    </Text>

                </TouchableOpacity>

            </View>

        );
    }

export default (MowFooter);

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        alignItems: "center",
        height: "100%"
    },
    buttonIcon: {
        marginTop:  hp("1%"),
        fontSize: wp("5.2%"),
    },
    buttonText: {
        fontSize: wp("3.5%"),
        marginTop:  hp("0.5%")
    }
});