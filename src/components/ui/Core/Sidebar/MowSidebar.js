import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, ScrollView, Image} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {mowColors} from "../../../../values/Colors/MowColors";
import {User} from "../../../utils/User/User";
import {setLogin} from "../../../../pages/Router";
import MowStatusBar from "../StatusBar/MowStatusBar";
import {fontFamily} from "../../../../values/Styles/MowStyles";
import {connect} from 'react-redux';

class MowSidebar extends React.Component {

    _handleLogout() {
        // to update user login situation
        new User().setLogin(false);
        // to change router
        setLogin(false);
    }

    render() {
        console.log('SIDE BAR PROPS =>', this.props.profile);

        let nav = this.props.navigation;
        const {profile = {}} = this.props;
        const profileImg = profile.image || require('../../../../assets/image/guest.png');
        return (

            <View
                style={{flex: 1, backgroundColor: mowColors.mainColor}}>

                <MowStatusBar/>

                <View
                    style={{
                        height: hp("11%"),
                        paddingTop: 20,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: wp("5%")
                    }}>

                    <TouchableOpacity
                        onPress={() => nav.navigate('Profile')}
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                        }}>

                        <Image
                            resizeMode={'contain'}
                            source={profileImg}
                            style={{
                                width: hp("8%"),
                                height: hp("8%"),
                            }}/>

                    </TouchableOpacity>

                    <View
                        style={{flex: 3}}>

                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: hp("2%"),
                                fontFamily: fontFamily.medium
                            }}>

                            {profile.name}

                        </Text>

                        <Text
                            style={{
                                color: 'white',
                                fontSize: hp("1.8%"),
                                padding: 3,
                                fontFamily: fontFamily.medium
                            }}>

                            {profile.email}

                        </Text>

                    </View>

                    <TouchableOpacity
                        onPress={() => {this.props.navigation.closeDrawer()}}
                        style={{position: "absolute", top: 20, right: 15}}>

                        <FAIcon
                            style={{color: "white", fontSize: hp("3%")}}
                            name={"times"}/>

                    </TouchableOpacity>

                </View>

                <ScrollView
                    style={{marginTop: hp("3%"), marginBottom: hp("1%")}}>

                    {/* settings button*/}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Settings')}>

                        <FeatherIcon
                            name={"settings"}
                            style={styles.drawerIcon}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.settings}

                        </Text>

                    </TouchableOpacity>

                    {/* profile button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Profile')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"user"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.profile}

                        </Text>

                    </TouchableOpacity>

                    {/* password button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Password')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"lock"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.password}

                        </Text>

                    </TouchableOpacity>

                    {/* favorites button */}
                    {/* <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Favorites')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"heart"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.favorites}

                        </Text>

                    </TouchableOpacity> */}

                    {/* notification button */}
                    {/* <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Notifications')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"bell"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.notification}

                        </Text>

                    </TouchableOpacity> */}

                    {/* cart button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Cart')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"shopping-bag"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.cart}

                        </Text>

                    </TouchableOpacity>

                    {/* feedback button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Feedback')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"message-circle"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.feedback}

                        </Text>

                    </TouchableOpacity>

                    {/* faq button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('FAQ')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"message-square"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.faq}

                        </Text>

                    </TouchableOpacity>

                    {/* customer service button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => {}}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"phone-call"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.customerService}

                        </Text>

                    </TouchableOpacity>

                    {/* privacy button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('Privacy')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"shield"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.privacy}

                        </Text>

                    </TouchableOpacity>

                    {/* about us button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('AboutUs')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"info"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.aboutUs}

                        </Text>

                    </TouchableOpacity>

                    {/* contact us button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => nav.navigate('ContactUs')}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"command"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.contactUs}

                        </Text>

                    </TouchableOpacity>

                    {/* logout button */}
                    <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => {this._handleLogout()}}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"log-out"}/>

                        <Text
                            style={styles.drawerText}>

                            {mowStrings.drawerMenu.logout}

                        </Text>

                    </TouchableOpacity>

                </ScrollView>

                <Image
                    source={require("../../../../assets/logo/logo_with_text.png")}
                    resizeMode={"contain"}
                    style={{
                        marginBottom: hp("3%"),
                        alignSelf: "center",
                        width: wp("40%"),
                        height: hp("5%")
                    }}/>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.auth.profile
})

export default connect(mapStateToProps)(MowSidebar);

const styles = StyleSheet.create({
    drawerIcon:{
        flex: 2,
        fontSize: hp("2.5%"),
        color: 'white',
        textAlign: "center"
    },
    drawerText:{
        flex: 8,
        fontSize: hp("2%"),
        color: 'white',
        marginLeft: 5,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        fontFamily: fontFamily.medium
    },
    drawerItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: hp("1.5%"),
        marginVertical: hp("2%"),
        marginLeft: wp("5%"),
    }
});