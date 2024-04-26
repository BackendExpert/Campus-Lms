const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const path = require('path')

const resourceLimits = require('worker_threads');
const e = require('express');
const { stat } = require('fs');


const app = express();
const PORT = process.env.PORT || 8081

//file  upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    }, 
    filename:(req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
  
const upload = multer({
    storage:storage
})


//make connection between dbsever and node app

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "project_lms"
})
//email Sending - Nodemailer transporter

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});


// middleware
app.use(express.json())
app.use(cors())
app.use(express.static('public')); 

// all end pints start

// endpint for email subscribe

app.post('/EmailSubscribe', (req, res) => {
    const checkSql = "SELECT * FROM email_subscribe WHERE Email = ?"
    connection.query(checkSql, [req.body.email], (err, result) => {
        if(err) throw err
        
        if(result.length === 0){
            const sql = "INSERT INTO email_subscribe(email) VALUES (?)";            

            const values = [
                req.body.email,
            ]            

            connection.query(sql, [values], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server1"})
                    // console.log(err)
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }   
        else{
            return res.json({Error: "You Already Subscribe for Updates"})
        }
    })
})

// SignUp endPoint

app.post('/SignUp', (req, res) => {
    console.log(req.body)

    const checkSql = "SELECT * FROM users WHERE email = ?"
    connection.query(checkSql, [req.body.email], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                if(err) throw err

                const role = "user"
                const is_active = 1
                const create_at = new Date

                const sql = "INSERT INTO users(username, email, create_at, role, is_active, password) VALUES (?)"
                const values = [    
                    req.body.username,
                    req.body.email,
                    create_at,
                    role,
                    is_active,
                    hashPass             
                ]

                connection.query(sql, [values], (err, result) => {
                    if(err) {
                        return res.json({Error: "Error on Server1111"})
                        // console.log(err)
                    }
                    else{
                        return res.json({Status: "Success"})
                    }
                })
            })
        }
        else{
            return res.json({Error: "You Already Registered"})
        }
    })
})

// end point for SignIn

app.post('/SignIn', (req, res) => {
    console.log(req.body)

    const sql = "SELECT * FROM users WHERE email = ?"
    connection.query(sql, [req.body.email], (err, result) => {
        if(err) throw err

        if(result.length > 0){
            const password = req.body.password;
            bcrypt.compare(password, result[0].password, (err, passMatch) => {
                if(err) throw err

                if(passMatch){
                    //generate JWT Token
                    const token = jwt.sign(
                        {email: result[0].email, role: result[0].role, is_active: result[0].is_active},
                        'your-secret-key',
                        {expiresIn: '1h'}
                    );
                    res.json({Token: token, Msg: "Success", LoginUser:result})
                    console.log(result)
                }
                else{
                    return res.json({Error: "Password Not Match"})
                }
            })
        }
        else{
            return res.json({Error: "No User Found...."})
        }
    })
})

// Add new Book
app.post('/AddBook', (req, res) => {
    console.log(req.body)
})

// all end points end

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));