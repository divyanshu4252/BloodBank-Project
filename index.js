const express=require ('express')
const bodyParser = require ('body-parser')
const routers = require ('./routers')
const app = express()
const port = 8080
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/',routers)
app.set('view engine','hbs')
app.set('views','views')
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})
