import { useEffect, useState } from "react";
import api from "../services/api";


function Cars(){

    const [cars,setCars] = useState([]);

    const [search,setSearch] = useState("");

    const [fuel,setFuel] = useState("");

    const [minPrice,setMinPrice] = useState("");
    const [maxPrice,setMaxPrice] = useState("");


    useEffect(()=>{

        fetchCars();

    },[]);



    const fetchCars = async()=>{

        try{

            const response = await api.get("/cars");

            setCars(response.data);


        }catch(error){

            console.log(error);

        }

    };



    const filteredCars = cars.filter((car)=>{

    return (

        car.brand
        .toLowerCase()
        .includes(search.toLowerCase())

        &&

        (fuel === "" || car.fuelType === fuel)

        &&

        (minPrice === "" || car.price >= Number(minPrice))

        &&

        (maxPrice === "" || car.price <= Number(maxPrice))

    );

});



    return(

         <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            {/* Hero Section */}

<div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">

    <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-5">
            Find Your Dream Car 🚗
        </h1>

        <p className="text-xl mb-8">
            Buy the best cars at the best prices.
        </p>

        <button
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
            Explore Cars
        </button>

    </div>

</div>
<div className="max-w-7xl mx-auto px-6 py-10"></div>
            <h1 className="text-center mb-4">
                Available Cars 🚗
            </h1>


<div className="bg-white shadow-lg rounded-2xl p-6 mb-10">

    <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Search & Filter Cars 🔍
    </h2>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


        <input
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search Brand"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />


        <input
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e)=>setMinPrice(e.target.value)}
        />


        <input
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
        />


        <select
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={fuel}
            onChange={(e)=>setFuel(e.target.value)}
        >

            <option value="">
                All Fuel
            </option>

            <option value="Petrol">
                Petrol
            </option>

            <option value="Diesel">
                Diesel
            </option>

            <option value="Electric">
                Electric
            </option>

        </select>


    </div>

</div>

            <select
                className="form-select mb-3"
                value={fuel}
                onChange={(e)=>setFuel(e.target.value)}
                >
                <option value="">
                    All Fuel
                </option>

                <option value="Petrol">
                    Petrol
                </option>

                <option value="Diesel">
                    Diesel
                </option>

                <option value="Electric">
                    Electric
                </option>


            </select>



            <hr/>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
filteredCars.map((car)=>(

<div
    key={car._id}
    className="
bg-white
rounded-2xl
shadow-md
overflow-hidden
hover:shadow-2xl
hover:-translate-y-2
transition
duration-300
"
>

    <div className="relative">

    <img
        src={car.image}
        alt={car.model}
        className="w-full h-56 object-cover"
    />


    <div className="absolute top-4 right-4">

        <span
        className={
            car.quantity === 0
            ?
            "bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
            :
            "bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
        }
        >

        {
            car.quantity === 0
            ?
            "Sold Out"
            :
            `${car.quantity} Available`
        }

        </span>

    </div>


</div>


    <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800">
            {car.brand} {car.model}
        </h2>


        <p className="text-blue-600 text-xl font-semibold mt-2">
            ₹{car.price}
        </p>


        <div className="mt-4 text-gray-600 space-y-2">

            <p>
                📅 Year: {car.year}
            </p>

            <p>
                ⛽ Fuel: {car.fuelType}
            </p>

            <p>
                ⚙️ Transmission: {car.transmission}
            </p>

        </div>


        <p className="mt-4 text-gray-500">
            {car.description}
        </p>


        <button
            onClick={() => window.location.href=`/cars/${car._id}`}
            className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
            View Details
        </button>
        <button

disabled={car.quantity === 0}

onClick={async()=>{

    try{

        await api.post(
            `/cars/${car._id}/purchase`
        );


        alert("Car purchased successfully");


        fetchCars();


    }catch(error){

        alert(
            error.response?.data?.message ||
            "Purchase failed"
        );

    }

}}


className={

car.quantity === 0

?

"mt-3 w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"

:

"mt-3 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"

}

>

{

car.quantity === 0

?

"Out of Stock"

:

"Purchase Now 🛒"

}

</button>

    </div>

</div>

                    ))
                }
                    </div>


                


            </div>


    
    );

}


export default Cars;