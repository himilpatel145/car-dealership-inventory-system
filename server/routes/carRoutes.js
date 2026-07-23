const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");


const {
addCar,
getCars,
updateCar,
deleteCar,
purchaseCar,
restockCar
}=require("../controllers/carController");

// Add Car API
router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    addCar
);


// Get All Cars API
router.get("/",  getCars);

router.put("/:id", protect, admin, updateCar);
router.delete("/:id",protect, admin, deleteCar);
router.post(
    "/:id/purchase",
    purchaseCar
);
router.post(
    "/:id/restock",
    restockCar
);
router.use((err, req, res, next) => {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({
        message: err.message || "Upload error"
    });
});

module.exports = router;