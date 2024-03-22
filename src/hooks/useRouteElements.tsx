import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

import Login from "../pages/Auth/Login";
import Accounts from "../pages/Auth/Accounts";

function ProtectedRoute() {
    //const { isAuthenticated } = useContext(AppContext)
    const isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
    //const { isAuthenticated } = useContext(AppContext)
    const isAuthenticated = localStorage.getItem('token')
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: 'login',
                    element: (
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    )
                },
            ]
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    index: true,
                    element: (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    )
                },
                {
                    path: '/auth/accounts',
                    element: (
                        <MainLayout>
                            <Accounts />
                        </MainLayout>
                    )
                },
            ]
        },
        {
            path: '*',
            element: (
                <MainLayout>
                    <NotFound />
                </MainLayout>
            )
        }
    ])
    return routeElements
}

export default useRouteElements;