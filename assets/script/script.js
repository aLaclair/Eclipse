$(document).ready(function () {

    let ships = [{ Name: "Space Shuttle", Speed: 17000 }, { Name: "Falcon 9", Speed: 25000 }, { Name: "Serenity", Speed: 400000 }, { Name: "USS Enterprise", Speed: 500400000 }, { Name: "Millennium Falcon", Speed: 100400000 }, { Name: "Tardis", Speed: -1 }]

    $('.button').on('click', function () {
        let planet = $(this).text().trim()
        $("#destination").empty()
        let planetcard = $("<div>").attr("class", "card")
        planetcard.css("width", "25rem")
        // let planetimage = $("<img>").attr("src", "")
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
        for (let i = 0; i < ships.length; i++) {
            let newButton = $("<button>").attr("class", "shipbutton")
            newButton.text(ships[i].Name)
        }
    }
})