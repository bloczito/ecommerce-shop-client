import React, { useContext } from 'react';
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import PaymentView from "./views/PaymentView/PaymentView";
import AccountInfoView from "./views/AccountInfoView/AccountInfoView";
import OrdersView from "./views/OrdersView/OrdersView";
import ProductsDetailsView from "./views/ProductsDetailsView/ProductsDetailsView";
import ProductsView from "./views/ProductsView/ProductsView";
import BasketView from "./views/BasketView/BasketView";
import SignInView from "./views/SignInView/SignInView";
import SignUpView from "./views/SignUpView/SignUpView";
import LandingPage from "./views/LandingPage/LandingPage";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import { UserContext } from "./context/UserContext";
import Notification from "./components/Notification/Notification";


const App = () => {

    const {token} = useContext(UserContext)
    return (
        <>
            <Navbar/>
            <Routes>
                {token && (
                    <>
                        <Route path="/payment" element={<PaymentView/>}/>
                        <Route path="/account" element={<AccountInfoView/>} />
                        <Route path="/orders" element={<OrdersView/>} />
                    </>
                )}
                <Route path="/products/:id" element={<ProductsDetailsView/>}/>
                <Route path="/products" element={<ProductsView/>}/>
                <Route path="/basket" element={<BasketView/>}/>
                <Route path="/signIn" element={<SignInView/>}/>
                <Route path="/signUp" element={<SignUpView/>}/>
                <Route path="/"  element={<LandingPage/>}/>
            </Routes>
            <ScrollTop/>
            <Notification/>
        </>
    )
}

export default App;
