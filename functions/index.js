const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API home route
app.get("/", (req, res) =>
  res.status(200).send("<h1>Welcome To Enye Challenge-Backend<h1/>")
);

// Api rates route
app.get("/api/rates", (req, res) => {
  let { base, currency } = req.query;
  base = base.toUpperCase();
  currency = currency.toUpperCase();

  axios
    .get("https://api.exchangeratesapi.io/latest")
    .then((response) => {
      const rates = response.data.rates;
      const initialBase = response.data.base;
      let newRates;
      const date = new Date().toISOString().slice(0, 10);

      if (currency.length > 3) {
        currency = currency.split(",");
      } else {
        currency = [currency];
      }

      if (base === initialBase) {
        newRates = Object.keys(rates).reduce((object, key) => {
          if (currency.includes(key)) {
            object[key] = rates[key];
          }
          return object;
        }, {});
      } else {
        const baseValue = rates[base];
        const exc = 1 / baseValue;

        newRates = Object.keys(rates).reduce((object, key) => {
          if (key !== base && currency.includes(key)) {
            object[key] = rates[key];
          }
          return object;
        }, {});

        for (rate in newRates) {
          newRates[rate] = (newRates[rate] / baseValue).toFixed(9);
        }

        if (currency.includes("EUR")) {
          newRates.EUR = exc.toFixed(9);
        }
      }
      res.status(200).json({
        results: {
          base,
          date,
          rates: newRates,
        },
      });
    })
    .catch((err) =>
      res.status(400).json("Can not get the request at this momoment")
    );
});

// - Listen command
exports.api = functions.https.onRequest(app);
// local endpoint
// http://localhost:5001/enye-assignment/us-central1/api//
