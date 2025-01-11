//first step to create a server is import http

const http = require("http")
// const fs = require("fs")
// const { join } = require("path")
// const url = require("url")

// const events = require("events")

// const user= require("./modules/user.js")

//  const replaceHTML=  require('./modules/replace.js')

//example for reading html file

// const index=fs.readFileSync('./template/index.html','utf-8')
// const about =fs.readFileSync('./template/about.html','utf-8')
// const productDetails = fs.readFileSync('./template/productdetails.html','utf-8')

// const products= JSON.parse(fs.readFileSync('./data/product.json','utf-8')) //JSON.PARSE converts json object into java script object


// let productsHTML = fs.readFileSync('./template/product.html','utf-8')
 

 



//you cannot directly read into the JSON data so you need to conver it into the js objects now y9ou can fetch the data from the js.


//reading the html page transforming the json data into html



//second step create a server

// const server=http.createServer((req,res)=>{

//    let {query,pathname:path}= url.parse( req.url,true)
 

//     if(path==='/' || path ==='/products')
//     {
//         res.writeHead(200,{
            
//             "fname": "robins",
//             "lname": "ranjan",
//             "App-Version": "1.0.0"
//         })
        
//        if(!query.id)
//        {

//        let productHtmlArray= products.map((val)=>{
//            return replaceHTML(productsHTML,val)
//         })

//       let  produtresponsehtml=   index.replace('{{%CONTENT%}}',productHtmlArray.join(','))

//           res.end(produtresponsehtml)
//        }
//        else
//        {
//         let prod=products[query.id]
//        let procductDetailHtml= replaceHTML(productDetails,prod)
//         res.end(index.replace('{{%CONTENT%}}',procductDetailHtml))
//        }


//     }
//     else if(path ==='/about')
//     {
//         res.writeHead(200,{
           
//             "fname": "robins",
//             "lname": "ranjan",
//             "App-Version": "1.0.0"
//         })
//         res.end(about)
//     }
//     else if(path === '/products')
//     {
//         res.writeHead(200,{
//         "status":"sucess"
//         })

//         res.end('products')

        

    
         
//     }
//    else
//    {
//     res.writeHead(400)
//     res.end('404 error')
//    }
// })

const server= http.createServer()

// server.on('request',(req,res)=>{

//     let {query,pathname:path}= url.parse( req.url,true)
 

//     if(path==='/' || path ==='/products')
//     {
//         res.writeHead(200,{
            
//             "fname": "robins",
//             "lname": "ranjan",
//             "App-Version": "1.0.0"
//         })
        
//        if(!query.id)
//        {

//        let productHtmlArray= products.map((val)=>{
//            return replaceHTML(productsHTML,val)
//         })

//       let  produtresponsehtml=   index.replace('{{%CONTENT%}}',productHtmlArray.join(','))

//           res.end(produtresponsehtml)
//        }
//        else
//        {
//         let prod=products[query.id]
//        let procductDetailHtml= replaceHTML(productDetails,prod)
//         res.end(index.replace('{{%CONTENT%}}',procductDetailHtml))
//        }


//     }
//     else if(path ==='/about')
//     {
//         res.writeHead(200,{
           
//             "fname": "robins",
//             "lname": "ranjan",
//             "App-Version": "1.0.0"
//         })
//         res.end(about)
//     }
//     else if(path === '/products')
//     {
//         res.writeHead(200,{
//         "status":"sucess"
//         })

//         res.end('products')

    
         
//     }
//    else
//    {
//     res.writeHead(400)
//     res.end('404 error')
//    }


// })


//third step start server

server.listen(8000,'127.0.0.1',()=>{
    console.log('server has started')
})



// let myEmitter = new user();


// myEmitter.on('userCreated',(id,name)=>{
//     console.log(`a new user ${name}  with id : ${id} is created`)
// })

// myEmitter.on("userUpdated",(id ,name)=>{
// console.log(`user is updated with id: ${id} and name is : ${name}`)
// })


// myEmitter.emit('userCreated',101,'jhon')

// myEmitter.emit('userUpdated',102,'nick')


