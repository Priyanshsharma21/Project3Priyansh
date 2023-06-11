import express from 'express'
import router from './routes/route.js'


const app = express()


// global middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))



// routing middlewares
app.use('/',router)




export default app