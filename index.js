const express = require('express')

const dotenv = require("dotenv");
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const userRoute   = require('./routes/userRoute')
const appRoute = require('./routes/appRoute')
const passport = require('passport')
const app = express()
//app.use(bodyParser.json());
dotenv.config();
//app.use(express.json());
require('./passport')(passport)

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg =req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    
    next()
})

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());

app.use(expressLayouts)
app.set('view engine', 'ejs')


mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => console.log(err))


app.use('/' , appRoute)
app.use('/users' , userRoute)

const PORT = process.env.PORT || 6500;

app.listen(PORT, console.log(`Server is running on port ${PORT}`))