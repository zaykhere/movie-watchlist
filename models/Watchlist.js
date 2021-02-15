const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = ({
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

const Watchlist = mongoose.model('watchlist',WatchlistSchema);
module.exports = Watchlist;