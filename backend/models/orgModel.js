const mongoose = require('mongoose');


const orgSchema = new mongoose.Schema({
    orgname : {type: String, required: true},
    orgtype : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true}
})

const registerData = mongoose.model('organization', orgSchema);

module.exports = registerData;