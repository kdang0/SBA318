import express from 'express';
import chickenRouter from './routes/chicken.js'
import restaurantRouter from './routes/restaurant.js';
import reviewRouter from './routes/review.js';
import {restaurantsData} from "./data/restaurant.js"
const app = express();
const PORT = 4500;

//setup
app.set('view engine', 'pug');
app.set('views', './views');

//middleware
app.use(express.json());
app.use(express.static('public'));


//routes
// app.use('/', chickenRouter);
app.get('/', (req,res) => {
    res.render('home', {
        restaurants: restaurantsData
    })
});

app.use('/restaurant', restaurantRouter);
app.use('/reviews', reviewRouter);
app.use('/chicken', chickenRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
});


