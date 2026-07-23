import "./CarCard.css";

function CarCard({car}) {

    return (

        <div className="card m-3 shadow"
             style={{width:"18rem"}}>


            <img
    src={
        car.image
        ?
        `http://localhost:5000/${car.image}`
        :
        "https://via.placeholder.com/400x250"
    }
    className="
        card-img-top
        w-full
        h-56
        object-cover
    "
    alt={car.model}
/>


            <div className="card-body">


                <h5 className="card-title">
                    {car.brand} {car.model}
                </h5>


                <p>
                    Year: {car.year}
                </p>


                <p>
                    Fuel: {car.fuelType}
                </p>


                <p>
                    Transmission: {car.transmission}
                </p>


                <h5>
                    ₹ {car.price}
                </h5>


            </div>

        </div>

    );

}

export default CarCard;