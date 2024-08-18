import React from "react";
import {Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "@/helpers/Functions";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (isAuthenticated()) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export const NotProtectedRoute = ({ component: Component, ...rest }) => {
    console.log('NotProtectedRoute:', isAuthenticated());

    if (!isAuthenticated()) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/" />;
    }
};
