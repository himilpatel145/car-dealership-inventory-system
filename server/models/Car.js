const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
{
    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    fuelType: {
        type: String,
        required: true
    },

    transmission: {
        type: String,
        required: true
    },


    // Added for inventory requirement
    category: {
        type: String,
        required: true
    },


    // Available stock quantity
    quantity: {
        type: Number,
        required: true,
        default: 0
    },


    image: {
        type: String
    },

    description: {
        type: String
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("Car", carSchema);