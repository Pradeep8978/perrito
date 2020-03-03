import React from "react";
import {Text} from "react-native";
import {User} from "../components/utils/User/User";
import Home from "./NotLogin/Home";
import ForgotPassword from "./NotLogin/Register/ForgotPassword/ForgotPassword";
import ExtraSecurity from "./NotLogin/Register/ForgotPassword/ExtraSecurity";
import ChangePassword from "./NotLogin/Register/ForgotPassword/ChangePassword";
import NormalLogin from "./../containers/login.container";
import Register from "./NotLogin/Register/Register";
import NormalRegister from "./../containers/register.container";
import Verification from "./NotLogin/Register/Verification";


import HomeScreen from "./../containers/home.container";
import MowSidebar from "../components/ui/Core/Sidebar/MowSidebar";
import {deviceWidth} from "../values/Constants/MowConstants";
import Settings from "./Login/Settings/Settings";
import Categories from "./Login/Categories/Categories";
import CategoryDetail from "./Login/Categories/CategoryDetail";
import ProductList from "./../containers/productList.container";
import ProductDetail from "./../containers/productDetails.container";
import Cart from "./../containers/cart.container";
import AddressList from "./Login/Address/AddressList";
import NewAddress from "./Login/Address/NewAddress";
import PaymentInformation from "./Login/CartOperations/PaymentInformation";
import CompleteOrder from "./Login/CartOperations/CompleteOrder";

import OrderList from "./Login/Orders/OrderList";
import Profile from "./../containers/profile.container";
import Password from "./Login/User/Password";
import Favorites from "./Login/Favorites/Favorites";
import OrderDetail from "./Login/Orders/OrderDetail";
import CargoTracking from "./Login/Orders/CargoTracking";
import RateProduct from "./Login/Orders/RateProduct";
import ReturnRequest from "./Login/Orders/ReturnRequest";
import Feedback from "./Login/Feedback/Feedback";
import FAQ from "./Login/FAQ/FAQ";
import Filter from "./Login/Filter/Filter";
import HomeFilter from "./Login/Filter/HomeFilter";
import TrendCampaigns from "./Login/Campaign/TrendCampaigns";
import Notifications from "./Login/Notification/Notifications";
import AboutUs from "./Login/AboutUs/AboutUs";
import Privacy from "./Login/Privacy/Privacy";
import ContactUs from "./Login/ContactUs/ContactUs";


// import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {Provider} from 'react-redux';
import {store} from './../store';
let _self;

const StackOptions = {

    initialRoute: "Home",
    headerMode: "none",
    transparentCard: true,
    cardStyle: {
        backgroundColor: "transparent",
    },
    transitionConfig: () => ({
        containerStyle: {
            backgroundColor: "transparent",
        },
        transitionSpec: {
            duration: 0,
        },
    }),
    navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })

};

const drawerOptions =  {
            drawerContent: props => <MowSidebar {...props} />,
            drawerWidth: deviceWidth,
            drawerStyle: {
                width: deviceWidth,
              }
        }

let user = new User();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
      <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator {...StackOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NormalLogin" component={NormalLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="NormalRegister" component={NormalRegister} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ExtraSecurity" component={ExtraSecurity} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

function DrawerNavigation(){
    return(
        <Provider store={store}>
            <NavigationContainer>
          <Drawer.Navigator {...drawerOptions}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="HomeFilter" component={HomeFilter} />
            <Drawer.Screen name="TrendCampaigns" component={TrendCampaigns} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Categories" component={Categories} />
            <Drawer.Screen name="CategoryDetail" component={CategoryDetail} />
            <Drawer.Screen name="ProductList" component={ProductList} />
            <Drawer.Screen name="ProductDetail" component={ProductDetail} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="CompleteOrder" component={CompleteOrder} />
            <Drawer.Screen name="Filter" component={Filter} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="PaymentInformation" component={PaymentInformation} />
            <Drawer.Screen name="AddressList" component={AddressList} />
            <Drawer.Screen name="NewAddress" component={NewAddress} />
            <Drawer.Screen name="OrderList" component={OrderList} />
            <Drawer.Screen name="OrderDetail" component={OrderDetail} />
            <Drawer.Screen name="CargoTracking" component={CargoTracking} />
            <Drawer.Screen name="RateProduct" component={RateProduct} />
            <Drawer.Screen name="ReturnRequest" component={ReturnRequest} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Password" component={Password} />
            <Drawer.Screen name="Favorites" component={Favorites} />
            <Drawer.Screen name="Feedback" component={Feedback} />
            <Drawer.Screen name="AboutUs" component={AboutUs} />
            <Drawer.Screen name="Privacy" component={Privacy} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="FAQ" component={FAQ} />
          </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

class Router extends React.Component {

    constructor(props)
    {
        super(props);

        _self = this;

        this.state = {
            login: false,
        };

        /**
         * changes all system regular component's fontFamily as 'Quicksand'
         * @type {(function(...[*]))|*}
         */
        let oldRender = Text.render;
        Text.render = function (...args) {
            let origin = oldRender.call(this, ...args);
            return React.cloneElement(origin, {
                style: [{fontFamily: 'Poppins'}, origin.props.style]
            });
        };
    }

    render() {

        // can control here is user login or not, then return related navigator
        const token = store.getState().auth.token;
        const storageToken = new User().getToken();
        console.log('ROUTERE TOKEN =>', storageToken)
        if (token || storageToken)
        {
            return (

                <DrawerNavigation/>
            )
        }
        else {
            return (

                <StackNavigator/>

            )
        }
        // return <StackNavigator/>
    }
}

// to change user login situation from outside
export function setLogin(flag) {
    _self.setState({
        login: flag
    });
}

export default Router;
