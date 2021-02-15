const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchedSchema = ({
	title: {
		type: String
	},
	poster_path:{
		type: String
	},
	movie_id:{
		type: String,
		required: true
	},
	user:{
		type: Schema.ObjectId,
		ref: "user"
	}
})

const Watched = mongoose.model('watched',WatchedSchema);
module.exports = Watched;