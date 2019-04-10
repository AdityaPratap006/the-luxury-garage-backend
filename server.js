const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register.js');
const login = require('./controllers/login.js');
const profile = require('./controllers/profile.js');
const pay = require('./controllers/pay.js');
const cars = require('./controllers/cars.js');
const book = require('./controllers/book.js');
const invoice = require('./controllers/invoice.js');
const bookingHistory = require('./controllers/bookingHistory.js');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-clear-22143',
    user : 'postgres',
    password : 'kitu',
    database : 'the_luxury_garage'
  }
});

 /*db.select('*').from('users').then(data => {
	console.log(data);
});*/

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next)=>{
	console.log('<h1>Hello</h1>');
	next();
});

/*
/ --> res = this is working
/signin --> POST --> respond with success/fail
/register --> POST --> respond with new user object
/profile/:userId --> GET --> returns the user with the particular userId

*/



app.get('/',(req,res) => {
	
	res.send('It is working!');

});

app.post('/signin',(req,res) => {login.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res) => {profile.handleUserProfile(req,res,db)});

app.put('/paid', (req,res) => {pay.deductCredits(req,res,db)});

app.put('/renew', (req,res) => {pay.renewCredits(req,res,db)});

app.get('/cars/:type',(req,res) => { console.log('Fetching cars')
  cars.fetchCars(req,res,db)});

app.get('/cars/:type/:make/:model',(req,res) => {cars.getCarInfo(req,res,db)});

app.post('/book',(req,res) =>{book.checkAvailability(req,res,db)});

app.get('/invoice/:bookingid',(req,res)=>{invoice.getInvoice(req,res,db)});

app.get('/bookinghistory/:id',(req,res) => {bookingHistory.getList(req,res,db)});

app.listen(process.env.PORT || 4000,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
});