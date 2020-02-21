const hbs = require("express-handlebars");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const getWeather = require("./lib/getWeather");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.get('/', (req, res) => {
    res.render('index');
});

app.post("/", async (req, res) => {
  let location = req.body.location;
  let countryCode = req.body.countryCode;
  console.log(location);
  console.log(countryCode);
  
  let data = await getWeather(location, countryCode);
  // console.log(data);
  let name = data.name;
  // let country = data.sys.country;
  let temp = data.main.temp;
  let description = data.weather[0].description;
  let windSpeed = data.wind.speed;
  let pressure = data.main.pressure;
  let humidity = data.main.humidity;
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let icon = data.weather[0].icon;

  res.render("index", {data: {
    temp,
    name,
    // country,
    description,
    icon,
    windSpeed,
    pressure,
    humidity,
    sunrise,
    sunset
  }}); //render the index.hbs page
});

app.listen(3003, () => {
  console.log("server listening on 3003");
});
