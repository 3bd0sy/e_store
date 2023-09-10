import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import logo from "./Online-shopping.png"
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();
        console.log(email, password)
        const { data } = await axios.post('http://127.0.0.1:8000/api/login', {
            email, password
        })

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;
        localStorage.setItem('token', data['token']);

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/" />;
    }

    return <>
        <section class="vh-90 mt-5 mb-5">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class=" col-md-9 col-lg-6 col-xl-5">
                        <img src={logo} width="500psax" class="img-fluid" alt="Sample" />
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={submit}>
                            <div style={{ marginLeft: "-80px" }} class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <h1>welcome to  store name</h1>
                            </div>
                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0"></p>
                            </div>
                            <div class="form-outline mb-4">
                                <input name="email" placeholder="name@example.com"
                                    onChange={e => setEmail(e.target.value)}
                                    type="email" id="form3Example3" class="form-control form-control-lg" />
                                <label class="form-label" for="form3Example3">Email address</label>
                            </div>
                            <div class="form-outline mb-3">
                                <input name="password" onChange={e => setPassword(e.target.value)} type="password" id="form3Example4" class="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <label class="form-label" for="form3Example4">Password</label>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">

                                <div class="form-check mb-0">
                                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label class="form-check-label" for="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" class="text-body">Forgot password?</a>
                            </div>
                            <div class="text-center text-lg-start mt-4 pt-2">
                                <a href="/home">
                                    <button type="submit" class="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: " 2.5rem" }}>Login</button>
                                </a><p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                    class="link-danger">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ background: "linear-gradient(to right, #33ccff 0%, #ff99cc 100%)" }} class="fixed-bottom pt-5">
                <div class="text-white mb-3 mb-md-0">
                </div>
                <div>
                    <a href="#!" class="text-white me-4">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </div>
            </div>
        </section>
    </>
}