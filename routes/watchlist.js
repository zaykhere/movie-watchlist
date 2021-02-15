const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watchlist = require("../models/Watchlist");
const auth = require("../middlewares/auth.js");

router.post("/", auth, async(req,res)=>{
	try{

		let newMovie = new Watchlist({
			title: req.body.title,
			poster_path: req.body.poster_path,
			movie_id: req.body.movie_id,
			user: req.user._id
		})
		const checkIfAlready = await Watchlist.findOne({movie_id:newMovie.movie_id,user:req.user._id});
		if(checkIfAlready) return res.json({duplicateMsg:"Movie Already exists in the watchlist"});
		const movie = await newMovie.save();
		res.json({movie:movie});		
	}
	catch(ex){
		console.log(ex);
		res.json({errorMsg: "Something went wrong! "});
	}
})

router.get("/",auth,async(req,res)=>{
	try{
		const watchlist = await Watchlist.find({user: req.user});
		if(!watchlist) return res.json({errorMsg:"You have not added any movies"});
		res.json({watchlist: watchlist});
	}
	catch(ex){
		console.log(ex);
		res.json({errorMsg: "Something went wrong"});
	}
})

router.delete("/:id",auth,async(req,res)=>{
	try{
		const id = req.params.id
  		await Watchlist.findOneAndRemove({movie_id:id, user:req.user._id});

 		res.json({message: 'Post deleted successfully'}); 
	}
	catch(ex){
		console.log(ex);
		res.json({errorMsg:"Could not be deleted"});
	}
})

module.exports = router;
