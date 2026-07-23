import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


function CarDetails(){

    const { id } = useParams();

    const [car, setCar] = useState(null);


    const [enquiry, setEnquiry] = useState({

        name:"",
        email:"",
        phone:"",
        message:""

    });



    useEffect(()=>{

        fetchCar();

    },[]);



    const fetchCar = async()=>{

        try{

            const response = await api.get("/cars");


            const selectedCar = response.data.find(

                c => c._id === id

            );


            setCar(selectedCar);


        }catch(error){

            console.log(error);

        }

    };



    const handleChange = (e)=>{

        setEnquiry({

            ...enquiry,

            [e.target.name]: e.target.value

        });

    };



    const submitEnquiry = async(e)=>{

        e.preventDefault();


        try{


            await api.post(

                "/enquiries",

                {

                    ...enquiry,

                    car:id

                }

            );


            alert("Enquiry submitted successfully");


            setEnquiry({

                name:"",
                email:"",
                phone:"",
                message:""

            });


        }catch(error){


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Failed to submit enquiry"
            );


        }


    };



    const purchaseCar = async()=>{

        try{

            await api.post(
                `/cars/${id}/purchase`
            );


            alert("Car purchased successfully");


            fetchCar();


        }catch(error){

            alert(
                error.response?.data?.message ||
                "Purchase failed"
            );

        }

    };



    if(!car){

        return (

            <h2 className="text-center text-2xl mt-10">
                Loading...
            </h2>

        );

    }



    return (

<div className="bg-gray-100 min-h-screen py-10">


    <div className="max-w-6xl mx-auto px-6">


        <button

            onClick={()=>window.history.back()}

            className="
            mb-5
            bg-gray-800
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-gray-700
            "

        >

            ← Back

        </button>



        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">


            {/* Car Image */}

            <img

                src={car.image}

                alt={car.model}

                className="
                w-full
                h-[250px]
                md:h-[450px]
                object-cover
                "

            />



            <div className="p-8">


                <h1 className="text-4xl font-bold text-gray-800">

                    {car.brand} {car.model}

                </h1>



                <p className="text-3xl text-blue-600 font-bold mt-3">

                    ₹{car.price}

                </p>




                <div className="
                grid
                grid-cols-1
                md:grid-cols-4
                gap-5
                mt-8
                ">


                    <div className="bg-gray-100 rounded-xl p-5">

                        <p className="text-gray-500">
                            Year
                        </p>

                        <p className="font-bold text-xl">
                            📅 {car.year}
                        </p>

                    </div>




                    <div className="bg-gray-100 rounded-xl p-5">

                        <p className="text-gray-500">
                            Fuel
                        </p>

                        <p className="font-bold text-xl">
                            ⛽ {car.fuelType}
                        </p>

                    </div>




                    <div className="bg-gray-100 rounded-xl p-5">

                        <p className="text-gray-500">
                            Transmission
                        </p>

                        <p className="font-bold text-xl">
                            ⚙️ {car.transmission}
                        </p>

                    </div>




                    <div className="bg-gray-100 rounded-xl p-5">

                        <p className="text-gray-500">
                            Stock
                        </p>


                        <p
                        className={
                            car.quantity === 0
                            ?
                            "font-bold text-xl text-red-600"
                            :
                            "font-bold text-xl text-green-600"
                        }
                        >

                            {
                                car.quantity === 0
                                ?
                                "❌ Sold Out"
                                :
                                `📦 ${car.quantity} Available`
                            }

                        </p>


                    </div>


                </div>





                <div className="mt-8">


                    <h2 className="text-2xl font-bold">

                        Description

                    </h2>


                    <p className="text-gray-600 mt-3">

                        {car.description}

                    </p>



                    <button


                        disabled={car.quantity === 0}


                        onClick={purchaseCar}


                        className={
    car.quantity === 0
    ?
    "mt-6 bg-gray-400 text-white px-8 py-3 rounded-xl cursor-not-allowed"
    :
    "mt-6 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
}

                        


                    >

                        {

                            car.quantity === 0

                            ?

                            "Out of Stock"

                            :

                            "Buy This Car 🛒"

                        }


                    </button>


                </div>



            </div>


        </div>






        {/* Enquiry Form */}



        <div className="
        bg-white
        rounded-3xl
        shadow-xl
        mt-10
        p-8
        ">



            <h2 className="text-3xl font-bold mb-6">

                Contact Seller 📩

            </h2>




            <form

                onSubmit={submitEnquiry}

                className="space-y-5"

            >



                <input

                    name="name"

                    placeholder="Your Name"

                    value={enquiry.name}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-5
                    py-3
                    "

                />




                <input

                    name="email"

                    placeholder="Email"

                    value={enquiry.email}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-5
                    py-3
                    "

                />




                <input

                    name="phone"

                    placeholder="Phone Number"

                    value={enquiry.phone}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-5
                    py-3
                    "

                />




                <textarea

                    name="message"

                    placeholder="Message"

                    value={enquiry.message}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-5
                    py-3
                    h-32
                    "

                />





                <button

                    className="
                    bg-blue-600
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    hover:bg-blue-700
                    transition
                    "

                >

                    Submit Enquiry

                </button>



            </form>



        </div>



    </div>


</div>

);

}


export default CarDetails;