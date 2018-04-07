var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var BizarticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  location: String,
  phone: String,
  email: String,
  postImage: String,
  body: String,
  name1: String,
  name2: String,
  name3: String,
  name4: String,
  name5: String,
  description1: String,
  description2: String,
  description3: String,
  description4: String,
  description5: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
  price1: String,
  price2: Number,
  price3: Number,
  price4: Number,
  price5: Number,
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

BizarticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

BizarticleSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

BizarticleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

BizarticleSchema.methods.updateFavoriteCount = function() {
  var bizarticle = this;

  return User.count({favorites: {$in: [bizarticle._id]}}).then(function(count){
    bizarticle.favoritesCount = count;

    return bizarticle.save();
  });
};

BizarticleSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    location: this.location,
    phone: this.phone,
    email: this.email,
    postImage: this.postImage,
    body: this.body,
    name1: this.name1,
    name2: this.name2,
    name3: this.name3,
    name4: this.name4,
    name5: this.name5,
    description1: this.description1,
    description2: this.description2,
    description3: this.description3,
    description4: this.description4,
    description5: this.description5,
    image1: this.image1,
    image2: this.image2,
    image3: this.image3,
    image4: this.image4,
    image5: this.image5,
    price1: this.price1,
    price2: this.price2,
    price3: this.price3,
    price4: this.price4,
    price5: this.price5,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Bizarticle', BizarticleSchema);
