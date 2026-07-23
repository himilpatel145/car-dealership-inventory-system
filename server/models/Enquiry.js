const mongoose = require("mongoose");


const enquirySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    message:{
        type:String
    },

    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Enquiry",
    enquirySchema
);