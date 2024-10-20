import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoutes = () => {
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login/" />
}

export default PrivateRoutes;