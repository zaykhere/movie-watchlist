const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss= require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const app = express();
 
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    credentials: true,
  })
);

//Import Routes 
const userRoute = require("./routes/user");
const watchlistRoute = require("./routes/watchlist");
const watchedRoute = require("./routes/watched");

//Load Environment vars 
dotenv.config({ path: './config.env' });

//Connecting to Mongoose 
const DB_CONNECTION_STRING = process.env.DB_CONNECT;
mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

// Middlewares  
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

//Rate limit
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 mins
	max: 100
})
app.use(limiter);
app.use(hpp());


//Routes 
app.use("/api/user", userRoute);
app.use("/api/watchlist",watchlistRoute);
app.use("/api/watched", watchedRoute);


//Connecting to App 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
