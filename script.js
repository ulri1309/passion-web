// ************ Indsamling af data ************************
// Henter URL Link
const url = "https://hiking-3bbe.restdb.io/rest/hiking";

// Henter API
const options = {
  headers: { "x-apikey": "631b3153fdc15b0265f17281" },
};

// Globale variabel - kunne stå json i stedet for.
let hikes;

// Tjekker at DOM er loaded
document.addEventListener("DOMContentLoaded", hentData);

// Vi henter data med fetch funktion via asynkron funktion
async function hentData() {
  const respons = await fetch(url, options);
  //vores json fil
  hikes = await respons.json();
  // kalder vi hikes funktion - gør det muligt at se alle hikes
  visHikes();
}

// ************** filtrering ****************************
// laver variabel, som sættes lige med alle -> så det er den generelle indstilling, når man kommer ind på siden.
let filter = "alle";

// Laver konstant der gør vi får fat i alle knapperne
const filterKnapper = document.querySelectorAll("nav button");

// Gør knapperne klikbarer og kalder anonym funktion
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerLande));

// konstant til h2 tekst
const textOverskrift = document.querySelector("header h2");

// kalder på filtrerlande
function filtrerLande() {
  // finder værdien der ligger i knappens data-attribut.
  filter = this.dataset.land;

  // fjerner klassen valgt fra alle
  document.querySelector(".valgt").classList.remove("valgt");

  // tilføjer klassen valgt til kategorierne der bliver klikket på
  this.classList.add("valgt");

  //Gør at h2 overskriften passer til den valgte kategori
  textOverskrift.textContent = this.textContent;

  // Kalder visHikes funktionen på ny
  visHikes();
}

// ***************** Loop view *******************************
// konstant for der indholdet skal i
const indhold = document.querySelector("section");

// konstant for templaten
const template = document.querySelector("template").content;

function visHikes() {
  console.log(filter);
  // fjerner indholdet i templaten
  indhold.textContent = "";
  //For hvert objekt i vores array skal der ske det der står inden i funktionen
  hikes.forEach((hike) => {
    console.log("land", hike.land);
    // Hvis filter er lig med land viser den en bestemt gruppe af lande ellers viser den alle.
    if (filter == hike.land || filter == "alle") {
      const klon = template.cloneNode(true);
      // Laver artiklen klikbar, for at kunne lave nyt vindue
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(hike));

      // Indhold
      klon.querySelector("img").src = "billeder/" + hike.billedfil;
      klon.querySelector("h2").textContent = hike.land;
      klon.querySelector("h3").textContent = hike.mountain;
      klon.querySelector("p").textContent = hike.shortDescription;
      indhold.appendChild(klon);
    }
  });
}

// Gør vi åbner en ny side
function visDetaljer(hike) {
  location.href = `enkeltside.html?id=${hike._id}`;
}


