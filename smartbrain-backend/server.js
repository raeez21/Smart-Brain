import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import { handleApiCall, handleImage } from './controllers/image.js'
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'hashinclude',
      database : 'smartbrain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors())



app.get('/',(req,resp)=>{
    resp.send("Succes")
})


app.post('/signin', (req, resp)=>{
    handleSignIn(req, resp, db, bcrypt)
})


app.post('/register', (req,resp) => {
    handleRegister(req,resp,db,bcrypt)
    })


app.get('/profile/:id', (req,resp)=>{
    handleProfile(req,resp,db)
})

app.put('/image',(req,resp)=>{
    handleImage(req,resp,db)
})
app.post('/imageurl',(req,resp)=>{
    handleApiCall(req,resp)
})
const PORT = process.env.PORT || 3000 
app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT:`,PORT)
})
/*
DIFFErent APIS we may need:
/ --> res = this is working
/signin --> POST success/fail
/register --> POST = uer
/profile/:userID --> GET=user
/image --> Put  --> user


*/