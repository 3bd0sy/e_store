import React,{  useState,useEffect } from "react";
// import  from "react";
import "./style/app.scss";
import AppBar from "./appbar";
import { Link } from "react-router-dom";

export default function HomePage({ addToCart }) {
    // console.log("addToCart:", addToCart)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const getProducts = async () => {
        setCategories(["Electronics", "Fashion", "Home and Garden", "Sports and Outdoors", "Health and Beauty"])
        const res = await fetch('http://127.0.0.1:8000/api/products')
        if (res.ok) {
            const response = await res.json();
            setProducts(response.products)
        } else {
            alert('failed to get products form API')
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    return <div className="home page">

        <AppBar />
        <div class="container">
            <h2 class="mt-3 container d-flex align-items-center justify-content-center">Categories</h2>
            <ul class="row container d-flex align-items-center justify-content-center">
                {
                    categories.map(el => < li class="list-group-item">{el}</li>)
                }
            </ul>
        </div>

        <div className="body">
            {
                products.length === 0 ?
                    <h1>Loading ...</h1>
                    :
                    products.map(
                        el =>
                            <div  className="product" style={{ width: "18rem" }} class="card m-3" key={el.id}>
                                <img width="100%" src={`http://127.0.0.1:8000/images/${el.image}.jpg`} alt="" />
                                <div class="card-body">
                                    <h1 class="card-title">{el.name}</h1>
                                    <p class="card-text">{el.description.substring(0, 50)}</p>
                                    <a onClick={() => addToCart(el.id, el.cat_id)} class="btn btn-primary">Add To Cart</a>
                                    <Link to="/details" state={{ el }} class="ml-5 btn btn-warning">details</Link>
                                </div>
                            </div>
                    )
            }
        </div>
    </div>;
}

