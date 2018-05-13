const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact', {
  name: String,
  tel: String
});
app.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded());

mongoose.connect('mongodb://localhost/phonebook')
  .then(() => {
    console.log('successfully connected to mongo db');
  })
  .catch((err) => {
    console.log('failed connecting to mongo db', err);
  });

// REST API FOR DB
app.get("/api/hello", hello);
app.post("/api/phonebook", addPhonebook);
app.delete("/api/phonebook/:phonebookId", delPhonebook);
app.get("/api/phonebooks", getPhonebooks);
app.get("/api/phonebook/:phonebook", getPhonebook);

// SERVE APPLICATION FILES (HTML/CSS/JS/)
app.use(express.static('Application'))
app.listen(8080);

function addPhonebook(req, res) {
  const newContact = new Contact({
    name: req.body.name,
    tel: req.body.tel
  });
  newContact.save().then(() => console.log('contact created with info', newContact, req.body.name, req.body.tel));
  res.status(200).send('Added new Contact');
}

function delPhonebook(req, res) {
  Contact.deleteOne({
    _id: req.params.phonebookId
  }, (err) => {
    if (err) {
      console.log('couldn\'t delete element', req.params.phonebookId);
      res.status(500).send('Error at Deletion: ');
    } else {
      console.log('deleted element:', req.params.phonebookId);
      res.status(200).send('deleted Contact');
    }
  })
}

function getPhonebooks(req, res) {
  let data = Contact.find((err, dbres) => {
    if (err)
      console.error('error fetching data');
    res.status(200).send(dbres);
  });
}

function getPhonebook(req, res) {

}

function isValidContact(contactObj) {

}

function hello(req, res) {
  res.status(200).send('World!');
}