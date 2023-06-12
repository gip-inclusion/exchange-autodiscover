const express = require("express");
const xml2js = require("xml2js");
const router = express.Router();
const isExchangeUser = require('../lib/isExchangeUser.js');

/* GET home page. */
router.post("/autodiscover.xml", async function (req, res, next) {
  const isHTTPS = req.headers["x-forwarded-proto"] === "https";

  if (!isHTTPS) {
    return res.redirect(
      "https://inclusion-autodiscover-test.osc-fr1.scalingo.io/Autodiscover/Autodiscover.xml"
    );
  }

  const {
    Autodiscover: {
      Request: [
        {
          AcceptableResponseSchema: [schema],
          EMailAddress: [email],
        },
      ],
    },
  } = await xml2js.parseStringPromise(req.body.toString("utf-8"));

  const [username, domain] = email.split("@");

  if (!isExchangeUser(username)) {
    res.sendStatus(404);
  }

  res.set("content-type", "application/xml");
  res.render("autodiscover", {
    schema,
    email,
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
