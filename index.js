const express = require("express");
const { connection } = require("./connection/dbconnection");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const errorHandler = require("./middleware/error.middleware");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api",userRouter,productRouter);

app.listen(8000, async()=>{
    try {
        await connection;
        console.log('server is connected to database')
        console.log(`server is running at port 8000`)
    } catch (error) {
        console.log(error)
    }
})