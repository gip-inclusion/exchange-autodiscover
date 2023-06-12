const express = require("express");
const xml2js = require("xml2js");
const router = express.Router();
const isExchangeUser = require('../lib/isExchangeUser.js');

/* GET home page. */
router.get("/config-v1.1.xml", async function (req, res, next) {
  const { emailaddress } = req.query;
  const [username, domain] = emailaddress.split("@");

  if (!isExchangeUser(username)) {
    return res.sendStatus(404);
  }

  res.set("content-type", "application/xml");
  res.render("autoconfig", {
    emailaddress,
    username,
    domain,
    smtp: {
      host: "ex5.mail.ovh.net",
      port: 587,
    },
    imap: {
      host: "ex5.mail.ovh.net",
      port: 993,
    },
  });
});

module.exports = router;
