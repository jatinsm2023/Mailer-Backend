const express = require('express');
const cors = require('cors'); // Import cors module
const appRoute = require('./routes/route.js');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Use cors middleware

app.use('/api', appRoute);
app.use('/',()=>{
    res.send("Welcome to the server");
});
app.listen(PORT, () => {
    console.log("server running");
});
