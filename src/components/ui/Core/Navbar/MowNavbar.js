import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {withNavigation} from "react-navigation";
import {navbarHeight} from "../../../../values/Constants/MowConstants";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {mowColors} from "../../../../values/Colors/MowColors";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {fontFamily} from "../../../../values/Styles/MowStyles";

const MowNavbar = props => {

        const navigation = useNavigation();

        return (

            <View
                style={{
                    height: navbarHeight,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'row',
                    zIndex: 999,
                    backgroundColor: mowColors.navBarColor,
                }}>

                {/* back button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack(null)}
                    style={{
                        flex: 1.5,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 5,
                    }}>

                    <FAIcon
                        style={{fontSize: hp("4%")}}
                        color={"white"}
                        name={'angle-left'}/>

                </TouchableOpacity>

                {/* page title */}
                <Text
                    style={{
                        flex: 7,
                        fontSize: hp("2%"),
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: fontFamily.bold
                    }}>

                    {props.title}

                </Text>

                {/* user button */}
                <TouchableOpacity
                    onPress={() => {navigation.openDrawer()}}
                    style={{flex: 1.5, alignItems: "center"}}>

                    <FAIcon
                        style={{fontSize: hp("3%")}}
                        color={"white"}
                        name={'bars'}/>

                </TouchableOpacity>

            </View>

        );
    }

export default (MowNavbar);