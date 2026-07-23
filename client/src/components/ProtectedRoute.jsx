import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function ProtectedRoute({children}){


    const token = localStorage.getItem("token");


    if(!token){

        return <Navigate to="/login"/>;

    }


    const user = jwtDecode(token);


    if(user.role !== "admin"){

        return <Navigate to="/cars"/>;

    }


    return children;


}


export default ProtectedRoute;