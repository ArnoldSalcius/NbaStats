require('dotenv').config();
const { log } = require('console');
const express = require('express');
const path = require('path');
const { test } = require('./controllers/playerController');
const playerRouter = require('./routes/players');

const app = express();
app.use(express.json());



app.get('/test', test);

app.use(async (req, res, next) => {
    log('hello')
    next();
})
app.use('/api/players', playerRouter);




// Step 1:
app.use(express.static(path.resolve(__dirname, "../client/dist")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening at Port 3000');
})