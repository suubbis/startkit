import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotProtectedRoute, ProtectedRoute} from "./utils/Routes";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";

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
                        path="/dashboard"
                        element={<ProtectedRoute component={Dashboard} />}
                    />
                </Routes>
            </Router>
        );
    }
}

export default RouteList;
