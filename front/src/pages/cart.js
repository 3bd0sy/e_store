import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from './appbar';
import Footer from "./footer";


const Cart = () => {
  const [total, setTotal] = useState(0)
  const [totalq, setTotalq] = useState(0)
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  });
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const [cartData, setCartData] = useState([]);
  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders', { headers });
      if (response.status === 200) {
        setCartData(response.data.order);
        console.log(response)
        console.log(response.data.order)
        let totalCost = 0;
        let totalQYT = 0;
        for (const value of Object.values(response.data.order)) {
          const productCost = parseFloat(value.qty) * parseFloat(value.product_object.price);
          totalQYT += parseFloat(value.qty)
          totalCost += productCost;
        }
        setTotal(totalCost);
        setTotalq(totalQYT);
        console.log("totalQYT:", totalQYT)
        console.log(`total= $${totalCost}`);
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleUpdateQuantity = async (productId, orderId, newQuantity) => {
    console.log("handleUpdateQuantity")
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/updateorder/${orderId}/product/${productId}`, {
        quantity: newQuantity,
      }, { headers });

      if (response.status === 200) {
        const updatedCartData = cartData.map((item) => {
          if (item.product === productId) {
            return { ...item, qty: newQuantity };
          }
          return item;
        });
        let totalCost = 0;
        let totalQYT = 0;
        for (const value of Object.values(updatedCartData)) {
          const productCost = parseFloat(value.qty) * parseFloat(value.product_object.price);
          totalQYT += parseFloat(value.qty)
          totalCost += productCost;
        }
        setTotal(totalCost);
        setTotalq(totalQYT);
        setCartData(updatedCartData);
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveItem = async (productId, orderId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/deletefromorder/${orderId}/product/${productId}`, { headers }); 
      if (response.status === 200) {
        console.log('ok')
        fetchCartData()
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <>
    <AppBar />
    <div>
      <section class="h-100 h-custom" t='style={{ backgroundColor: "#d2c9ff" }}'>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div class="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 class="mb-0 text-muted">{cartData.length} products</h6>
                        </div>
                        <hr class="my-4" />
                        {[...cartData.values()].map((item, index) => (
                          <tr key={index}>
                            <div class="row mb-4 d-flex justify-content-between align-items-center">

                              <div class="col-md-2 col-lg-3 col-xl-3">
                                <img
                                  src={`http://127.0.0.1:8000/images/${item.product_object.image}.jpg`}
                                  class="img-fluid rounded-3" alt="Cotton T-shirt" />
                              </div>

                              <div class="col-md-2 col-lg-3 col-xl-3">
                                <h6 class="text-black mb-0">{item.product_object.name}</h6>
                                <h6 class="text-muted">{item.qty} items</h6>
                              </div>

                              <div class="col-md-2 col-lg-3 col-xl-3">

                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                  <div class="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                    <button class="btn btn-primary px-3 me-2"
                                      onClick={() => handleUpdateQuantity(item.product, item.order, item.qty - 1)}>
                                      <i class="fas fa-minus">-</i>
                                    </button>

                                    <div class="form-outline">
                                      <div class="form-control"> {item.qty}</div>
                                    </div>

                                    <button class="btn btn-primary px-3 ms-2"
                                      onClick={() => handleUpdateQuantity(item.product, item.order, item.qty + 1)}>
                                      <i class="fas fa-plus">+</i>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div class="row mb-1">
                                <div class="col-md-12 col-lg-12 col-xl-12">
                                  <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                      <h6 class="mb-0">$ {item.product_object.price}</h6>
                                    </div>
                                    <div>
                                      <a onClick={() => handleRemoveItem(item.product, item.order)} class="ml-3 btn text-danger"><i class="fas fa-times"></i>delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </tr>
                        ))}

                        <hr class="my-4" />

                        <div class="pt-5">
                          <h6 class="mb-0"><a href="/" class="text-body"><i
                            class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 bg-grey">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">items {totalq}</h5>
                          {/* <h5>€ 132.00</h5> */}
                        </div>



                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-5">
                          <h5 class="text-uppercase">Total price</h5>
                          <h5>$ {total}</h5>
                        </div>

                        <button type="button" class="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark">Confirm the order</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
<Footer/>
  </>
};

export default Cart;