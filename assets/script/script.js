$(document).ready(function () {

    let ships = [{ Name: "Space Shuttle", Speed: 17000 }, { Name: "Falcon 9", Speed: 25000 }, { Name: "Serenity", Speed: 400000 }, { Name: "USS Enterprise", Speed: 500400000 }, { Name: "Millennium Falcon", Speed: 100400000 }, { Name: "Tardis", Speed: -1 }]

    $('.button').on('click', function () {
        let planet = $(this).text().trim()
        $("#destination").empty()
        // let planetText = $("<d")
        renderbutton()
        let queryURL = 'https://pds-imaging.jpl.nasa.gov/solr/pds_archives/search?target='+ planet + '&pds.emission_angle=[0%20to%2010]'
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {
            let distance = response.response.docs[2].SOLAR_DISTANCE
            let pdistance = $('<div>').text(distance)
            $('.card').prepend(pdistance)  // DOES NOT WORK YET
        })
    })
    $('.button2').on('click', function () {
        let planet = $(this).text().trim()
        console.log(planet)
    })
    $.ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=cVxqhuu8gexD4U5kFQCInoUyj3zRBgN4b8Qsh4qo',
        method: 'GET'
    })
        .then(function (response) {
            console.log(response)
            $('.card img').attr('src', response.url)
            $('.card-title').text(response.title)
        })

    function renderbutton() {
        let shipDiv = $("<div>").attr("class", "allShipButton")
        for (let i = 0; i < ships.length; i++) {
            let newButton = $("<button>").attr("class", "shipbutton")
            newButton.text(ships[i].Name)
            shipDiv.append(newButton)
        }
        let planetcard = $("<div>").attr("class", "card")
        planetcard.css("width", "25rem")
        planetcard.append(shipDiv)
        $("#destination").append(planetcard)
    }
})