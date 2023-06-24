import multer from "multer";
import { v2 as Cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

Cloudinary.config({
    process.env.cloud_name,
    process.env.API_KEY,
    process.env.api_secret,
})

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder:"CloudinaryD5",
    }
})

export const multerCloud = multer({storage});
