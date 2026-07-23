const Car = require("../models/Car");


// Add Car
exports.addCar = async (req,res)=>{

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try{

        const car = await Car.create({

    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    fuelType: req.body.fuelType,
    transmission: req.body.transmission,

    category: req.body.category,

    quantity: Number(req.body.quantity),

    description: req.body.description,

    image: req.file ? req.file.path : ""

});
        res.status(201).json({
            message: "Car added successfully",
            car
        });

    } catch (error) {

console.error("Error message:", error.message);
console.error("Error stack:", error.stack);

    res.status(500).json({
        message: error.message
    });

}

};


// Get All Cars
exports.getCars = async (req, res) => {
    try {

        const filter = {};

        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        if (req.query.fuelType) {
            filter.fuelType = req.query.fuelType;
        }

        if (req.query.transmission) {
            filter.transmission = req.query.transmission;
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        const cars = await Car.find(filter);

        res.json(cars);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Update Car
exports.updateCar = async(req,res)=>{
    try{

        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );

        res.json({
            message:"Car updated successfully",
            car
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
// Delete Car
exports.deleteCar = async(req,res)=>{
    try{

        const car = await Car.findByIdAndDelete(req.params.id);

        res.json({
            message:"Car deleted successfully",
            car
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
// Purchase Car
exports.purchaseCar = async(req,res)=>{

    try{

        const car = await Car.findById(req.params.id);


        if(!car){

            return res.status(404).json({
                message:"Car not found"
            });

        }


        if(car.quantity <= 0){

            return res.status(400).json({
                message:"Car is out of stock"
            });

        }


        car.quantity = car.quantity - 1;


        await car.save();


        res.json({

            message:"Car purchased successfully",
            remainingStock: car.quantity

        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
// Restock Car
exports.restockCar = async(req,res)=>{

    try{

        const car = await Car.findById(req.params.id);


        if(!car){

            return res.status(404).json({
                message:"Car not found"
            });

        }


        const amount = Number(req.body.quantity);


        if(!amount || amount <= 0){

            return res.status(400).json({
                message:"Enter valid quantity"
            });

        }


        car.quantity = car.quantity + amount;


        await car.save();


        res.json({

            message:"Car restocked successfully",

            quantity: car.quantity

        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};