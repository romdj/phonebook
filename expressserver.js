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
app.get("/api/hello", sayHi);
app.post("/api/phonebook", addContact);
app.post("/api/phonebook/:contactId", editContact);
app.delete("/api/phonebook/:contactId", deleteContact);
app.get("/api/phonebooks", getContacts);
app.get("/api/phonebook/:contactId", getContact);

// SERVE APPLICATION FILES (HTML/CSS/JS/)
app.use(express.static('Application'))
app.listen(8080);

function addContact(req, res) {
  if (isValidContact(req.body.name, req.body.tel)) {
    const newContact = new Contact({
      name: req.body.name,
      tel: req.body.tel
    });
    newContact.save().then(() => console.log('contact created with info', newContact));
    res.status(200).send('Added new Contact');
  } else {
    res.status(200).send('Invalid Contact Information provided');
  }
}

function deleteContact(req, res) {
  Contact.deleteOne({
    _id: req.params.contactId
  }, (err) => {
    if (err) {
      console.log('couldn\'t delete element', req.params.contactId);
      res.status(500).send('Error at Deletion: ');
    } else {
      console.log('deleted element:', req.params.contactId);
      res.status(200).send('deleted Contact');
    }
  })
}

function getContacts(req, res) {
  Contact.find((err, dbres) => {
    if (err)
      console.error('error fetching data');
    res.status(200).send(dbres);
  });
}

function editContact(req, res) {
  if (isValidContact(req.body.name, req.body.tel)) {
    Contact.findByIdAndUpdate(
      req.params.contactId, {
        name: req.body.name,
        tel: req.body.tel
      },
      (err, dbres) => {
        if (err)
          console.error('error updating data', err);
        res.status(200).send(dbres);
      });
  } else {
    console.error('invalid data');
    res.status(410).send('invalid data');
  }
}

function getContact(req, res) {
  Contact.findById(req.params.contactId, (err, dbres) => {
    if (err)
      console.error('error fetching Contact', err);
    res.status(200).send(dbres);
  });
}

function isValidContact(name, tel) {
  if (name === undefined || tel === undefined) return false;
  if (name.length <= 0) return false;
  if (tel.length <= 0) return false;
  const numberValidator = /\+[0-9]{1,4}\ [0-9]{2}\ [0-9]{6,}/;
  if (!numberValidator.exec(tel)) return false;
  return true;
}

function sayHi(req, res) {
  res.status(200).send('World!');
}