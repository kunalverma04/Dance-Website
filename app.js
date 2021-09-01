const express=require("express");
const path=require("path");
const alert=require("alert");
// var popupS = require("popups");
const app=express();
const port=85;
//MongoDb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
//schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    query:String

  });

//model
const contact = mongoose.model('contact2', ContactSchema);  


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))//ye likhna padta he data form se idar lane ke liye

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    // const params = {}
    res.status(200).render('index.pug');
})
app.get('/ContactUs', (req, res)=>{
    res.status(200).render('ContactUs.pug');
})
app.post("/ContactUs", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    // res.send("submitted");
    // alert("submitted")
    res.render('ContactUs.pug')
    alert('Thanyou for Submiting ,We will get Back To You Soon.')

}).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})

})
app.get('/AboutUs', (req, res)=>{
    res.status(200).render('aboutUs.pug');
})

app.get('/ClassInfo', (req, res)=>{
    res.status(200).render('ClassInfo.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

