const mongoose = require('mongoose');
const express = require("express");

const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const passport = require('passport');

const app = express();

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

    
require('./config/passport')(passport);
app.use(passport.initialize());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


// npm server => "nodemon app.js" will reflect changes made upon refresh