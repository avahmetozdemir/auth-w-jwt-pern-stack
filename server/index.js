import express from "express"
import cors from 'cors'
import jwtAuth from './routes/jwtAuth.js'
import dashboard from './routes/dashboard.js'

const app = express()
const port = process.env.PORT || 5000

//middlewares 

app.use(cors())
app.use(express.json()) //allow us to access req.body


//Routes
app.get('/', (req,res)=> {
    res.send('Hello')
})
//register and login route

app.use('/auth', jwtAuth)

app.use('/dashboard',dashboard )

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}...`);
})