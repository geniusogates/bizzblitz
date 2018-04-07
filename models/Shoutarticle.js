var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var ShoutarticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  shoutname: String,
  shoutdescription: String,
  shoutlocation: String,
  shoutphone: String,
  shoutemail: String,
  shoutimage: String,
  shoutbody: String,
  
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

ShoutarticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

ShoutarticleSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

ShoutarticleSchema.methods.slugify = function() {
  this.slug = slug(this.shoutname) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ShoutarticleSchema.methods.updateFavoriteCount = function() {
  var shoutarticle = this;

  return User.count({favorites: {$in: [shoutarticle._id]}}).then(function(count){
    shoutarticle.favoritesCount = count;

    return shoutarticle.save();
  });
};

ShoutarticleSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    shoutname: this.shoutname,
    shoutdescription: this.shoutdescription,
    shoutlocation: this.shoutlocation,
    shoutphone: this.shoutphone,
    shoutemail: this.shoutemail,
    shoutimage: this.shoutimage,
    shoutbody: this.shoutbody,
    
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Shoutarticle', ShoutarticleSchema);
