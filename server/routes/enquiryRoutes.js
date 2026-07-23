const express = require("express");

const router = express.Router();


const {

    createEnquiry,
    getEnquiries,
    deleteEnquiry

} = require("../controllers/enquiryController");


const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");



// Customer enquiry

router.post(
    "/",
    createEnquiry
);



// Admin get enquiries

router.get(
    "/",
    protect,
    admin,
    getEnquiries
);



// Admin delete enquiry

router.delete(
    "/:id",
    protect,
    admin,
    deleteEnquiry
);



module.exports = router;