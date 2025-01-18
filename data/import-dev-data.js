const mongoose = require('mongoose')
const dotenv= require('dotenv')
const fs = require('fs')
const Movie = require('./../models/movieModel')

dotenv.config({path:'./config.env'})


//this will return a promise so we are using promise
mongoose.connect(process.env.CONN_STR,{
  useNewUrlParser:true
}).then((conn)=>{
// console.log(conn);
console.log('DB Connection Successful');
}).catch((err)=>{
  console.log(err.message)
})




//read movies json file

const movies = JSON.parse(fs.readFileSync('./data/movies.json','utf-8'))


//delete existing movie in the mongodb collection if present 
const deleteMovies = async ()=>{
  try{
   await Movie.deleteMany();
    console.log('data successfully deleted')
  }catch(err)
  {
console.log(err.message)
  }
  process.exit()
}


//import movies data to mongodb collection

const importMovies = async ()=>{
  try{
   await Movie.create(movies);
    console.log('data successfully uploaded')
  }catch(err)
  {
console.log(err.message)
  }
  process.exit()
}



console.log(process.argv);

if(process.argv[2]== '--import')
{
  importMovies()
}

if(process.argv[2]== '--delete')
 {

    deleteMovies()
}
  