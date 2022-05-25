import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsView from "./views/ProductsView/ProductsView";
import Navbar from "./components/Navbar/Navbar";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import ProductsDetailsView from "./views/ProductsDetailsView/ProductsDetailsView";
import AppContextProvider from "./context";
import Notification from "./components/Notification/Notification";
import BasketView from "./views/BasketView/BasketView";





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/products/:id" element={<ProductsDetailsView/>}/>
                    <Route path="/products" element={<ProductsView/>}/>
                    <Route path="/basket" element={<BasketView/>}/>
                    <Route path="/"  element={<App/>}/>
                </Routes>
                <ScrollTop/>
				{/*<Notification/>*/}
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
