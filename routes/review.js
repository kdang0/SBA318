import {Router} from 'express';
import { reviewsData } from '../data/review.js';
import { restaurantsData } from '../data/restaurant.js';
const reviewRouter = Router();

reviewRouter.get('/restaurant/:id', (req,res)=> {
    console.log(req.params.id);
    const reviews = reviewsData.filter((review) => review.restaurantId == req.params.id);
    if(reviews.length > 0){
        res.json(reviews);
    } else{
        console.log("nothing");
    }
});

reviewRouter.post('/restaurant/:id', (req,res) => {
    console.log(req.body);
    console.log(req.params.id);
    if(req.body.review && req.body.rating && req.params.id){
        const review = {
            customerName: 'Ken Wayne',
            reviewId: reviewsData.length + 1,
            reviewText: req.body.review,
            date: "2024-10-13",
            rating: req.body.rating,
            restaurantId: req.params.id
        }
        reviewsData.push(review);
        res.json(review);
    }
    else {
        return res.status(404).send();
    }
});

reviewRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    if(id){
        const review = reviewsData.find((review,i) => {
            if(review.reviewId == req.params.id) {
                reviewsData.splice(i,1);
                return true;
            }
        });
        if(review) res.json(review);
    }  else {
        return res.status(404).send();
    }
});

reviewRouter.get('/:id', (req,res) => {
    const review = reviewsData.find((review) => review.reviewId == req.params.id);
    console.log(review);
    if(review){
        return res.render('home', {
            review:review,
            restaurants: restaurantsData
        });
    } else {
        return res.status(404).send();
    }
});


reviewRouter.patch('/:id', (req,res) => {
    const review = reviewsData.find((review,i) => {
        if(review.reviewId == req.params.id) {
            for(const key in req.body){
                reviewsData[i][key] = req.body[key];
            }
            return true;
        }
    });
    console.log(review);
    if(review) res.json(review);
    else return;
})


export default reviewRouter;