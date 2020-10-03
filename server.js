const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on the port ${port}`);
});