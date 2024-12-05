// Importing necessary packages
const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv").config(); 
const cors = require("cors"); 

// Enable CORS globally for all routes
app.use(cors());
app.options('*', cors()); // Enable preflight response for all routes

app.use(express.json()); 
app.use(express.static("public")); 

// Importing route modules
const authRoutes = require("./routes/auth.js"); 
const listingRoutes = require("./routes/listing.js"); 
const bookingRoutes = require("./routes/booking.js"); 
const userRoutes = require("./routes/user.js"); 


// CORS Wrapper Function for Specific Routes (e.g., /auth/login)
const allowCors = (fn) => async (req, res) => {
  // Set necessary CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Date, X-Api-Version, Authorization'
  );
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Call the actual handler function
  return await fn(req, res);
};

/* ROUTES */
// Example wrapped route with custom CORS handling
app.get('/auth/login', allowCors((req, res) => {
  res.send('Working! Server is ready');
}));

// General route without special CORS handling
app.get('/', (req, res) => {
  res.send('Working! Server is ready');
});

// Use imported routes with global CORS middleware
app.use("/auth", authRoutes); 
app.use("/properties", listingRoutes); 
app.use("/bookings", bookingRoutes); 
app.use("/users", userRoutes); 

const PORT = process.env.PORT || 8214;
// const PORT = 3001


// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URL, { 
    dbName: "Dream_Oasis",
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    // If the connection is successful, start the server
    app.listen(PORT, '0.0.0.0', () => console.log(`Server Port: ${PORT}`));
    console.log(`MongoDB connected`);
  })
  .catch((err) => console.log(`${err} did not connect`)); // If there's an error connecting to MongoDB, log the error






// // Importing necessary packages
// const express = require("express"); 
// const app = express(); 
// const mongoose = require("mongoose"); 
// const dotenv = require("dotenv").config(); 
// const cors = require("cors"); 



// app.use(cors());
// app.options('*', cors()); // Enable preflight response for all routes

// app.use(express.json()); 
// app.use(express.static("public")); 

// // app.use(cors({
// //   origin: '*',
// // }));
// app.options('*', cors()); // Enable preflight response for all routes



// // Importing route modules
// const authRoutes = require("./routes/auth.js"); 
// const listingRoutes = require("./routes/listing.js"); 
// const bookingRoutes = require("./routes/booking.js"); 
// const userRoutes = require("./routes/user.js"); 




// /* ROUTES */
// app.get('/auth/login', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.send('Working! Server is ready');
// });

// app.get('/',(req,res)=>{
//   res.send('Working! Server is ready')
// });
// app.use("/auth", authRoutes); 
// app.use("/properties", listingRoutes); 
// app.use("/bookings", bookingRoutes); 
// app.use("/users", userRoutes); 

// const PORT = 3001; 

// // Connect to the MongoDB database using Mongoose
// mongoose
//   .connect(process.env.MONGO_URL, { 
//     dbName: "Dream_Oasis",
//     useNewUrlParser: true,
//     useUnifiedTopology: true, 
//   })
//   .then(() => {
//     // If the connection is successful, start the server
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//     console.log(`MongoDB connected`);
//   })
//   .catch((err) => console.log(`${err} did not connect`)); // If there's an error connecting to MongoDB, log the error
