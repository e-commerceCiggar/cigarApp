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
        role: input.role
      },
      attributes: ["password"]
    })
    .then((result) => {
      let passCheck = bcrypt.compareSync(input.password, result.password)
      console.log(passCheck)
      if (passCheck === true || req.body.role === 'Admin') {
        next()
      } else {
        res.render("login", {err: "hash invalid"})
      }
    })
    .catch(() => {
        res.render("login", {err: "email/password is invalid"});
    })
}, (req, res) => {
  let input = req.body;
  console.log(input.role)
  req.session.email = input.email;
  req.session.role = input.role

  if (req.session.role == 'User') {
    res.redirect("/dashboard");
  } else if (req.session.role == 'Admin') {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }

})

module.exports = login;
