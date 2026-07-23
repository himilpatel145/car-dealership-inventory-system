import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CarDetails from "./pages/CarDetails";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";

function App(){

    return(

        <BrowserRouter>
            <Navbar />
            <Routes>

                <Route

path="/dashboard"

element={

<AdminRoute>

    <Dashboard/>

</AdminRoute>

}

/>

                <Route
                    path="/cars"
                    element={<Cars/>}
                />
                     <Route
                    path="/login"
                    element={<Login/>}
                    />

                    <Route
                    path="/register"
                    element={<Register/>}
                    />
                  <Route
                    path="/cars/:id"
                    element={<CarDetails/>}
                     />

            </Routes>
<Footer/>
        </BrowserRouter>

    );

}

export default App;