import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    'http://localhost:5173'
]

// Middleware congfiguration
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: allowedOrigins, // Replace with your allowed origins
    credentials: true // Allow credentials to be sent
}))

app.get('/',(req,res)=>{
    res.send('Welcome to GreenCart Backend');
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});