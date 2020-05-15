$(document).ready(function () {
  let ships = [
    { Name: "Space Shuttle", Speed: 17000 },
    { Name: "Falcon 9", Speed: 25000 },
    { Name: "Serenity", Speed: 400000 },
    { Name: "USS Enterprise", Speed: 500400000 },
    { Name: "Millennium Falcon", Speed: 100400000 },
    { Name: "Tardis", Speed: -1 },
  ];

//information about planets found in the discover tab
  let details = {
    Moon: {
      image: "assets/images/moon-des.png",
      profile: {
        Diameter: "3,475 km",
        Mass: "7.35 × 10^22 kg (0.01 Earths)",
        Orbits: "The Earth",
        OrbitDistance: "384,400 km",
        OrbitPeriod: "27.3 days",
        SurfaceTemperature: "-233 to 123 °C",
      },
      facts: [
        "The dark side of the moon is a myth.",
        "In reality both sides of the Moon see the same amount of sunlight however only one face of the Moon is ever seen from Earth.",
        "This is because the Moon rotates around on its own axis in exactly the same time it takes to orbit the Earth, meaning the same side is always facing the Earth. The side facing away from Earth has only been seen by the human eye from spacecraft.",
      ],
    },
    Mars: {
      image: "assets/images/mars-des.jpg",
      profile: {
        Diameter: "6,792 km",
        Mass: "6.39 × 10^23 kg(0.11 Earths)",
        Moons: "2 (Phobos & Deimos)",
        OrbitDistance: "687 days (1.9 years)",
        SurfaceTemperature: "-87 to -5 °C",
      },
      facts: [
        "Mars is home to the tallest mountain in the solar system.",
        "Olympus Mons, a shield volcano, is 21km high and 600km in diameter.",
        "Despite having formed over billions of years, evidence from volcanic lava flows is so recent many scientists believe it could still be active.",
      ],
    },
    Venus: {
      image: "assets/images/venus-des.png",
      profile: {
        Diameter: "12,104 km",
        Mass: "4.87 × 10^24 kg (0.82 Earths)",
        Moons: "None",
        OrbitDistance: "108,209,475 km (0.73 AU)",
        SurfaceTemperature: "462 °C",
      },
      facts: [
        "Venus does not have any moons or rings.",
        "Venus is nearly as big as the Earth with a diameter of 12,104 km.",
        "Venus is thought to be made up of a central iron core, rocky mantle and silicate crust.",
        "A day on the surface of Venus (solar day) would appear to take 117 Earth days.",
        "A year on Venus takes 225 Earth days.",
      ],
    },
    Jupiter: {
      image: "assets/images/jupiter-des.png",
      profile: {
        Diameter: "142,984 km",
        Mass: "1.90 × 10^27 kg (318 Earths)",
        Moons: "79 (Io, Europa, Ganymede & Callisto)",
        OrbitDistance: "778,340,821 km (5.20 AU)",
        SurfaceTemperature: "-108°C",
      },
      facts: [
        "Jupiter has the shortest day of all the planets.",
        "It turns on its axis once every 9 hours and 55 minutes.",
        "The rapid rotation flattens the planet slightly, giving it an oblate shape.",
      ],
    },
    Saturn: {
      image: "assets/images/saturn-des.png",
      profile: {
        Diameter: "120,536 km",
        Mass: "5.68 × 10^26 kg (95 Earths)",
        Moons: "82 (Titan, Enceladus, Iapetus & Rhea)",
        OrbitDistance: "1,426,666,422 km (9.58 AU)",
        SurfaceTemperature: "-139°C",
      },
      facts: [
        "Saturn is the flattest planet.",
        "Its polar diameter is 90% of its equatorial diameter, this is due to its low density and fast rotation.",
        "Saturn turns on its axis once every 10 hours and 34 minutes giving it the second-shortest day of any of the solar system’s planets.",
      ],
    },
    Neptune: {
      image: "assets/images/neptune-des.png",
      profile: {
        Diameter: "49,528 km",
        Mass: "1.02 × 10^26 kg (17 Earths)",
        Moons: "14 (Triton)",
        OrbitDistance: "4,498,396,441 km (30.10 AU)",
        SurfaceTemperature: "-201°C",
      },
      facts: [
        "Neptune is the most distant planet from the Sun.",
        "Neptune is the smallest gas giant.",
        "A year on Neptune lasts 165 Earth years.",
        "Neptune is named after the Roman god of the sea.",
        "Neptune has 6 faint rings.",
      ],
    },
  };

  //buttons for traveling
  $(".button").on("click", function () {
    let planet = $(this).text().trim();
    $("#destination").empty();
    // let planetText = $("<d")
    renderbutton();
    let queryURL =
      "https://pds-imaging.jpl.nasa.gov/solr/pds_archives/search?target=" +
      planet +
      "&pds.emission_angle=[0%20to%2010]";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      let distance = response.response.docs[2].SOLAR_DISTANCE;
      let pdistance = $("<div>").text(distance);
      $(".card").prepend(pdistance); // DOES NOT WORK YET
    });
  });

  //buttons for learn more section
  $(".button2").on("click", function () {
    console.log("here");
    let planet = $(this).text().trim();
    console.log(planet);
    let result = details[planet];

    $("#learn").empty();
    learnMoreButtons(result);
  });

  $.ajax({
    url:
      "https://api.nasa.gov/planetary/apod?api_key=cVxqhuu8gexD4U5kFQCInoUyj3zRBgN4b8Qsh4qo",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(".card img").attr("src", response.url);
    $(".card-title").text(response.title);
  });

  function renderbutton() {
    let shipDiv = $("<div>").attr("class", "allShipButton");
    for (let i = 0; i < ships.length; i++) {
      let newButton = $("<button>").attr("class", "shipbutton");
      newButton.text(ships[i].Name);
      shipDiv.append(newButton);
    }
    let planetcard = $("<div>").attr("class", "card");
    planetcard.css("width", "25rem");
    planetcard.append(shipDiv);
    $("#destination").append(planetcard);
  }
  //function for planet/destination information when planet is clicked
  function learnMoreButtons(result) {
    console.log(result);
    let image = $("<img>").attr("src", result.image);
    let destinationDiv = $("<div>").attr("class", "destinationInfo");
    destinationDiv.append(image);
    //for in loop for the object 'profile'
    for (let property in result.profile) {
      console.log(result.profile[property]);
      let pprop = $("<p>").text(`${property}: ${result.profile[property]}`);
      destinationDiv.append(pprop);
    }
    let ul = $("<ul>");
    for (let i = 0; i < result.facts.length; i++) {
      let li = $("<li>").text(result.facts[i]);
      ul.append(li);
    }
    destinationDiv.append(ul);
    let planetInfoCard = $("<div>").attr("class", "card");
    planetInfoCard.css("width", "25rem");
    planetInfoCard.append(destinationDiv);
    $("#learn").append(planetInfoCard);
  }
});
