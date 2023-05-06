import mongoose from "mongoose";

const articleBody = new mongoose.Schema({
    index: Number,
    guid: String,
    isActive: Boolean,
    balance: String,
    picture: String,
    age: Number,
    eyeColor: String,
    // name: Object(),
    company: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    registered: String,
    latitude: String,
    longitude: String,
    tags: Array,
    range: Array,
    friends: Array,
    greeting: String,
    favoriteFruit: String,
});

export const SampleBody = mongoose.model("SampleBody", articleBody);