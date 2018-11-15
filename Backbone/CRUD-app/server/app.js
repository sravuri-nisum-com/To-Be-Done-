var express = require('express')
   ,mongoose = require('mongoose')
   ,http = require('http')
   ,path = require('path')
   ,bodyparser = require('body-parser')
   ,cors = require('cors');

var app = express();
mongoose.connect("mongodb://localhost/contactManager");
var ContactsSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email_address:String,
    mobile_number:String


});
var Contacts = mongoose.model("contacts",ContactsSchema);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
    console.log('connected to database mongodb   @ 27017');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error in database connection:' + err);
    }

});


    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.text());
    app.use(bodyparser.json({ type: 'application/json' })); 
  
  app.use(cors());



  
  app.get("/contacts", (req,res) => {
    Contacts.find({},(err,docs)=> {
      if(err) throw err;
      res.send(docs);
    });
  });

  app.post("/contacts", (req,res) =>{
     var contact = new Conatacts ({
         first_name :req.body.first_name,
         last_name :req.body.last_name,
         email_address:req.body.email_address,
         mobile_number :req.body.mobile_number
     }).save((err,doc)=>{
         if(err) throw err;
         res.send(docs);
     });
  });
  
  app.put("/contacts/:id", (req,res)=>{
      var id=req.param.id;
      Contacts.findById(id,(err,contact) =>{
          if(err) throw err;
          contact.first_name = req.body.first_name,
      contact.last_name = req.body.last_name,
      contact.email_address= req.body.email_address,
      contact.mobile_number = req.body.mobile_number
      contact.save((err)=>{
        if(err) throw err;
        res.send(contact);
      });
      });

  });

  app.del("/contacts/:id", (req,res)=>{
    var id = req.params.id;
    Contacts.findById(id, (err, contact)=> {
        contact.remove( (err) => {
          if(err) throw err;
  
        });
      });
  });

  app.get('/', (req, res) => {
    res.send('hi');

});

const port = 3200;
app.listen(port, () => {
    console.log('server started running at port' + port);

});
//   http.createServer(app).listen(app.get('port'), ()=>{
//     console.log("Express server listening on port " + app.get('port'));
//   });