import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.funtranslations.com/translate/";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/translate", (req, res) => {
  res.render("translate.ejs", {
    output: "",
    inputText: "",
    selectedLanguage: "",
  });
});

app.get("/funModes", (req, res) => {
  res.render("random.ejs", { output: "", inputText: "", type: "" });
});

app.post("/funModes", async (req, res) => {
  const intext = req.body.text;

  try {
    const randomIndex = Math.floor(Math.random() * randomlang.length);
    const randLanguage = randomlang[randomIndex];
    const result = await axios.get(API_URL + randLanguage, {
      params: {
        text: intext,
      },
    });
    const translatedtext = result.data.contents.translated;
    res.render("random.ejs", {
      output: translatedtext,
      type: capitalize(randLanguage),
      inputText: intext,
    });
  } catch (error) {
    res.render("random.ejs", {
      output: "ERROR: Could not translate. Try again later.",
      inputText: intext || "",
      type: capitalize(randLanguage) || "",
    });
  }
});

app.post("/translate", async (req, res) => {
  const intext = req.body.text;
  const language = req.body.language;
  try {
    // const data=JSON.stringify(req.body);

    // console.log(data);
    // console.log(intext);
    // console.log(language);
    const result = await axios.get(API_URL + language, {
      params: {
        text: intext,
      },
    });
    const translatedtext = result.data.contents.translated;
    res.render("translate.ejs", {
      output: translatedtext,
      inputText: intext,
      selectedLanguage: language,
    });
  } catch (error) {
    res.render("translate.ejs", {
      output: "ERROR: Could not translate. Try again later.",
      inputText: intext || "",
      selectedLanguage: language || "",
    });
  }
});

app.get("/submit", (req, res) => {
  res.render("submit.ejs", { submitted: false });
});

app.post("/submit", (req, res) => {

  console.log("Idea submitted:", req.body);
  res.render("submit.ejs", { submitted: true });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});

const randomlang = [
  "morse",
  "morse2english",
  "morse/audio",
  "valspeak",
  "jive",
  "cockney",
  "brooklyn",
  "ermahgerd",
  "pirate",
  "minion",
  "ferblatin",
  "chef",
  "dolan",
  "fudd",
  "braille",
  "braille/dots",
  "braille/unicode",
  "braille/image",
  "braille/html",
  "sindarin",
  "quneya",
  "oldenglish",
  "shakespeare",
  "us2uk",
  "uk2us",
  "dothraki",
  "valyrian",
  "vulcan",
  "klingon",
  "piglatin",
  "yoda",
  "sith",
  "cheunh",
  "gungan",
  "mandalorian",
  "huttese",
];

function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
