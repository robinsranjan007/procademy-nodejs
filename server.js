const dotenv=require('dotenv')
const app = require('./app.js');
const mongoose = require('mongoose')

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




app.listen( process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
  });
  