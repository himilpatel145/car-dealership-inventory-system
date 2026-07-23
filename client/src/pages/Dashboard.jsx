import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [cars, setCars] = useState([]);
const [editCar, setEditCar] = useState(null);
const [enquiries, setEnquiries] = useState([]);

const [car, setCar] = useState({

    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    category: "",
    quantity: "",
    description: ""

});

const [image, setImage] = useState(null);



useEffect(() => {

    fetchCars();
    fetchEnquiries();

}, []);





const fetchCars = async () => {

    try {

        const response = await api.get("/cars");

        setCars(response.data);

    } catch(error) {

        console.log(error);

    }

};





const fetchEnquiries = async()=>{

    try{

        const token = localStorage.getItem("token");


        const response = await api.get(
            "/enquiries",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        setEnquiries(response.data);


    }catch(error){

        console.log(error);

    }

};
    fetchEnquiries();




    const deleteCar = async (id) => {

        try {

            const token = localStorage.getItem("token");


            await api.delete(
                `/cars/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            alert("Car deleted");

            fetchCars();


        } catch(error) {

            alert(error.response.data.message);

        }

    };
    const deleteEnquiry = async(id)=>{

    try{

        const token = localStorage.getItem("token");


        await api.delete(
            `/enquiries/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        alert("Enquiry deleted");


        fetchEnquiries();


    }catch(error){

        console.log(error);


        alert(
            error.response?.data?.message ||
            "Delete failed"
        );

    }

};

const updateCar = async () => {

    try {

        const token = localStorage.getItem("token");


        await api.put(
            `/cars/${editCar._id}`,
            editCar,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        alert("Car updated");


        setEditCar(null);

        fetchCars();


    } catch(error){

        alert(error.response.data.message);

    }

};
const restockCar = async(id)=>{

    try{

        const token = localStorage.getItem("token");


        const amount = prompt(
            "Enter quantity to add:"
        );


        if(!amount){
            return;
        }


        await api.post(

            `/cars/${id}/restock`,

            {
                quantity:Number(amount)
            },

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );


        alert("Stock updated successfully");


        fetchCars();


    }catch(error){

        console.log(error.response);

        alert(
            error.response?.data?.message ||
            "Restock failed"
        );

    }

};
const handleChange = (e)=>{

    setCar({
        ...car,
        [e.target.name]: e.target.value
    });

};
const addCar = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("brand", car.brand);
        formData.append("model", car.model);
        formData.append("year", car.year);
        formData.append("price", car.price);
        formData.append("fuelType", car.fuelType);
        formData.append("transmission", car.transmission);

formData.append("category", car.category);

formData.append("quantity", car.quantity);

formData.append("description", car.description);

        if (image) {
            formData.append("image", image);
        }

        const response = await api.post(
            "/cars",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);
        fetchCars();

    } catch (error) {
        console.log(error.response);
        alert(error.response?.data?.message || error.message);
    }
};
    return (

<div className="bg-gray-100 min-h-screen py-10"> 

<div className="max-w-7xl mx-auto px-6"> 

            <h1 className="text-4xl font-bold text-gray-800 mb-8">
    Admin Dashboard 🚗
</h1>
            <div className="
bg-white
shadow-lg
rounded-2xl
p-6
mb-10
">


<h2 className="text-2xl font-bold mb-5">
    Add New Car ➕
</h2>


<form 
onSubmit={addCar}
className="grid grid-cols-1 md:grid-cols-2 gap-4"
>
className="space-y-4"


    <input
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <input
        name="model"
        placeholder="Model"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <input
        name="fuelType"
        placeholder="Fuel Type"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <input
        name="transmission"
        placeholder="Transmission"
        onChange={handleChange}
      className="border p-3 rounded-lg"
    />
    <input
    name="category"
    placeholder="Category (SUV/Sedan/Hatchback)"
    onChange={handleChange}
   className="border p-3 rounded-lg"
    />
        <input
    name="quantity"
    placeholder="Stock Quantity"
    type="number"
    onChange={handleChange}
    className="border p-3 rounded-lg"
    />

    <input
        type="file"
        accept="image/*"
        onChange={(e)=>setImage(e.target.files[0])}
      className="border p-3 rounded-lg"
    />

    <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="border p-3 rounded-lg"
    />

    <button

type="submit"

className="
bg-blue-600
text-white
py-3
rounded-lg
hover:bg-blue-700
"

>

Add Car 🚗

</button>
</form>

</div>


<hr/>
            {
editCar && (

<div>

<h2>Edit Car</h2>


<input
value={editCar.brand}
onChange={(e)=>setEditCar({
    ...editCar,
    brand:e.target.value
})}
/>


<input
value={editCar.model}
onChange={(e)=>setEditCar({
    ...editCar,
    model:e.target.value
})}
/>


<input
value={editCar.price}
onChange={(e)=>setEditCar({
    ...editCar,
    price:e.target.value
})}
/>


<button onClick={updateCar}>
Save Changes
</button>


</div>

)
}
           <h2 className="text-3xl font-bold mb-6">
    Inventory 🚘
</h2>


            {
                cars.map((car)=>(

                   <div

key={car._id}

className="
bg-white
rounded-2xl
shadow-lg
p-5
hover:shadow-xl
transition
"

>

                        <h3>
                            {car.brand} {car.model}
                        </h3>
                        <img
                            src={car.image}
                            alt={car.model}
                            width="250"
                            height="150"
                        />
                        <p>
                            Price: ₹{car.price}
                        </p>
                        <p>
📦 Stock: {car.quantity}
</p>


<p
className={
car.quantity === 0
?
"text-red-600 font-bold"
:
"text-green-600 font-bold"
}
>

{
car.quantity === 0
?
"Out of Stock"
:
"Available"
}

</p>
                        <p>
                            Category: {car.category}
                        </p>

                        <p>
                            📦 Stock: {car.quantity}
                        </p>
                        <button
onClick={() => deleteCar(car._id)}
className="bg-red-600 text-white px-4 py-2 rounded-lg"
>
Delete
</button>


<button
onClick={() => setEditCar(car)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
>
Edit
</button>


<button
onClick={() => restockCar(car._id)}
className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2"
>
Restock +
</button>

                        <hr/>

                    </div>

                ))
            }
                <hr/>

<h2>
    Customer Enquiries
</h2>


{
    enquiries.map((enquiry)=>(

        <div
        key={enquiry._id}
        style={{
            border:"1px solid #ccc",
            padding:"15px",
            margin:"15px"
        }}
        >

            <h3>
                {enquiry.name}
            </h3>


            <p>
                Email: {enquiry.email}
            </p>


            <p>
                Phone: {enquiry.phone}
            </p>


            <p>
                Message: {enquiry.message}
            </p>


            <p>
                Car:
                {" "}
                {enquiry.car?.brand}
                {" "}
                {enquiry.car?.model}
            </p>


            <button
            onClick={()=>deleteEnquiry(enquiry._id)}
            >
                Delete Enquiry
            </button>


        </div>

    ))
}

        

  </div>
<hr className="my-10"/>

<h2 className="text-3xl font-bold mb-5">
    Customer Enquiries 📩
</h2>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{
    enquiries.map((item)=>(

        <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-6"
        >

            <h3 className="text-xl font-bold">
                {item.name}
            </h3>


            <p>
                📧 {item.email}
            </p>


            <p>
                📞 {item.phone}
            </p>


            <p className="mt-3">
                {item.message}
            </p>


            {
                item.car &&

                <div className="mt-4 border-t pt-3">

                    <h4 className="font-semibold">
                        Interested Car:
                    </h4>


                    <p>
                        {item.car.brand} {item.car.model}
                    </p>


                    <p>
                        Price: ₹{item.car.price}
                    </p>

                </div>

            }


        </div>


    ))
}

</div>
    </div>

);  

}

export default Dashboard;