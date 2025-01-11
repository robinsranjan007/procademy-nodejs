const dotenv=require('dotenv')
const app = require('./app.js');


dotenv.config({path:'./config.env'})
 
console.log(process.env);




app.listen( process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
  });
  