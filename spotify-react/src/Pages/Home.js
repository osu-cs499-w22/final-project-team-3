import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home(props) {
    console.log(props.token)

    return (
        <div>
            <h1>Home</h1>
            <Outlet />
        </div>
    );
}

export default Home;
