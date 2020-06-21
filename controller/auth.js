const mongoose = require('mongoose');
const User = require('../models/user');
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import userServices from '../services/user';
exports.user_sign = async (req, res, next) => {
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {
    username,
    email,
    password
  } = req.body;
  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    }

    user = new User({
      username,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        name: user.username,
        id: user.id,
        email: user.email,

      }
    };

    jwt.sign(
      payload,
      "randomString", {
      expiresIn: 10000
    },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }



};
exports.user_login = async (req, res, next) => {
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ];
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });

    const payload = {
      user: {
        name: user.username,
        id: user.id,
        email: user.email,
      }
    };

    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 100 * 60
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }



};
