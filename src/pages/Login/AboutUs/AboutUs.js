import React from "react";
import {View, Image, Text} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class AboutUs extends React.Component {

    render() {

        return(

            <MowContainer
                title={mowStrings.drawerMenu.aboutUs}>

                <View
                    style={{...pageContainerStyle, alignItems: "center"}}>

                    {/* banner image */}
                    <Image
                        source={{uri: 'https://thenextweb.com/wp-content/blogs.dir/1/files/2015/04/BauBnb.jpg'}}
                        resizeMode={"contain"}
                        style={{width: "100%", height: hp(30)}}/>

                    {/* content text */}
                    <Text
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp(1.8),
                            fontWeight: "normal",
                            marginTop: 20,
                            paddingHorizontal: 5
                        }}>

PET INNOVATIONS PRIVATE LIMITED is a registered company under Ministry of Corporate Affairs (MCA) bearing CIN: U74999TG2019PTC136667. PET INNOVATIONS PRIVATE LIMITED is a 0.6 Years old Private incorporated in the year 2019.

The Paid-Up Capital of PET INNOVATIONS PRIVATE LIMITED is ₹1.00 Lakhs and is authorized to raise capital up to ₹1.00 Lakhs excluding premium.

PET INNOVATIONS PRIVATE LIMITED is Active company as on 16-12-2019 as per MCA.

                    </Text>

                </View>

            </MowContainer>

        )

    }

}