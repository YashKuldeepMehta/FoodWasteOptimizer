    // models/Product.js
    const mongoose = require("mongoose");

    const productSchema = new mongoose.Schema({
    name: String,
    category: { type: String, enum: ["vegetables", "snacks", "rice", "beverages"] },
    price: Number,
    discounted_price: Number,
    expiry_date: Date,
    is_discounted: { type: Boolean, default: false }
    });

    module.exports = mongoose.model("Product", productSchema);
