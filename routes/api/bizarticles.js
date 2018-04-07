var router = require('express').Router();
var mongoose = require('mongoose');
var Bizarticle = mongoose.model('Bizarticle');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('bizarticle', function(req, res, next, slug) {
  Bizarticle.findOne({ slug: slug})
    .populate('author')
    .then(function (bizarticle) {
      if (!bizarticle) { return res.sendStatus(404); }

      req.bizarticle = bizarticle;

      return next();
    }).catch(next);
});

router.param('comment', function(req, res, next, id) {
  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Bizarticle.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Bizarticle.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var bizarticles = results[0];
      var bizarticlesCount = results[1];
      var user = results[2];

      return res.json({
        bizarticles: bizarticles.map(function(bizarticle){
          return bizarticle.toJSONFor(user);
        }),
        bizarticlesCount: bizarticlesCount
      });
    });
  }).catch(next);
});

router.get('/bizfeed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Bizarticle.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Bizarticle.count({ author: {$in: user.following}})
    ]).then(function(results){
      var bizarticles = results[0];
      var bizarticlesCount = results[1];

      return res.json({
        bizarticles: bizarticles.map(function(bizarticle){
          return bizarticle.toJSONFor(user);
        }),
        bizarticlesCount: bizarticlesCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var bizarticle = new Bizarticle(req.body.bizarticle);

    bizarticle.author = user;

    return bizarticle.save().then(function(){
      console.log(bizarticle.author);
      return res.json({bizarticle: bizarticle.toJSONFor(user)});
    });
  }).catch(next);
});

// return a article
router.get('/:bizarticle', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.bizarticle.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({bizarticle: req.bizarticle.toJSONFor(user)});
  }).catch(next);
});

// update article
router.put('/:bizarticle', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.bizarticle.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.bizarticle.title !== 'undefined'){
        req.bizarticle.title = req.body.bizarticle.title;
      }

      if(typeof req.body.bizarticle.description !== 'undefined'){
        req.bizarticle.description = req.body.bizarticle.description;
      }

      if(typeof req.body.bizarticle.location !== 'undefined'){
        req.bizarticle.location = req.body.bizarticle.location;
      }

      if(typeof req.body.bizarticle.phone !== 'undefined'){
        req.bizarticle.phone = req.body.bizarticle.phone;
      }

      if(typeof req.body.bizarticle.email !== 'undefined'){
        req.bizarticle.email = req.body.bizarticle.email;
      }

      if(typeof req.body.bizarticle.postImage !== 'undefined'){
        req.bizarticle.postImage = req.body.bizarticle.postImage;
      }

      if(typeof req.body.bizarticle.body !== 'undefined'){
        req.bizarticle.body = req.body.bizarticle.body;
      }

      if(typeof req.body.bizarticle.tagList !== 'undefined'){
        req.bizarticle.tagList = req.body.bizarticle.tagList
      }

      if(typeof req.body.bizarticle.name1 !== 'undefined'){
        req.bizarticle.name1 = req.body.bizarticle.name1;
      }

      if(typeof req.body.bizarticle.name2 !== 'undefined'){
        req.bizarticle.name2 = req.body.bizarticle.name2;
      }

      if(typeof req.body.bizarticle.name3 !== 'undefined'){
        req.bizarticle.name3 = req.body.bizarticle.name3;
      }

      if(typeof req.body.bizarticle.name4 !== 'undefined'){
        req.bizarticle.name4 = req.body.bizarticle.name4;
      }

      if(typeof req.body.bizarticle.name5 !== 'undefined'){
        req.bizarticle.name5 = req.body.bizarticle.name5;
      }

      if(typeof req.body.bizarticle.description1 !== 'undefined'){
        req.bizarticle.description1 = req.body.bizarticle.description1;
      }

      if(typeof req.body.bizarticle.description2 !== 'undefined'){
        req.bizarticle.description2 = req.body.bizarticle.description2;
      }

      if(typeof req.body.bizarticle.description3 !== 'undefined'){
        req.bizarticle.description3 = req.body.bizarticle.description3;
      }

      if(typeof req.body.bizarticle.description4 !== 'undefined'){
        req.bizarticle.description4 = req.body.bizarticle.description4;
      }

      if(typeof req.body.bizarticle.description5 !== 'undefined'){
        req.bizarticle.description5 = req.body.bizarticle.description5;
      }

      if(typeof req.body.bizarticle.image1 !== 'undefined'){
        req.bizarticle.image1 = req.body.bizarticle.image1;
      }

      if(typeof req.body.bizarticle.image2 !== 'undefined'){
        req.bizarticle.image2 = req.body.bizarticle.image2;
      }

      if(typeof req.body.bizarticle.image3 !== 'undefined'){
        req.bizarticle.image3 = req.body.bizarticle.image3;
      }

      if(typeof req.body.bizarticle.image4 !== 'undefined'){
        req.bizarticle.image4 = req.body.bizarticle.image4;
      }

      if(typeof req.body.bizarticle.image5 !== 'undefined'){
        req.bizarticle.image5 = req.body.bizarticle.image5;
      }

      if(typeof req.body.bizarticle.price1 !== 'undefined'){
        req.bizarticle.price1 = req.body.bizarticle.price1;
      }

      if(typeof req.body.bizarticle.price2 !== 'undefined'){
        req.bizarticle.price2 = req.body.bizarticle.price2;
      }

      if(typeof req.body.bizarticle.price3 !== 'undefined'){
        req.bizarticle.price3 = req.body.bizarticle.price3;
      }

      if(typeof req.body.bizarticle.price4 !== 'undefined'){
        req.bizarticle.price4 = req.body.bizarticle.price4;
      }

      if(typeof req.body.bizarticle.price5 !== 'undefined'){
        req.bizarticle.price5 = req.body.bizarticle.price5;
      }

      req.bizarticle.save().then(function(bizarticle){
        return res.json({bizarticle: bizarticle.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete article
router.delete('/:bizarticle', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.bizarticle.author._id.toString() === req.payload.id.toString()){
      return req.bizarticle.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an article
router.post('/:bizarticle/favorite', auth.required, function(req, res, next) {
  var bizarticleId = req.bizarticle._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(bizarticleId).then(function(){
      return req.bizarticle.updateFavoriteCount().then(function(bizarticle){
        return res.json({bizarticle: bizarticle.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unfavorite an article
router.delete('/:bizarticle/favorite', auth.required, function(req, res, next) {
  var bizarticleId = req.bizarticle._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(bizarticleId).then(function(){
      return req.bizarticle.updateFavoriteCount().then(function(bizarticle){
        return res.json({bizarticle: bizarticle.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// return an article's comments
router.get('/:bizarticle/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.bizarticle.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(bizarticle) {
      return res.json({comments: req.bizarticle.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// create a new comment
router.post('/:bizarticle/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.bizarticle = req.bizarticle;
    comment.author = user;

    return comment.save().then(function(){
      req.bizarticle.comments.push(comment);

      return req.bizarticle.save().then(function(bizarticle) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:bizarticle/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.bizarticle.comments.remove(req.comment._id);
    req.bizarticle.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
