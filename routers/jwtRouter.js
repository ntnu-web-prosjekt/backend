const express = require("express"); // library for generating symmetric key for jwt
const crypto = require("crypto");
const router = express.Router();
const JWT = require("../controllers/jwtController.js");
const dot = require("dotenv");

const jose = require("jose");

async function signJwt() {
  const jwt = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h");

  console.log(jwt);
}

async function verifyJwt(_JWT, _publicKey) {
  const { payload, protectedHeader } = await jose.jwtVerify(_JWT, _publicKey, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  });

  console.log(protectedHeader);
  console.log(payload);
}

// GET
router.get("/", signJwt, function (req, res) {
  res.send("Success");
});

module.exports = router;
