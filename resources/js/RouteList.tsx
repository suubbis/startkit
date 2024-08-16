import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotProtectedRoute, ProtectedRoute} from "./Utils/Routes";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard";

class RouteList extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route
                        path="/login"
                        element={<NotProtectedRoute component={Login} />}
                    />

                    {/* PROTECTED ROUTES */}
                    <Route
                        path="/"
                        element={<ProtectedRoute component={Dashboard} />}
                    />
                </Routes>
            </Router>
        );
    }
}

export default RouteList;
