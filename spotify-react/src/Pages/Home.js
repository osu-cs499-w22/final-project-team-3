import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Outlet />
        </div>
    );
}

export default Home;
