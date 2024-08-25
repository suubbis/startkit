import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotProtectedRoute, ProtectedRoute} from "./utils/Routes";
const AccessControl = React.lazy(() => import('./pages/Role/AccessControl'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Company = React.lazy(() => import('./pages/Company/Company'));
const NewCompany = React.lazy(() => import('./pages/Company/CompanyForm'));
const Staff = React.lazy(() => import('./pages/Staff/Staff'));
const NewStaff = React.lazy(() => import('./pages/Staff/StaffForm'));
const SystemSettingFrom = React.lazy(() => import('./pages/SystemSettings/SystemSettingFrom'));
const PageTitle = React.lazy(() => import('@/components/PageTitle'));
const Role = React.lazy(() => import('./pages/Role/Role'));
const RoleForm = React.lazy(() => import('./pages/Role/RoleForm'));

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
