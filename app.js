var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    cloudinary = require('cloudinary');
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

//const fs = require ('fs');
const multer = require('multer');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) =>{
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

//app.use(session({ secret: 'conduit', cookie: { maxAge: 604800*48}, resave: false, saveUninitialized: false  }));
//60000
/*if (!isProduction) {
  app.use(errorhandler());
}*/

//mongodb://bizzshout:shoutout@ds139904.mlab.com:39904/bizzchat
//mongodb://localhost/conduit
//process.env.MONGODB_URI

/*if(isProduction){
  mongoose.connect('mongodb://bizzshout:shoutout@ds139904.mlab.com:39904/bizzchat');
} else {
  mongoose.connect('mongodb://bizzshout:shoutout@ds139904.mlab.com:39904/bizzchat'); 
  mongoose.set('debug', true);
}*/

//require('./models/User');
//require('./models/Article');
//require('./models/Bizarticle');
//require('./models/Shoutarticle');
//require('./models/Comment');
//require('./config/passport');

//app.use(require('./routes'));
//Image =require('./models/image');



//Handle uploads....
/*var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'public/images/')
	},
	 filename: function (req, file, cb) {
	  const ext = path.extname(file.originalname);
	  //cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
	  cb(null, file.fieldname + '-' + Date.now()+ext)
	}
  })
   
  var upload = multer({ storage: storage });

  app.post('/api/img', upload.any(), (req, res) => {
      //console.log(file.filename);
      if(req.files){
        req.files.forEach(function(file){
          //console.log(file);
        let ext = path.extname(file.originalname);
        let mainPath = file.filename;
        //let mainPath = "uploads/" + file.filename;
        console.log(mainPath);
        //fs.rename(file.path, 'public/images/'+file.filename, function(err){
          cloudinary.config({ 
            cloud_name: 'dkacztgxr', 
            api_key: '371365191119898', 
            api_secret: 'Jl9-zYipJ3tJaVkKiU4cwN8N8xA'
          });

          cloudinary.uploader.upload(file.path, function(result) { 
            console.log(result);
              //create an urembo product
              var image = new Image({
                title: req.body.title,
                content: req.body.content,
                image: result.secure_url//file.path// secure_url
            
              });
              //save the product and check for errors
              Image.addImage(image, (err, image, next) => {
                
                if(err){
                  throw err;
                }
                res.json(image);
                });
          
          });*/
       
      /* var image = new Image({
        title: req.body.title,
        content: req.body.content,
        image: mainPath//file.path
    
       });
    
      Image.addImage(image, (err, image, next) => {
        
        if(err){
          throw err;
        }
        res.json(image);
        });
  
     // });
      //file.path
      console.log(file.path)*/
    // });
  // }
//});

// shoutimages post;;;;;;;;;;;;;;;;;;;;;;;;;;;;

/*app.post('/api/shoutimages', upload.any(), (req, res) => {
  //console.log(file.filename);
  if(req.files){
    req.files.forEach(function(file){
      //console.log(file);
    let ext = path.extname(file.originalname);
    let mainPath = file.filename;
    //let mainPath = "uploads/" + file.filename;
    console.log(mainPath);
    fs.rename(file.path, 'public/shoutimages/'+file.filename, function(err){
   
   var image = new Image({
    title: req.body.title,
    content: req.body.content,
    image: mainPath//file.path

   });

  Image.addImage(image, (err, image, next) => {
    
    if(err){
      throw err;
    }
    res.json(image);
    });

  });
  //file.path
  console.log(file.path)
 });
}
});*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...

var server = app.listen( process.env.PORT || 8080, function(){
  console.log('Listening on port ' + server.address().port);
});

//https://morning-savannah-40616.herokuapp.com/ | https://git.heroku.com/morning-savannah-40616.git

