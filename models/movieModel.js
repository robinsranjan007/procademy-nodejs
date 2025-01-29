const mongoose = require('mongoose')
const fs = require('fs')

//this is the schema based on which we will create a model 
const movieSchema = new mongoose.Schema({
    name:
    {
      type:String,
      required:[true,'Name is required field'],
      unique:true,
      trim:true,
      maxlength:[100,'limit exceeded'],
      minlenght:[4,"limit less"],
      trim:true
    },
    description: {
      type:String,
      required:true,
      trim:true
      
    },
    duration:
    {
      type:Number,
      required:[true,'Duration is required'],
      
    },
    ratings:{
      type:Number,
      required:true,
      min:[1,'minimum should be one'],
       validate:{
        validator:function(val)
       {
        if(val>=1 && val<=10)
        {
            return true
        }
       },
      message:"rating should be more than 1 and below 10"
      }
    },
    totalRating:{
      type:Number,
      required:true
    },
    releaseYear:{
      type:Number,
      required:[true,'Release year is required field']
    },
    releaseDate:{
      type:Number,
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now(),
      select:false
    },
    genres:{
      type:[String],
      required:[true,'genres is required filed'],
      enum:{values:["Action","adventure","sci-fi"],
        message:"this genres doesnot exist "
      }
    },
    directors:{
      type:[String],
      required:[true,'Director is required field']
    },
    coverImage:{
      type:String,
      required:[true,'Cover image is required field']
    },
    actors:{
      type:[String],
      required:[true,"acotrs is the required field"]
    },
    price:{
      type:Number,
      required:[true,'price is the required filed']
    },
    createdBy:{
      type:String,
      required:[true,'created by is the required filed']
    } 
  },{
    toJSON:{virtuals:true},
    toObject: {virtuals:true}
  })
  
  
movieSchema.virtual('durationHrs').get(function (){
  return this.duration / 60;

})

movieSchema.pre('save',function(next){
  this.createdBy = 'Robins Ranjan'
  next()
})

movieSchema.post('save',function(doc,next){
  const cotent = `A new movie document with name ${doc.name} has been created by`
fs.writeFileSync('./../log/log.txt',content,{flag:'a'},(err)=>{
  console.log(err.message)
})
next()
})

//it's a query middle ware 
movieSchema.pre('find',function(next){
  this.find({releaseDate :{$lte:Date.now()}});
  next();
})
movieSchema.pre('find',function(docs,next){
  this.find({releaseDate :{$lte:Date.now()}});
  
  next();
})


  //this will be created inside the mongoose 
  const Movie = mongoose.model(
    'Movie',movieSchema)
  
//   const testMovie = new Movie({
//     name:"Die Hard",
//     description:"Action movie",
//     duration:180,
//     ratings:4.5
//   })
  
//   testMovie.save().then((val)=>{console.log(val)}).catch((err)=>{
//      console.log("error occured :"+err.message)
//   })


  module.exports =Movie
  