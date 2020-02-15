const hbs = require("hbs");
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", Name: "Filip Petkovski" });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Built by Filip Petkovski",
    Name: "Filip Petkovski"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }
  address = req.query.address;
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    contact: "flp_petkovski@yahoo.com",
    Name: "Filip Petkovski"
  });
});

app.get("help/*", (req, res) => {
  res.render("error", {
    title: "404",
    Name: "Filip Petkovski",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    Name: "Filip Petkovski",
    errorMessage: "Help article not found"
  });
});

app.listen(port, () => {
  console.log(chalk.green.inverse(`The Server is Running on ${port}`));
});
