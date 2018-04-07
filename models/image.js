const mongoose = require ('mongoose');

// post Schema
const imageSchema = mongoose.Schema({
   
	title:{
		type: String,
		//required: true
	},
	content:{
		type: String,
		//required: true
	},
	image:{
		type: String
	},
	/*image_url:{
		type: String
	},*/
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Image = module.exports = mongoose.model('Image', imageSchema);

// Get posts
module.exports.getImages = (callback, limit) => {
	Image.find(callback).limit(limit);
}

// Get post
module.exports.getImagetById = (id, callback) => {
	Image.findById(id, callback);
}

// Add post
module.exports.addImage = (image, callback) => {
	Image.create(image, callback);
}

// Update post
module.exports.updateImage = (id, image, options, callback) => {
	var query = {_id: id};
	var update = {
		title: image.title,
		content: image.content,
		image: image.image
		
	}
	Image.findOneAndUpdate(query, update, options, callback);
}

// Delete post
module.exports.removeImage = (id, callback) => {
	var query = {_id: id};
	Image.remove(query, callback);
}