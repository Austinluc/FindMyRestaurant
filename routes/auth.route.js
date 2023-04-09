const userRoute = require('../controller/auth.controller');

module.exports=function (app){
    app.post('/api/restaurant/add',userRoute.addNew);

    app.get('/api/restaurant',userRoute.fetch);

    app.get('/api/restaurant/categories',userRoute.allCategory);

    app.get('/api/restaurant/categories/categoryName',userRoute.categoryDetails);

    app.get('/api/restaurant/id',userRoute.idDetails);

    app.get('/api/restaurant/rating/ratingValue',userRoute.fetchByRating);

    app.put('/api/restaurant/id',userRoute.updateRestaurant);

    app.delete('/api/restaurant/id',userRoute.deleteRestaurant);

    app.delete('/api/restaurant/',userRoute.deleteAllRestaurants);
}