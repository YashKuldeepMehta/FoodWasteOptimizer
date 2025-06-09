const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
connectdb();


app.use(express.json());
app.use(cors());


app.use('/users', userRoutes);
require('./models/expireTracker');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
