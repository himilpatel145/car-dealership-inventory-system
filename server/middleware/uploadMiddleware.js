const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "car-dealership",
        public_id: Date.now().toString(),
        resource_type: "image"
    })
});

const upload = multer({ storage });

module.exports = upload;