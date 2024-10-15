import express from 'express';
import chickenRouter from './routes/chicken.js'
import restaurantRouter from './routes/restaurant.js';
import reviewRouter from './routes/review.js';
import {restaurantsData} from "./data/restaurant.js";

const app = express();
const PORT = 4500;

//setup
app.set('view engine', 'pug');
app.set('views', './views');

//middleware
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
    ${time.toLocaleTimeString()}: Received a ${req.method} request to ${
        req.url
      }.`,
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

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


// Error middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message });
  });


app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
});


