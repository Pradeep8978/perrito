import React from "react";
import { Text, View } from "react-native";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowForwardBack from "../../../components/ui/Core/Navbar/MowForwardBack";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { validationConfig } from './validations'
// import {User} from './../../../components/utils/User/User'
// import {setLogin} from "../../../";

let iconColor = "white";

export default class NormalRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                name: "",
                email: "",
                password: "",
            },
            error: "",
            formErrors: {}
        }
    }

    // to store entered regular from user
    onChangeText = (key, value) => {
        const { formValues } = this.state;
        formValues[key] = value;
        this.setState({
            formValues
        })
    };

    validateAllFields = () => {
        const { name, email, phone, password } = this.state;
        const fieldsObj = { name, email, password };
        const formErrors = {};
            Object.keys(fieldsObj).forEach(key => {
                formErrors[key] = validationConfig[key]
            })
    }

    onCreateAccount = () => {
        const {formValues } = this.state
        // console.log("formavalues", formValues)
        console.log('PAYLOAD= >', formValues)
        this.props.signupUser(formValues)
        .then((res)=>{
           new User().setToken(res.data.token);
            setLogin(true);
        })
    }

    render() {

        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{ backgroundColor: mowColors.mainColor }}>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* top navigation button area */}
                    <MowForwardBack
                        leftOnPress={() => this.props.navigation.goBack()}
                        left={true} />

                    <View
                        style={{ ...pageContainerStyle, marginTop: hp("3%") }}>

                        <Text
                            style={{
                                fontSize: hp(3),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "center",
                                color: "#ffffff",
                                marginBottom: hp(8)
                            }}>

                            {mowStrings.signUp}

                        </Text>

                        {/* name view */}
                        <View
                            style={inputStyle.container}>

                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.signUpPage.name}

                            </Text>

                            <MowInput
                                iconColor={iconColor}
                                rightIcon={"check"}
                                containerStyle={inputStyle.inputContainer}
                                textInputStyle={inputStyle.inputText}
                                onChangeText={value => this.onChangeText("name", value)} />

                        </View>

                        {/* username view */}
                        <View
                            style={inputStyle.container}>

                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.signUpPage.username}

                            </Text>

                            <MowInput
                                iconColor={iconColor}
                                rightIcon={"check"}
                                containerStyle={inputStyle.inputContainer}
                                textInputStyle={inputStyle.inputText}
                                onChangeText={value => this.onChangeText("email", value)} />

                        </View>

                        {/* password view */}
                        <View
                            style={inputStyle.container}>

                            {/* title regular */}
                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.signUpPage.password}

                            </Text>

                            <MowInput
                                containerStyle={inputStyle.inputContainer}
                                textInputStyle={inputStyle.inputText}
                                onChangeText={value => this.onChangeText("password", value)}
                                passwordInput={true}
                                iconColor={"white"}
                                rightIcon={"eye"} />

                        </View>

                    </View>

                    <MowButtonBasic
                        onPress={() => { this.onCreateAccount() }}
                        style={{ marginTop: hp("5%") }}
                        containerStyle={{ marginTop: hp("5%") }}
                        textStyle={{ color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0 }}
                        type={"default"}>

                        {mowStrings.button.createAnAccount}

                    </MowButtonBasic>


                </KeyboardAwareScrollView>

            </MowContainer>
        )
    }

}

export const inputStyle = ({
    container: {
        marginVertical: 10
    },
    titleText: {
        fontSize: hp("2%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        opacity: 0.8
    },
    inputContainer: {
        backgroundColor: "transparent",
        orderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff",
        width: "100%"
    },
    inputText: {
        fontSize: hp("2%"),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        width: "85%"
    },
});