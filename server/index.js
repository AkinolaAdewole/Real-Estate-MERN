// Importing necessary packages
const express = require("express"); // Express is a minimal web framework for creating web servers in Node.js
const app = express(); // Create an Express application instance
const mongoose = require("mongoose"); // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
const dotenv = require("dotenv").config(); // dotenv loads environment variables from a .env file into process.env
const cors = require("cors"); // CORS middleware allows cross-origin resource sharing (useful for APIs accessed from different origins)

// Importing route modules
const authRoutes = require("./routes/auth.js"); // Authentication-related routes
const listingRoutes = require("./routes/listing.js"); // Routes related to property listings
const bookingRoutes = require("./routes/booking.js"); // Routes related to bookings (reserving properties)
const userRoutes = require("./routes/user.js"); // Routes related to user management (profile, actions, etc.)

// Middleware Setup
app.use(cors()); // Enable CORS for all routes (makes the API accessible to front-end apps running on different domains)
app.use(express.json()); // Parses incoming requests with JSON payloads and makes it available in `req.body`
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
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // The server listens on port 3001 and logs a message when ready
  })
  .catch((err) => console.log(`${err} did not connect`)); // If there's an error connecting to MongoDB, log the error
