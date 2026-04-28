const express = require ('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config()
const productRoutes = require('./src/routes/product.routes')
const connectDB = require('./src/dbhelper/connectiondb')
connectDB()
app.use(express.json())

app.use('/api', productRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(colors.bgBlue.white(`Server is running on port ${PORT}`))
})