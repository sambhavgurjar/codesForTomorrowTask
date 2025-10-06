import app from "./app.js";
import dbConnect from "./config.js/dbConfig.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5050;

dbConnect();

app.listen(port, () => {
    console.log(`server is listing on port ${port}`);
    
});