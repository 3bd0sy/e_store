import React, { useState } from "react";
import Login from "./pages/login";
import HomePage from "./pages/home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/register";
import ProductDetails from "./pages/productdetails"
import UserProfile from "./pages/userprofile";
import Cart from "./pages/cart";
import SearchReasult from "./pages/searchresult";
import axios from "axios";
export default function APP() {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  const addToCart = async (productId, orderId) => {
    console.log("productId:", productId)
    try {
      const data = {
        products: [
          {
            id: productId,
            qty: 1
          }
        ]
      };
      const response = await axios.post('http://127.0.0.1:8000/api/orders', data, { headers });
      console.log(response)
      if (response.status === 200) {
        console.log('product added');
      } else {
        console.error('error in adding new product');
      }
    } catch (error) {
      console.error('error:', error);
    }
  };

  return <>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/home" element={<HomePage addToCart={addToCart} />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<SearchReasult />} />
        <Route path="register" element={<Register />} />
        <Route path="details" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="Profile" element={token ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="cart" element={token ? <Cart /> : <Navigate to="/" />} />
      </Routes >
    </BrowserRouter>
  </>
}