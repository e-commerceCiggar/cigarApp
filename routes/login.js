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
        email: input.email
      },
      attributes: ["password"]
    })
    .then((result) => {
      let passCheck = bcrypt.compareSync(input.password, result.password)
      if (passCheck === true) {
        next()
      } else {
        res.render("login", {err: null})
      }
    })
    .catch(() => {
        res.render("login", {err: "email/password is invalid"});
    })
}, (req, res) => {
  let input = req.body;
  req.session.email = input.email;
  req.session.role = input.role
  res.redirect("/dashboard");
})

module.exports = login;
