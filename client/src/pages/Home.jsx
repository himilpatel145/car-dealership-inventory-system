import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CarCard from "../components/CarCard";


function Home() {


    const [cars, setCars] = useState([]);



    useEffect(() => {

        getCars();

    }, []);



    const getCars = async()=>{

        try{

            const response = await api.get("/cars");

            setCars(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    return (

<div className="bg-gray-100 min-h-screen">



{/* Hero Section */}

<section className="
bg-gradient-to-r
from-blue-700
to-blue-500
text-white
">


<div className="
max-w-7xl
mx-auto
px-6
py-24
">


<h1 className="
text-5xl
font-bold
mb-5
">

Find Your Dream Car 🚗

</h1>


<p className="
text-xl
mb-8
">

Buy premium cars at the best prices.

</p>



<Link

to="/cars"

className="
bg-white
text-blue-700
px-8
py-3
rounded-xl
font-semibold
hover:bg-gray-200
"

>

Explore Cars

</Link>


</div>


</section>






{/* Featured Cars */}


<section className="
max-w-7xl
mx-auto
px-6
py-12
">


<h2 className="
text-4xl
font-bold
text-center
mb-10
">

Featured Cars 🚘

</h2>




<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-8
">


{

cars.slice(0,6).map((car)=>(


<div key={car._id}>

<CarCard car={car}/>

</div>


))

}


</div>



</section>






{/* Why Choose Us */}



<section className="
bg-white
py-16
">


<div className="
max-w-7xl
mx-auto
px-6
">


<h2 className="
text-4xl
font-bold
text-center
mb-10
">

Why Choose Us?

</h2>



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-8
">



<div className="
bg-gray-100
rounded-2xl
p-6
shadow
">

<h3 className="
text-2xl
font-bold
">

🚘 Quality Cars

</h3>

<p className="mt-3 text-gray-600">

All vehicles are inspected before selling.

</p>

</div>




<div className="
bg-gray-100
rounded-2xl
p-6
shadow
">

<h3 className="
text-2xl
font-bold
">

💰 Best Price

</h3>

<p className="mt-3 text-gray-600">

Transparent pricing with no hidden charges.

</p>

</div>




<div className="
bg-gray-100
rounded-2xl
p-6
shadow
">

<h3 className="
text-2xl
font-bold
">

🤝 Trusted Service

</h3>

<p className="mt-3 text-gray-600">

Customer satisfaction is our priority.

</p>

</div>



</div>


</div>


</section>






{/* Statistics */}



<section className="
bg-blue-600
text-white
py-12
">


<div className="
max-w-5xl
mx-auto
grid
grid-cols-1
md:grid-cols-3
text-center
gap-8
">


<div>

<h2 className="text-4xl font-bold">
500+
</h2>

<p>
Cars Sold
</p>

</div>



<div>

<h2 className="text-4xl font-bold">
1000+
</h2>

<p>
Happy Customers
</p>

</div>



<div>

<h2 className="text-4xl font-bold">
24/7
</h2>

<p>
Support
</p>

</div>



</div>


</section>




</div>

);

}


export default Home;