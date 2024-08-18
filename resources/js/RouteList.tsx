import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotProtectedRoute, ProtectedRoute} from "./utils/Routes";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Company from './pages/Company/Company'
import PageTitle from "@/components/PageTitle";

class RouteList extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route
                        path="/login"
                        element={
                        <>
                            <PageTitle title="Login | Startkit" />
                            <NotProtectedRoute component={Login} />
                        </>}
                    />

                    {/* PROTECTED ROUTES */}
                    <Route
                        path="/"
                        element={
                            <>
                                <PageTitle title="Dashboard | Startkit" />
                                <ProtectedRoute component={Dashboard} />
                            </>}
                    />
                    <Route
                        path="/company"
                        element={
                            <>
                                <PageTitle title="Company | Startkit" />
                                <ProtectedRoute component={Company} />
                            </>}
                    />
                </Routes>
            </Router>
        );
    }
}

export default RouteList;
