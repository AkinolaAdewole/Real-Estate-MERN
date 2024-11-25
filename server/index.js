// Importing necessary packages
const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv").config(); 
const cors = require("cors"); 

// Importing route modules
const authRoutes = require("./routes/auth.js"); 
const listingRoutes = require("./routes/listing.js"); 
const bookingRoutes = require("./routes/booking.js"); 
const userRoutes = require("./routes/user.js"); 

// Middleware Setup
app.use(cors()); 
app.use(express.json()); 
app.use(express.static("public")); 

/* ROUTES */
app.use("/auth", authRoutes); 
app.use("/properties", listingRoutes); 
app.use("/bookings", bookingRoutes); 
app.use("/users", userRoutes); 

const PORT = 3001; 

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URL, { 
    dbName: "Dream_Oasis",
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    // If the connection is successful, start the server
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log(`MongoDB connected`);
  })
  .catch((err) => console.log(`${err} did not connect`)); // If there's an error connecting to MongoDB, log the error
