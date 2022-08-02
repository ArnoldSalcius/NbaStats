require('dotenv').config();
const express = require('express');
const path = require("path");
const playerRouter = require('./routes/players');

const app = express();
app.use(express.json());



// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/dist")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});



app.use(async (req, res, next) => {
    next();
})
app.use('/api/players', playerRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening at Port 3000');
})