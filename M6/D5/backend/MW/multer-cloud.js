import multer from "multer";
import { v2 as Cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

Cloudinary.config({
    cloud_name: 'dv41vcwmd',
    api_key: '166342841273925',
    api_secret: 'BUa-kRvEV34pb_PgW0-jg83iAbI',
})

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder:"CloudinaryD5",
    }
})

export const multerCloud = multer({storage});
