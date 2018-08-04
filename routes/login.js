const login = require('express').Router();
const Model = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');

login.get("/", (req, res) => {
  res.render("login", {
    err: null,
  });
})

login.post("/", (req, res, next) => {
  let input = req.body;
  Model.Client.findOne({
      where: {
        email: input.email,
        role: input.role,
      },
    })
    .then((result) => {
      let passCheck = bcrypt.compareSync(input.password, result.password)
 
      if (passCheck === true) {
        let input = req.body;

        req.session.UserId = result.id
        req.session.email = input.email;
        req.session.role = input.role
        req.session.firstName = result.firstName
        req.session.lastName = result.lastName
        req.session.phone = result.phone
        req.session.createdAt = result.createdAt

        next()
      } else {
        res.render("login", {err: null})
      }
    })
    .catch(() => {
        res.render("login", {err: "email/password is invalid"});
    })
}, (req, res) => {

  if (req.session.role == 'User') {
    res.redirect("/dashboard");
  } else if (req.session.role == 'Admin') {
    res.redirect("/admin")
  } else {
    res.redirect('/')
  }
  
})

module.exports = login;
