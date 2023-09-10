import React, { useState, useEffect } from "react";
import AppBar from "./appbar";


export default function UserProfile() {
    const [userdata, setUserdata] = useState({})
    const token = localStorage.getItem('token'); 
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const getUserData = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/user', { headers })
        // console.log("res:",res)
        // check if api was called with no errors
        if (res.ok) {
            // convert from json to object
            const response = await res.json();
            // show success message to the user
            // console.log("response:",response.message)
            // console.log("response:",response)

            // update prodcuts list for UI            
            setUserdata(response)
        } else {
            alert('failed to get products form API')
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return <>
        <AppBar />
        <section style={{ backgroundColor: "#eee", height: "86vh" }}>
            <div class="container py-2">
                <div class="row">
                    <div class="col">
                        <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-1">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item"><a href="/home">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                    class="rounded-circle img-fluid" style={{ width: "150px" }} />
                                <h5 class="my-3">{userdata.name}</h5>
                                <h5 class="mb-5"> </h5>

                            </div>
                        </div>
                        <div class="card mb-4 mb-lg-0">
                            <div class="card-body p-0">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Full Name</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userdata.name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Email</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userdata.email}</p>
                                    </div>
                                </div>

                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Phone</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userdata.phone}</p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Birth Day</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userdata.birthDay}</p>
                                    </div>
                                </div>

                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Address</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userdata.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >




    </>

}