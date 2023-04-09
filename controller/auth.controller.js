//import schema
const User=require("../models/user.model");

//add new users 

exports.addNew =async (req,res) =>{

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: 'Request body cannot be empty' });
      }
    const userObj={
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        imageUrl:req.body.imageUrl,
        location:req.body.location,
        phone:req.body.phone,
        rating:req.body.rating
    };


try{
    const newUser = await User.create(userObj);
    if(newUser===null){
        res.status()
    }
    res.status(200).send({
        name: newUser.name,
        description: newUser.description,
        category: newUser.category,
        imageUrl: newUser.imageUrl,
        location: newUser.location,
        phone: newUser.phone,
        rating: newUser.rating});
}
catch(err){
    console.log("Error creating user",err);
    res.status(500).send({
        message:"Some error occurred while creating the Restaurant"
    });
}
};

//fetching all the available restaurants
exports.fetch=async (req,res)=>{
   try{
    const allRestaurant = await User.find();

        if(allRestaurant===null){
           return res.status(404).send({
            message:"no restaurant found"
            });
        }
        res.status(200).send({
            allRestaurant,message:"Restaurant fetch successfully"
        })

   }
   catch(err){
    console.log("Error ",err);
    res.status(500).send({
        message: 'Some error occured while fetching the Restaurants.'
    })
   }
}

//list out all categories
exports.allCategory=async (req,res)=>{
    try{
        const categories=await User.distinct("category");

        if(categories===null){
            return res.status(200).send([]
             );
         }
         res.status(200).send({
           categories,message:"categories fetch successfully"
        })

    }
    catch(err){
        console.log("Error ",err);
        res.status(500).send({
            message: 'Some error occurred while fetching Categories.'
        })
       }
    }

    //list out the category
    exports.categoryDetails=async (req,res)=>{
        try{
            const categoryName= req.query.category;
            
            const categories= await User.find({category:categoryName})

            if (categories.length > 0 && categories[0].category === "Takeout") {
                return res.status(200).send(categories);
            }
            else if(categories.length > 0 && categories[0].category === "dineout"){
                return res.status(200).send(categories);
            }
            else
                return res.status(200).send([])
        }
        catch(err){
            console.log("Error",err);
            res.status(500).send({ message: "Some error occurred while fetching the Restaurant."});
        }
    }
//fetch the details by given id
exports.idDetails=async (req,res)=>{
    try{
        const idName= req.query.id;
        
        const idData= await User.findById(idName);

        if(idName===null){
           return  res.status(404).send({message:"no restaurant found with given ID"});
        }
            res.status(200).send(idData);
    }
    catch(err){
        console.log("Error",err);
        res.status(500).send({ message: "Some error occurred while fetching the Restaurant."});
    }
}

//fetch the details by given rating
exports.fetchByRating = async(req,res)=>{
    try{
        const {ratingValue}=req.query;

        const ratingBy=await User.find({rating:{$gte:ratingValue}});

        if(!ratingValue){
           return res.status(200).send([]);
        }
        res.status(200).send(ratingBy);
    }
    catch(err){
        console.log("Error",err);
        res.status(500).send({ message: "Some error occurred while fetching the Restaurant."});
    }
}

// updates existing details of the restaurant with a particular id.
exports.updateRestaurant=async (req,res)=>{
    try{
        const id= req.query.id;

        const updates = req.body;

        if(!updates){
            return res.status(400).send({
                message:"Restaurant Data is required"
            })
        }
        const restaurant= await User.findByIdAndUpdate(id,updates, { new: true });

        if (!restaurant) {
            return res.status(404).send({ message: "no Restaurant found for given ID" });
        }
        res.status(200).send({ restaurant, message: "Restaurant updated successfully" });
    }
    catch(err){
        console.log("Error updating restaurant",err);
        res.status(500).send({ message: "Some error occurred while updating the Restaurant."});
    }
}

//Delete the details by given ID
exports.deleteRestaurant=async (req,res)=>{

    const id=req.query.id;

    const restaurant=await User.findByIdAndDelete(id);
    try{
    if (!restaurant||restaurant==null) {
        return res.status(404).send({
            restaurant:"null",
             message: "Restaurant deleted successfully" });
    }
    return res.status(200).send({
        message:"Restaurant deleted successfully",restaurant
    })
}
catch(err){
    console.log("Error deleting restaurant",err);
    res.status(500).send({ message: "Some error occurred while deleting the Restaurant."});
}
}
//Delete all the details in particular restaurant

    exports.deleteAllRestaurants = async (req, res) => {
        try {
            const deleteCount = await User.deleteMany({});
    
            if (deleteCount.deletedCount === 0) {
                return res.status(404).send({ acknowledge: true, message: "No restaurants found to delete" ,count: deleteCount.deletedCount});
            }
    
            res.status(200).send({ acknowledge: true, message: "All restaurants deleted successfully", count: deleteCount.deletedCount });
        } catch (err) {
            console.log("Error deleting restaurants", err);
            res.status(500).send({ message: "Some error occurred while deleting the restaurants." });
        }
    }
    
