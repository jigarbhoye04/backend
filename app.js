import express from 'express';
import { PORT } from './config/env.js';

const app = express();

// Routes
app.get('/',(req,res) =>{
    res.send('Welcome to the Subscription tracker API');
});


//MAKING SERVER LISTEN for requests trying to access specific routes
app.listen(PORT, ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})


export default app;

