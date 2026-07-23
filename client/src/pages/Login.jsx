import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                formData
            );


            localStorage.setItem(
                "token",
                response.data.token
            );


            alert("Login successful");


            navigate("/");


        } catch(error) {

            alert(
                error.response.data.message
            );

        }

    };


    return (

<div className="min-h-screen bg-gray-100 flex items-center justify-center">


<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


<h1 className="text-3xl font-bold text-center mb-6">
Login 🚗
</h1>


<form onSubmit={handleSubmit}>


<input

className="w-full border p-3 rounded-lg mb-4"

type="email"
name="email"
placeholder="Email"

value={formData.email}

onChange={handleChange}

/>



<input

className="w-full border p-3 rounded-lg mb-4"

type="password"

name="password"
placeholder="Password"

value={formData.password}

onChange={handleChange}

/>



<button

className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

>

Login

</button>


</form>


</div>


</div>

);

}


export default Login;