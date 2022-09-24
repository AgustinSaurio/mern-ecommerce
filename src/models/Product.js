import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    price_offer: Number,
    offer: Boolean,
    size: [Number],
    colors: [String],
    gen: String,
    type: String,
    images: {
        main_img: String,
        images: [String]
    }
})

export default mongoose.model("Products", ProductSchema);