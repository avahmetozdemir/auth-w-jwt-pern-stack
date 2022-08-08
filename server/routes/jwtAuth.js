import express from 'express'
import pool from '../db.js'
import bcyrpt from 'bcrypt'
import jwtGenerator from '../utils/jwtGenerator.js'
import validInfo from '../middlewares/validInfo.js'
import authorization from '../middlewares/authorization.js'
const router = express.Router()

//register

router.post('/register',validInfo, async(req,res)=> {
    try {
        //1.destrucuture the req.body (name,email,password)
        const {name,email, password}= req.body        

        //2. check if user exist (if user exist throw an error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length !== 0) {
            return res.status(401).json('User already exist')
        }

        //3. Bcrypt the user password 

        const saltRound = 10
        const salt = await bcyrpt.genSalt(saltRound)

        const bcyrptPassword = await bcyrpt.hash(password, salt)

        //4. enter the new user inside our db
        
        const newUser = await pool.query("INSERT INTO users (user_name,user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [name,email,bcyrptPassword])

        //5. generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

router.post('/login',validInfo, async(req,res)=> {
    try {
        //1. destructure the req.body
        const {email, password}  =req.body

        //2. check if the user doesnot exist(if not then we throw error)
        const user  = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length === 0) {
            return res.status(401).json('Password or email is incorret')
        }
        //3. check if incoming password is the same the database password 
        const validPassword  = await bcyrpt.compare(password, user.rows[0].user_password)
        
        if(!validPassword){
            return res.status(401).json('Password or email is incorret')
        }
        //give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        
        res.json({token})
    } catch (error) {
        console.log(error.message);
        
    }
})

router.get('/is-verify',authorization, async (req,res)=> {
    try {
        res.json(true)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})


export default router