
// Henter URL Link
const url = "https://hiking-3bbe.restdb.io/rest/hiking";

// Henter API
const options = {
  headers: { "x-apikey": "631b3153fdc15b0265f17281" },
};

// Globale variabel
let lande;

// // Tjekker at DOM er loaded
// document.addEventListener("DOMContentLoaded", start);
// function start() {
//   console.log("loaded");
// }

// Vi henter data med fetch funktion vi asynkron funktion
async function hentData() {
  const respons = await fetch(url, options);
  lande = await respons.json();
  console.log("land", lande);
  vis();
}

hentData();
