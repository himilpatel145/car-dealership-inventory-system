const Enquiry = require("../models/Enquiry");


// Create Enquiry

exports.createEnquiry = async(req,res)=>{

    try{

        const enquiry = await Enquiry.create(req.body);


        res.status(201).json({

            message:"Enquiry submitted successfully",

            enquiry

        });


    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// Get All Enquiries (Admin)

exports.getEnquiries = async(req,res)=>{

    try{


        const enquiries = await Enquiry.find()
        .populate("car");


        res.json(enquiries);


    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



// Delete Enquiry

exports.deleteEnquiry = async(req,res)=>{

    try{


        await Enquiry.findByIdAndDelete(
            req.params.id
        );


        res.json({

            message:"Enquiry deleted"

        });


    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};