
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');
const movieRouter = require('./Routers/movieRouter');

dotenv.config();

//Connection to DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB")
    }catch(error){
        console.error("Error connecting MongoDB");
        process.exit(1);
    }
}

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "/images")));
app.use('/api/movie', movieRouter);

app.listen(PORT,() => {
    console.log("App is listening on PORT ", PORT)
})