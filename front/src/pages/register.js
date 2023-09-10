import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import logo from "./Online-shopping.png"

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();
        // console.log(name, email, password, password_confirmation)
        const res = await axios.post('http://127.0.0.1:8000/api/register', {
            name, email, password, password_confirmation
        });
        // console.log(res)
        setNavigate(true);
    }

    if (navigate) { return <Navigate to="/login" />; }

    return <>
        <section class="vh-100" style={{ backgroundColor: " #eee" }}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form onSubmit={submit} class="mx-1 mx-md-4">
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input name="name" onChange={e => setName(e.target.value)} type="text" id="form3Example1c" class="form-control" />
                                                    <label class="form-label" for="form3Example1c">Your Name</label>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input name="email" onChange={e => setEmail(e.target.value)} type="email" id="form3Example3c" class="form-control" />
                                                    <label class="form-label" for="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input name="password" onChange={e => setPassword(e.target.value)} type="password" id="form3Example4c" class="form-control" />
                                                    <label class="form-label" for="form3Example4c">Password</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input name="repeated_password" onChange={e => setpassword_confirmation(e.target.value)} type="password" id="form3Example4cd" class="form-control" />
                                                    <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div class="form-check d-flex justify-content-center mb-1">
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label class="form-check-label" for="form2Example3">
                                                    I agree all statements in <a href="#">Terms of service</a>
                                                </label>
                                            </div>
                                            <a href="/login" className=" mb-2 ml-5" > I'm already have account</a>

                                            <div class="d-flex justify-content-center mt-4 mx-4 mb-3 mb-lg-4">
                                                <a href="/home">
                                                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
                                                </a>
                                            </div>

                                        </form>

                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src={logo} class="img-fluid" alt="Sample imacge" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div style={{ background: "linear-gradient(to right, #33ccff 0%, #ff99cc 100%)" }} class="fixed-bottom pt-5">
            <div class="text-white mb-3 mb-md-0">
            </div>
            <div>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-facebook-f"></i>
                </a>
            </div>
        </div>
    </>
}
