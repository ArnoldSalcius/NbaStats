const express = require('express');
const playerRouter = require('./routes/players');

const app = express();
app.use(express.json());


// app.get('/players', (req, res) => {
//     console.log(req.query);
//     res.send(final);
// });


app.use('/api/players', playerRouter);
app.use((req) => {
    console.log(req.path);
    console.log('I have been hit');
})

app.listen(3000, () => {
    console.log('Server is listening at Port 3000');
})