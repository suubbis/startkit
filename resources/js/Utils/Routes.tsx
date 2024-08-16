import React from "react";
import {Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../Helpers/Functions";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (isAuthenticated()) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export const NotProtectedRoute = ({ component: Component, ...rest }) => {
    const { path } = rest;

    if (!isAuthenticated()) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/" />;
    }
};
