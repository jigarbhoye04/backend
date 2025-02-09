import express from 'express';

const app = express();


// Routes
app.get('/',(req,res) =>{
    res.send('Welcome to the Subscription tracker API');
});


//MAKING SERVER LISTEN for requests trying to access specific routes
app.listen(3000, ()=>{
    console.log('Subscription Tracker API is running on http://localhost:3000');
})


export default app;

