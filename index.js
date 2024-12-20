import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./src/books/book.route.js";
import orderRoutes from "./src/orders/order.route.js";
import userRoutes from "./src/users/user.route.js";
import adminRoutes from "./src/stats/admin.stats.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(express.json());
app.use(cors({
    origin : ['http://localhost:5173' , 'https://book-store-app-agyapal-singh.vercel.app'],
    credentials: true
}))


// Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);



async function main(){
    await mongoose.connect(process.env.MONGO);
    app.use('/', (req, res) =>{
        res.send("Welcome to my server node")
    })
    
}

main().then(()=> console.log("MongoDB connected")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})