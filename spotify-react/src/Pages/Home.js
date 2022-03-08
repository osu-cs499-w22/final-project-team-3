import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../Components/NavigationBar";

function Home() {
    return (
        <div>
            <NavigationBar />
            <h1>Home</h1>
            <Outlet />
        </div>
    );
}

export default Home;
