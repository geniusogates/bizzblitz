var router = require('express').Router();
var mongoose = require('mongoose');
var Shoutarticle = mongoose.model('Shoutarticle');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('shoutarticle', function(req, res, next, slug) {
  Shoutarticle.findOne({ slug: slug})
    .populate('author')
    .then(function (shoutarticle) {
      if (!shoutarticle) { return res.sendStatus(404); }

      req.shoutarticle = shoutarticle;

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
      Shoutarticle.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Shoutarticle.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var shoutarticles = results[0];
      var shoutarticlesCount = results[1];
      var user = results[2];

      return res.json({
        shoutarticles: shoutarticles.map(function(shoutarticle){
          return shoutarticle.toJSONFor(user);
        }),
        shoutarticlesCount: shoutarticlesCount
      });
    });
  }).catch(next);
});

router.get('/shoutfeed', auth.required, function(req, res, next) {
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
      Shoutarticle.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Shoutarticle.count({ author: {$in: user.following}})
    ]).then(function(results){
      var shoutarticles = results[0];
      var shoutarticlesCount = results[1];

      return res.json({
        shoutarticles: shoutarticles.map(function(shoutarticle){
          return shoutarticle.toJSONFor(user);
        }),
        shoutarticlesCount: shoutarticlesCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var shoutarticle = new Shoutarticle(req.body.shoutarticle);

    shoutarticle.author = user;

    return shoutarticle.save().then(function(){
      console.log(shoutarticle.author);
      return res.json({shoutarticle: shoutarticle.toJSONFor(user)});
    });
  }).catch(next);
});

// return a article
router.get('/:shoutarticle', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.shoutarticle.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({shoutarticle: req.shoutarticle.toJSONFor(user)});
  }).catch(next);
});

// update article
router.put('/:shoutarticle', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.shoutarticle.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.shoutarticle.shoutname !== 'undefined'){
        req.shoutarticle.shoutname = req.body.shoutarticle.shoutname;
      }

      if(typeof req.body.shoutarticle.shoutdescription !== 'undefined'){
        req.shoutarticle.shoutdescription = req.body.shoutarticle.shoutdescription;
      }

      if(typeof req.body.shoutarticle.shoutlocation !== 'undefined'){
        req.shoutarticle.shoutlocation = req.body.shoutarticle.shoutlocation;
      }

      if(typeof req.body.shoutarticle.shoutphone !== 'undefined'){
        req.shoutarticle.shoutphone = req.body.shoutarticle.shoutphone;
      }

      if(typeof req.body.shoutarticle.shoutemail !== 'undefined'){
        req.shoutarticle.shoutemail = req.body.shoutarticle.shoutemail;
      }

      if(typeof req.body.shoutarticle.shoutimage !== 'undefined'){
        req.shoutarticle.shoutimage = req.body.shoutarticle.shoutimage;
      }

      if(typeof req.body.shoutarticle.shoutbody !== 'undefined'){
        req.shoutarticle.shoutbody = req.body.shoutarticle.shoutbody;
      }

      if(typeof req.body.shoutarticle.tagList !== 'undefined'){
        req.shoutarticle.tagList = req.body.shoutarticle.tagList
      }

      

      req.shoutarticle.save().then(function(shoutarticle){
        return res.json({shoutarticle: shoutarticle.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete article
router.delete('/:shoutarticle', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.shoutarticle.author._id.toString() === req.payload.id.toString()){
      return req.shoutarticle.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an article
router.post('/:shoutarticle/favorite', auth.required, function(req, res, next) {
  var shoutarticleId = req.shoutarticle._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(shoutarticleId).then(function(){
      return req.shoutarticle.updateFavoriteCount().then(function(shoutarticle){
        return res.json({shoutarticle: shoutarticle.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unfavorite an article
router.delete('/:shoutarticle/favorite', auth.required, function(req, res, next) {
  var shoutarticleId = req.shoutarticle._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(shoutarticleId).then(function(){
      return req.shoutarticle.updateFavoriteCount().then(function(shoutarticle){
        return res.json({shoutarticle: shoutarticle.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// return an article's comments
router.get('/:shoutarticle/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.shoutarticle.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(shoutarticle) {
      return res.json({comments: req.shoutarticle.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// create a new comment
router.post('/:shoutarticle/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.shoutarticle = req.shoutarticle;
    comment.author = user;

    return comment.save().then(function(){
      req.shoutarticle.comments.push(comment);

      return req.shoutarticle.save().then(function(shoutarticle) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:shoutarticle/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.shoutarticle.comments.remove(req.comment._id);
    req.shoutarticle.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
