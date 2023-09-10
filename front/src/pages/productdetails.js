import React from "react";
import AppBar from "./appbar";
import { useLocation } from "react-router-dom";

export default function ProductDetails({ addToCart }) {
    const data = useLocation()
    const product = data.state.el
    return <>
        <AppBar />
        <section class="py-5">
            <div class="container">
                <div class="row gx-5">
                    <aside class="col-lg-6">
                        <div class="border rounded-4 mb-3 d-flex justify-content-center">
                            <a data-fslightbox="mygalley" class="rounded-4" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
                                <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} class="rounded-4 fit" width="100%" src={`http://127.0.0.1:8000/images/${product.image}.jpg`} alt="" />
                            </a>
                        </div>
                    </aside>
                    <div class="col-lg-6">
                        <div class="ps-lg-3">
                            <h1 class="title text-dark">
                                {product.name}                            </h1>
                            <div class="d-flex flex-row my-3">
                                <div class="text-warning mb-1 me-2">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span class="ms-1">
                                        4.5
                                    </span>
                                </div>
                                <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
                                <span class="text-success ms-2">In stock</span>
                            </div>
                            <div class="mb-3">
                                <span class="h5">${product.price}</span>
                            </div>
                            <p>
                                {product.description}   </p>
                            <hr />
                            <div class="row mb-4">
                                <div class="col-md-4 col-6 mb-3">
                                    <label class="mb-2 d-block">Quantity</label>
                                    <div class="input-group mb-3" style={{ width: "170px" }}>
                                        <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input type="text" class="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                        <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <a href="#!" class="btn btn-warning shadow-0"> Buy now </a>
                            <a onClick={() => addToCart(product.id, product.cat_id)} class="btn btn-primary shadow-0"> <i class="me-1 fa fa-shopping-basket"></i> Add to cart </a>
                            <a href="#!" class="mr-5 btn btn-light border border-secondary py-2 icon-hover px-3"> <i class="me-1 fa fa-heart fa-lg"></i> Save </a>
                            <a href="/home" class="ml-5 btn btn-success border border-secondary py-2 icon-hover px-3"> <i class="me-1 fa fa-heart fa-lg"></i> Home </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}