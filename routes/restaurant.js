import Router from "express"
import {restaurantsData} from '../data/restaurant.js';
const restRouter = Router();

restRouter.get('/:id', (req,res) => {
    const restaurant  = restaurantsData.find((restaurant) => restaurant.id == req.params.id);
    console.log(req.params.id);
    console.log(restaurant);
    if(restaurant){
        return res.render('home', {
            restaurants: restaurantsData,
            restaurant:restaurant
        });
    } else {
        return res.status(404).send();
    }
});

export default restRouter;