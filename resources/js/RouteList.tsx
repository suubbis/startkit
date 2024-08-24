import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotProtectedRoute, ProtectedRoute} from "./utils/Routes";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Company from './pages/Company/Company';
import NewCompany from './pages/Company/CompanyForm';
import Staff from './pages/Staff/Staff';
import NewStaff from './pages/Staff/StaffForm';
import SystemSettingFrom from './pages/SystemSettings/SystemSettingFrom';
import PageTitle from "@/components/PageTitle";
import Role from  "./pages/Role/Role"
import RoleForm from  "./pages/Role/RoleForm"
import AccessControl from  "./pages/Role/AccessControl"

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
                    <Route
                        path="/company/create"
                        element={
                            <>
                                <PageTitle title="New Company | Startkit" />
                                <ProtectedRoute component={NewCompany} />
                            </>}
                    />
                    <Route
                        path="/company/edit/:id"
                        element={
                            <>
                                <PageTitle title="Edit Company | Startkit" />
                                <ProtectedRoute component={NewCompany} />
                            </>}
                    />
                    <Route
                        path="/staff"
                        element={
                            <>
                                <PageTitle title="staff | Startkit" />
                                <ProtectedRoute component={Staff} />
                            </>}
                    />
                    <Route
                        path="/staff/create"
                        element={
                            <>
                                <PageTitle title="New staff | Startkit" />
                                <ProtectedRoute component={NewStaff} />
                            </>}
                    />
                    <Route
                        path="/staff/edit/:id"
                        element={
                            <>
                                <PageTitle title="Edit staff | Startkit" />
                                <ProtectedRoute component={NewStaff} />
                            </>}
                    />

                    <Route
                        path="/system-settings"
                        element={
                            <>
                                <PageTitle title="System Settings | Startkit" />
                                <ProtectedRoute component={SystemSettingFrom} />
                            </>}
                    />
                    <Route
                        path="/access-control"
                        element={
                            <>
                                <PageTitle title="Access Control | Startkit" />
                                <ProtectedRoute component={AccessControl} />
                            </>}
                    />
                    <Route
                        path="/role"
                        element={
                            <>
                                <PageTitle title="Role | Startkit" />
                                <ProtectedRoute component={Role} />
                            </>}
                    />
                    <Route
                        path="/role/create"
                        element={
                            <>
                                <PageTitle title="New Role | Startkit" />
                                <ProtectedRoute component={RoleForm} />
                            </>}
                    />
                    <Route
                        path="/role/edit/:id"
                        element={
                            <>
                                <PageTitle title="Update Role | Startkit" />
                                <ProtectedRoute component={RoleForm} />
                            </>}
                    />
                </Routes>
            </Router>
        );
    }
}

export default RouteList;
