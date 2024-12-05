const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000
const app = express()
const { connectToDatabase } = require('./config/db');
const nutritionRoute = require('./routes/nutritionRoutes');
const userRoute = require('./routes/userRoute');
const workOutRoute = require('./routes/workOutRoute');

app.use(cors())
app.use(express.json())

connectToDatabase()
app.use('/', userRoute,nutritionRoute,workOutRoute)
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`the server is running on ${port}`);
})
