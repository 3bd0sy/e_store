import React from "react";
import AppBar from "./appbar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchReasult({addToCart}) {
    const data = useLocation()
    console.log("data:",data)
    const objproducts=data.state
    const products = Object.values(objproducts);
    console.log("products:",products)
    return <>
        <div className="home page">

            <AppBar />
            <div class="container">
            <h2 class="mt-3 container d-flex align-items-center justify-content-center">Search Results</h2>
        </div>
            <div className="body">
                {
                   Array.isArray(products)&& products.length === 0 ?
                        <h1>no matching</h1>
                        :
                        products.map(
                            el =>
                                <div className="product" style={{ width: "18rem" }} class="card m-3" key={el.id}>
                                    <img width="100%" src={`http://127.0.0.1:8000/images/${el.image}.jpg`} alt="" />
                                    <div class="card-body">
                                        <h1 class="card-title">{el.name}</h1>
                                        {el.description ? (
                                        <p class="card-text">{el.description.substring(0, 50)}</p>
                                    ) : (
                                        <p class="card-text">Description not available</p>
                                    )}
                                        {/* <p class="card-text">{el.description.substring(0, 50)}</p> */}
                                        <a onClick={() => addToCart(el.id, el.cat_id)} class="btn btn-primary">Add To Cart</a>
                                        <Link to="/details" state={{ el }} class="ml-5 btn btn-warning">details</Link>
                                    </div>
                                </div>
                        )
                }
            </div>
        </div>;
    </>
}