var express = require("express");
var router = express.Router();

let products = [
  {
    link: "https://www.premierleague.com/players/4330/David-de-Gea/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p51940.png",
    jerseynum: "1",
    name: "David de Gea",
    position: "Goalkeeper",
    Nationality: "Spain",
    Appearances: "16",
    Cleansheets: "7",
  },
  {
    link: "https://www.premierleague.com/players/2933/Tom-Heaton/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p21205.png",
    jerseynum: "22",
    name: "Tom Heaton",
    position: "Goalkeeper",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
  },
  {
    link: "https://www.premierleague.com/players/21881/Nathan-Bishop/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p250370.png",
    jerseynum: "30",
    name: "Nathan Bishop",
    position: "Goalkeeper",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
  },
  {
    link: "https://www.premierleague.com/players/5066/Victor-Lindel%C3%B6f/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p184667.png",
    jerseynum: "2",
    name: "Victor Lindelöf",
    position: "Defender",
    Nationality: "Sweden",
    Appearances: "5",
    Cleansheets: "0",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/3820/Phil-Jones/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p76359.png",
    jerseynum: "4",
    name: "Phil Jones",
    position: "Defender",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/9566/Harry-Maguire/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png",
    jerseynum: "5",
    name: "Harry Maguire",
    position: "Defender",
    Nationality: "England",
    Appearances: "6",
    Cleansheets: "1",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/5782/Rapha%C3%ABl-Varane/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p90152.png",
    jerseynum: "19",
    name: "Raphaël Varane",
    position: "Defender",
    Nationality: "France",
    Appearances: "12",
    Cleansheets: "5",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/24252/Diogo-Dalot/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p216051.png",
    jerseynum: "20",
    name: "Diogo Dalot",
    position: "Defender",
    Nationality: "Portugal",
    Appearances: "13",
    Cleansheets: "5",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/4608/Luke-Shaw/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p106760.png",
    jerseynum: "23",
    name: "Luke Shaw",
    position: "Defender",
    Nationality: "England",
    Appearances: "12",
    Cleansheets: "5",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/14164/Aaron-Wan-Bissaka/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p214590.png",
    jerseynum: "29",
    name: "Aaron Wan-Bissaka",
    position: "Defender",
    Nationality: "England",
    Appearances: "3",
    Cleansheets: "2",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/13559/Axel-Tuanzebe/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p180804.png",
    jerseynum: "38",
    name: "Axel Tuanzebe",
    position: "Defender",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/23581/Tyrell-Malacia/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p222690.png",
    jerseynum: "12",
    name: "Tyrell Malacia",
    position: "Defender",
    Nationality: "Netherlands",
    Appearances: "11",
    Cleansheets: "4",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/67191/Lisandro-Mart%C3%ADnez/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p221820.png",
    jerseynum: "6",
    name: "Lisandro Martínez",
    position: "Defender",
    Nationality: "Argentina",
    Appearances: "14",
    Cleansheets: "5",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/107833/Rhys-Bennett/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    jerseynum: "66",
    name: "Rhys Bennett",
    position: "Defender",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/23834/Brandon-Williams/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p232937.png",
    jerseynum: "33",
    name: "Brandon Williams",
    position: "Defender",
    Nationality: "England",
    Appearances: "0",
    Cleansheets: "0",
    Goals: "0",
  },
  {
    link: "https://www.premierleague.com/players/5906/Fred/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p101582.png",
    jerseynum: "17",
    name: "Fred",
    position: "Midfielder",
    Nationality: "Brazil",
    Appearances: "13",
    Goals: "2",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/23396/Bruno-Fernandes/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png",
    jerseynum: "8",
    name: "Bruno Fernandes",
    position: "Midfielder",
    Nationality: "Portugal",
    Appearances: "15",
    Goals: "2",
    Assists: "2",
  },
  {
    link: "https://www.premierleague.com/players/14824/Scott-McTominay/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p195851.png",
    jerseynum: "39",
    name: "Scott McTominay",
    position: "Midfielder",
    Nationality: "Scotland",
    Appearances: "12",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/108972/Facundo-Pellistri/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p488404.png",
    jerseynum: "28",
    name: "Facundo Pellistri",
    position: "Midfielder",
    Nationality: "Uruguay",
    Appearances: "0",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/11031/Donny-van-de-Beek/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p180184.png",
    jerseynum: "34",
    name: "Donny van de Beek",
    position: "Midfielder",
    Nationality: "Netherlands",
    Appearances: "6",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/4845/Christian-Eriksen/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p80607.png",
    jerseynum: "14",
    name: "Christian Eriksen",
    position: "Midfielder",
    Nationality: "Denmark",
    Appearances: "15",
    Goals: "1",
    Assists: "5",
  },
  {
    link: "https://www.premierleague.com/players/5793/Casemiro/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p61256.png",
    jerseynum: "18",
    name: "Casemiro",
    position: "Midfielder",
    Nationality: "Brazil",
    Appearances: "13",
    Goals: "1",
    Assists: "2",
  },
  {
    link: "https://www.premierleague.com/players/70136/Zidane-Iqbal/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    jerseynum: "55",
    name: "Zidane Iqbal",
    position: "Midfielder",
    Nationality: "Iraq",
    Appearances: "0",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/108936/Kobbie-Mainoo/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    jerseynum: "73",
    name: "Kobbie Mainoo",
    position: "Midfielder",
    Nationality: "England",
    Appearances: "0",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/68987/Alejandro-Garnacho/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p493105.png",
    jerseynum: "49",
    name: "Alejandro Garnacho",
    position: "Forward",
    Nationality: "Argentina",
    Appearances: "5",
    Goals: "1",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/13565/Marcus-Rashford/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
    jerseynum: "10",
    name: "Marcus Rashford",
    position: "Forward",
    Nationality: "England",
    Appearances: "16",
    Goals: "6",
    Assists: "3",
  },
  {
    link: "https://www.premierleague.com/players/14801/Jadon-Sancho/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p209243.png",
    jerseynum: "25",
    name: "Jadon Sancho",
    position: "Forward",
    Nationality: "England",
    Appearances: "10",
    Goals: "2",
    Assists: "1",
  },
  {
    link: "https://www.premierleague.com/players/49259/Anthony-Elanga/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p449434.png",
    jerseynum: "36",
    name: "Anthony Elanga",
    position: "Forward",
    Nationality: "Sweden",
    Appearances: "12",
    Goals: "0",
    Assists: "1",
  },
  {
    link: "https://www.premierleague.com/players/11272/Anthony-Martial/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p148225.png",
    jerseynum: "9",
    name: "Anthony Martial",
    position: "Forward",
    Nationality: "France",
    Appearances: "7",
    Goals: "3",
    Assists: "2",
  },
  {
    link: "https://www.premierleague.com/players/64142/Shola-Shoretire/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p472464.png",
    jerseynum: "47",
    name: "Shola Shoretire",
    position: "Forward",
    Nationality: "England",
    Appearances: "0",
    Goals: "0",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/75381/Antony/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/p467169.png",
    jerseynum: "21",
    name: "Antony",
    position: "Forward",
    Nationality: "Brazil",
    Appearances: "8",
    Goals: "3",
    Assists: "0",
  },
  {
    link: "https://www.premierleague.com/players/63842/Charlie-McNeill/overview",
    image:
      "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    jerseynum: "56",
    name: "Charlie McNeill",
    position: "Forward",
    Nationality: "England",
    Appearances: "0",
    Goals: "0",
    Assists: "0",
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("header", { title: "Express" });
});
router.get("/h", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("user/login", { title: "Express" });
});
router.get("/signup", function (req, res, next) {
  res.render("user/signup", { title: "Express" });
});
router.get("/product", function (req, res, next) {
  res.render("user/productlist", { products });
});
module.exports = router;
