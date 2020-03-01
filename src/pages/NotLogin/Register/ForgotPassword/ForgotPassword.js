import React from "react";
import {Text, View} from "react-native";
import MowForwardBack from "../../../../components/ui/Core/Navbar/MowForwardBack";
import {pageContainerStyle} from "../../../../values/Styles/MowStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {mowColors} from "../../../../values/Colors/MowColors";
import MowContainer from "../../../../components/ui/Core/Container/MowContainer";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../../components/ui/Common/Button/MowButton";

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
        }
    }

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    render() {

        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{backgroundColor: mowColors.mainColor}}>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* top navigation button area */}
                    <MowForwardBack
                        leftOnPress={() => this.props.navigation.goBack()}
                        left={true}/>

                    <View
                        style={{...pageContainerStyle, marginTop: hp("3%")}}>

                        <Text
                            style={{
                                fontSize: hp(3),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "center",
                                color: "#ffffff",
                                marginBottom: hp(5)
                            }}>

                            {mowStrings.forgotPasswordScreen.title}

                        </Text>

                        {/* email view */}
                        <View
                            style={{...pageContainerStyle, marginVertical: 10}}>

                            {/* email title text */}
                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#ffffff"
                                }}>

                                {mowStrings.placeholder.email}*

                            </Text>

                            {/* email input */}
                            <MowInput
                                containerStyle={{
                                    backgroundColor: "transparent",
                                    orderStyle: "solid",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ffffff",
                                    width: "100%"
                                }}
                                textInputStyle={{
                                    fontSize: hp("2.2%"),
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#ffffff",
                                    width: "85%"
                                }}
                                onChangeText={value => this.onChangeText("email", value)}/>

                        </View>

                        <MowButtonBasic
                            onPress={() => this.props.navigation.navigate("ExtraSecurity")}
                            style={{marginTop: hp("3%")}}
                            containerStyle={{marginTop: hp("5%")}}
                            textStyle={{color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0}}
                            type={"default"}>

                            {mowStrings.button.submit}

                        </MowButtonBasic>

                    </View>

                </KeyboardAwareScrollView>

            </MowContainer>
        )
    }

}