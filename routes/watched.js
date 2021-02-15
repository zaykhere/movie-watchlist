const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watched = require("../models/Watched");
const auth = require("../middlewares/auth.js");

router.post("/", auth, async(req,res)=>{
	try{
		let newMovie = new Watched({
			title: req.body.title,
			poster_path: req.body.poster_path,
			movie_id: req.body.movie_id,
			user: req.user._id
		})
		const checkIfAlready = await Watched.findOne({movie_id:newMovie.movie_id,user:req.user._id});
		console.log(checkIfAlready);
		if(checkIfAlready) return res.json({duplicateMsg:"Movie Already Watched"});
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
		const watched = await Watched.find({user: req.user});
		if(!watched) return res.json({errorMsg:"You have not added any movies"});
		res.json({watched: watched});
	}
	catch(ex){
		console.log(ex);
		res.json({errorMsg: "Something went wrong"});
	}
})

router.delete("/:id",auth,async(req,res)=>{
	try{
		const id = req.params.id
  		await Watched.findOneAndRemove({movie_id:id, user:req.user._id});

 		res.json({message: 'Movie deleted successfully'}); 
	}
	catch(ex){
		console.log(ex);
		res.json({errorMsg:"Could not be deleted"});
	}
})




module.exports = router;
