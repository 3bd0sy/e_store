import { useEffect, useState } from "react";
import {  useNavigate  } from "react-router-dom";

import "./style/app.scss";
import logo from "./Online-shopping.png"
import axios from "axios";
export default function AppBar() {
    const [searchValue, setSearchValue] = useState([])
    const [searchResults, setSearchResults] = useState([]); // Store search results
    var loggedIn = null;
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const navigate = useNavigate(); // Get the navigate function
    loggedIn = !!token;

    const handlelogout = async e => {
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        console.log(headers)
        const res = await axios.post('http://127.0.0.1:8000/api/logout', null, { headers })
        if (res.status === 200) {
            localStorage.removeItem("token")
            navigate("/"); // Redirect to the index page
            console.log("Logged out");
        }
        else {
            alert('faild to logout')
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        console.log("searchValue:",searchValue)
        const data={
            name:searchValue
        }
        try {

            const response = await axios.get("http://127.0.0.1:8000/api/products/search", {
                params: {
                    name: searchValue, // Pass the search value as a query parameter
                    
                    // you should handle this case how to know if the user search using name or desc or cats
                    // desc:searchValue
                  },
                  headers 
              })

           console.log("response:",response.data.products)
            if (response.status === 200) {
                setSearchResults(response.data.products)
            } else {
              console.error('فشل في تحديث  searchالعدد');
            }
          } catch (error) {
            console.error('حدث خطأsearch أثناء :', error);
          }

    }
    return <div className="home page">
        <div className="appbar sticky-top" >
            <a href="/home">
                <img class="ml-5 mr-3" src={logo} width="100px" alt="" />
            </a>
            <a className="link" href="/home">home</a>
            
            {loggedIn === false ? <>
                <a className="link" href="/login">Login</a>
                <a className="link" href="/register">Register</a>
            </>
                :
                <>
                    <a onClick={handlelogout} className="link btn" >Log out</a>
                    <a className="link" href="/myorders">My Orders</a>
                </>
            }
            <div className="space"></div>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <form class="d-flex" role="search">
                        <input onChange={e => setSearchValue(e.target.value)} class="form-control me-2" type="search" placeholder="Search for product" aria-label="Search" />
                        <button onClick={handleSearch} class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            {loggedIn ? <>
                <a class="mr-1" className="link" href="/cart">Cart</a>
                <a class="mr-3" className="link" href="/profile">Profile</a>
            </> : <></>}

        </div>
    </div>
}

