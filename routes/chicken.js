import{Router} from "express";
import { friedChickenData } from "../data/friedchicken.js";

const chickenRouter = Router();



chickenRouter.get('/restaurant/:id', (req,res,next) => {
    const chicken = friedChickenData.find((chicken) => chicken.restaurantId == req.params.id);
    if(chicken){
        res.json(chicken)
    }
});

export default chickenRouter;