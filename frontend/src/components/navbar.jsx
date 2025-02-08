import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../assets/css/admin.css';

const Navbar = () => (
    <nav className="cc-nav navbar nav-dark">
        <div className="container-fluid">
            <a className="navbar-brand py-1 mx-3" href="/home">
                <img src="../img/simro_chat.PNG" alt="logo" width="100" height="100" className="d-inline-block align-text-top" />
            </a>
            <h1 className="fw-bolder">
                <i style={{ color: "#120cef" }}>GM</i>
                <i style={{ color: "#f3940b" }}>AO</i>
            </h1>
            <ul className="navbar-nav ms-auto mb-2lg-0">
                <li>
                    <a style={{ fontSize: "25px",color: "#f3940b" }} href="../deconnexion.php" className="btn btn-con">
                        <i className="bx bx-log-in"></i> DECONNEXION
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar