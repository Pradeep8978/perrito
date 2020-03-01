import React from "react";
import {FlatList, View, Text, TouchableOpacity} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MyOrders from "../../../sampleData/Orders/MyOrders";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MowOrderViewItem from "../../../components/ui/MowOrderViewItem";
import {mowColors} from "../../../values/Colors/MowColors";
import CanceledOrders from "../../../sampleData/Orders/CanceledOrders";
import ReturnedOrders from "../../../sampleData/Orders/ReturnedOrders";

export default class OrderList extends React.Component {

    categoryButtonStyle = {
        parent: {
            flexDirection: "row",
        },
        container: {
            flex: 1,
            marginVertical: 10,
            marginHorizontal: 25,
        },
        button: {

        },
        activeButton: {
            borderBottomWidth: 2,
            borderBottomColor: mowColors.successColor,
            paddingBottom: 5
        },
        text: {
            textAlign: "center",
            fontSize: hp("1.7"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            color: mowColors.titleTextColor
        },
        activeText: {
            textAlign: "center",
            fontSize: hp("1.7"),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            color: mowColors.titleTextColor,
        }
    };

    state = {
        showAll: true,
        canceled: false,
        returned: false,
        orderData: MyOrders
    };

    _handleSelection(showAll, canceled, returned) {
        if (showAll) {
            this.setState({orderData: MyOrders});
        }
        else if (canceled) {
            this.setState({orderData: CanceledOrders});
        }
        else if (returned) {
            this.setState({orderData: ReturnedOrders});
        }
        this.setState({showAll: showAll, canceled: canceled, returned: returned});
    }

    render() {

        return(

            <MowContainer
                footerActiveIndex={4}
                title={mowStrings.orderList.title}>

                <View
                    style={this.categoryButtonStyle.parent}>

                    {/* show all button view */}
                    <View
                        style={this.categoryButtonStyle.container}>

                        {/* show all button */}
                        <TouchableOpacity
                            onPress={() => {this._handleSelection(true, false, false)}}
                            style={this.state.showAll ? this.categoryButtonStyle.activeButton : this.categoryButtonStyle.button}>

                            {/* show all text */}
                            <Text
                                style={this.categoryButtonStyle.text}>

                                {mowStrings.orderList.showAll}

                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* canceled view */}
                    <View
                        style={this.categoryButtonStyle.container}>

                        {/* canceled button */}
                        <TouchableOpacity
                            onPress={() => {this._handleSelection(false, true, false)}}
                            style={this.state.canceled ? this.categoryButtonStyle.activeButton : this.categoryButtonStyle.button}>

                            {/* canceled text */}
                            <Text
                                style={this.categoryButtonStyle.text}>

                                {mowStrings.orderList.canceledProducts}

                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* returned view */}
                    <View
                        style={this.categoryButtonStyle.container}>

                        {/* returned button */}
                        <TouchableOpacity
                            onPress={() => {this._handleSelection(false, false, true)}}
                            style={this.state.returned ? this.categoryButtonStyle.activeButton : this.categoryButtonStyle.button}>

                            {/* returned text */}
                            <Text
                                style={this.categoryButtonStyle.text}>

                                {mowStrings.orderList.returnedProducts}

                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.orderData}
                    renderItem={({ item, index }) => (

                        <View
                            key={index}>

                            {/* title view */}
                            <View
                                style={{backgroundColor: "#aeaeae"}}>

                                {/* title month text */}
                                <Text
                                    style={{
                                        fontSize: hp("1.8%"),
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: "#ffffff",
                                        marginLeft: 20,
                                        paddingVertical: 10
                                    }}>

                                    {Object.keys(item).shift()}

                                </Text>

                            </View>

                            {/* products in the same month */}
                            <View
                                style={{marginVertical: hp("2%")}}>

                                {
                                    item[Object.keys(item).shift()].map((value, key) => {

                                        return (

                                            // product item 
                                            <MowOrderViewItem
                                                opacity={this.state.canceled || this.state.returned}
                                                key={key}
                                                product={value}/>

                                        )
                                    })
                                }

                            </View>

                        </View>

                    )}

                />

            </MowContainer>

        )

    }

}