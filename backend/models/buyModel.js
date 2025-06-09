const mongoose = require('mongoose');


const buySchema = new mongoose.Schema({
    uemail: {type:String, required:true},
    name: String,
    category: { type: String, enum: ["vegetables", "snacks", "rice", "beverages"] },
    price: Number,
    expiry_date: Date,
})

const buydata = mongoose.model('userbuy', buySchema);

module.exports = buydata;